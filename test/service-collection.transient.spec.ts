/* tslint:disable */
import { expect } from 'chai'
import { Injectable } from '../src/injectable'
import { ServiceCollection } from '../src/service-collection'

describe('ServiceCollection.AddTransient', function () {
  it('ServiceCollection.AddTransient 无参构造类注册不报错', function () {
    let collection = new ServiceCollection()
    expect(() => {
      collection.AddTransient(TestService)
    }).not.throw()
  })

  it('ServiceCollection.AddTransient 重复注册不报错', function () {
    let collection = new ServiceCollection()
    collection.AddTransient(TestService)
    expect(() => {
      collection.AddTransient(TestService)
    }).not.throw()
  })

  it('ServiceCollection.AddTransient 有参构造类注册不报错', function () {
    let collection = new ServiceCollection()
    expect(() => {
      collection.AddTransient(TestService)
      collection.AddTransient(TestBiz)
    }).not.throw()
  })

  it('ServiceCollection.AddTransient 有依赖构造类未注册依赖类时注册报错', function () {
    let collection = new ServiceCollection()
    expect(() => {
      collection.AddTransient(TestBiz)
    }).to.throw('没有被注册')
  })

  it('ServiceCollection.AddTransient 有自身依赖构造类注册报错', function () {
    let collection = new ServiceCollection()
    expect(() => {
      collection.AddTransient(TestServiceSelfRel)
    }).to.throw('不能依赖自身')
  })

  it('ServiceCollection.AddTransient 注册抽象类的具体实现不报错', function () {
    let collection = new ServiceCollection()
    expect(() => {
      collection.AddTransient(BaseClass, SubClass)
    }).not.throw()
  })

  it('ServiceCollection.AddTransient 注册抽象类的具体实现获取正常', function () {
    let collection = new ServiceCollection()
    collection.AddTransient(BaseClass, SubClass)
    let obj = collection.GetService(BaseClass)
    expect(obj instanceof BaseClass).is.true
    expect(obj.Name).is.equal(SubClass.name)
  })

  it('ServiceCollection.AddTransient 无参构造类获取正常', function () {
    let collection = new ServiceCollection()
    collection.AddTransient(TestService)
    let service = collection.GetService(TestService)
    expect(service).not.be.null
    expect(service).not.be.undefined
    expect(service instanceof TestService).is.true
  })

  it('ServiceCollection.GetService 有参构造类获取正常', function () {
    let collection = new ServiceCollection()
    collection.AddTransient(TestService)
    collection.AddTransient(TestBiz)
    let biz = collection.GetService(TestBiz)
    expect(biz).not.be.null
    expect(biz).not.be.undefined
    expect(biz instanceof TestBiz).is.true
    expect(biz.Service).not.be.null
    expect(biz.Service).not.be.undefined
    expect(biz.Service instanceof TestService).is.true
  })

  it('ServiceCollection.GetService 有参构造类未注册依赖类时获取报错', function () {
    let pool = new Array<Function>(TestBiz)
    let collection = new ServiceCollection(pool)
    expect(() => {
      collection.GetService(TestBiz)
    }).to.throw('没有被注册')
  })

  it('ServiceCollection.GetService 每次获取的实例为不同实例', function () {
    let collection = new ServiceCollection()
    collection.AddTransient(TestService)
    let service1 = collection.GetService(TestService)
    expect(service1).not.be.null
    expect(service1).not.be.undefined
    expect(service1 instanceof TestService).is.true

    let service2 = collection.GetService(TestService)
    expect(service2).not.be.null
    expect(service2).not.be.undefined
    expect(service2 instanceof TestService).is.true

    expect(service1).not.to.equal(service2)
  })
})

@Injectable()
class TestService {
  public constructor() {}
}

@Injectable()
class TestBiz {
  private service: TestService
  constructor(service: TestService) {
    this.service = service
  }

  public get Service(): TestService {
    return this.service
  }
}

@Injectable()
class TestServiceSelfRel {
  constructor(obj: TestServiceSelfRel) {}
}

@Injectable()
class BaseClass {
  public get Name(): string {
    return BaseClass.name
  }
}

@Injectable()
class SubClass extends BaseClass {
  public get Name(): string {
    return SubClass.name
  }
}
