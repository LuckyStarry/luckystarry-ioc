import 'reflect-metadata'
import { ClassType } from './class-type'
import { ClassPool } from './class-pool'

export interface IServiceCollection {
  AddTransient<T, U extends T>(type: ClassType<T>, impl?: ClassType<U>): void
  AddSingleton<T, U extends T>(
    type: ClassType<T>,
    impl?: ClassType<U> | U
  ): void
  GetService<T>(type: ClassType<T>): T
}

export class ServiceCollection implements IServiceCollection {
  private mapping: Map<ClassType, ClassType>
  private singletons: Map<ClassType, any>
  private readonly classPool: ClassPool

  public constructor(classPool?: ClassPool) {
    this.mapping = new Map<ClassType, ClassType>()
    this.singletons = new Map<ClassType, any>()
    this.classPool = classPool || []
  }

  public AddTransient<T, U extends T>(
    type: ClassType<T>,
    impl?: ClassType<U>
  ): void {
    if (impl) {
      this.mapping.set(type, impl)
      this.addService(impl)
    } else {
      this.addService(type)
    }
  }

  public AddSingleton<T, U extends T>(
    type: ClassType<T>,
    impl?: U | ClassType<U>
  ): void {
    if (impl) {
      if (impl instanceof Function) {
        this.mapping.set(type, impl)
        this.addService(impl)
      } else {
        this.singletons.set(type, impl)
      }
    } else {
      this.addService(type)
      this.singletons.set(type, this.getService(type))
    }
  }

  public GetService<T>(type: ClassType<T>): T {
    let singleton = this.singletons.get(type)
    if (singleton) {
      return singleton
    }
    let mapped = this.mapping.get(type)
    if (mapped) {
      return this.getService(mapped)
    }
    return this.getService(type)
  }

  private addService<T>(type: Function) {
    let paramTypes: Array<Function> =
      Reflect.getMetadata('design:paramtypes', type) || []
    if (this.classPool.indexOf(type) !== -1) return
    for (let val of paramTypes) {
      if (val === type) {
        throw new Error('不能依赖自身')
      } else if (this.classPool.indexOf(val) === -1) {
        throw new Error(`${val}没有被注册`)
      }
    }
    this.classPool.push(type)
  }

  private getService<T>(type: ClassType<T>): T {
    let paramTypes: Array<Function> =
      Reflect.getMetadata('design:paramtypes', type) || []
    let paramInstance = paramTypes.map((val: Function) => {
      if (this.classPool.indexOf(val) === -1) {
        throw new Error(`${val}没有被注册`)
      } else {
        return this.getService(val as any)
      }
    })
    return new type(...paramInstance)
  }
}
