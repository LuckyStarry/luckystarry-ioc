import { expect } from 'chai'
import index, {
  IServiceCollection,
  ServiceCollection,
  ClassType,
  ClassPool,
  Injectable,
  Default,
  AddTransient,
  AddSingleton,
  GetService
} from '../src/index'

describe('Index', function() {
  it('存在 默认导出', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(index).not.null
    // tslint:disable-next-line:no-unused-expression
    expect(index).not.undefined
    expect(typeof index).to.equal('object')
  })

  it('存在 Default', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(Default).not.null
    // tslint:disable-next-line:no-unused-expression
    expect(Default).not.undefined
    expect(typeof Default).to.equal('object')
  })

  it('存在 AddTransient', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(AddTransient).not.null
    // tslint:disable-next-line:no-unused-expression
    expect(AddTransient).not.undefined
    expect(typeof AddTransient).to.equal('function')
  })

  it('存在 AddSingleton', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(AddSingleton).not.null
    // tslint:disable-next-line:no-unused-expression
    expect(AddSingleton).not.undefined
    expect(typeof AddSingleton).to.equal('function')
  })

  it('存在 GetService', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(GetService).not.null
    // tslint:disable-next-line:no-unused-expression
    expect(GetService).not.undefined
    expect(typeof GetService).to.equal('function')
  })

  it('默认导出 与 Default 为同一个对象', function() {
    expect(Default).to.equal(index)
  })

  it('默认导出类型为 ServiceCollection', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(index instanceof ServiceCollection).is.true
  })

  it('存在 Class ServiceCollection', function() {
    expect(typeof ServiceCollection).to.equal('function')
  })

  it('AddTransient 操作时使用 Default 对象作为容器', function() {
    expect(AddTransient).to.equal(Default.AddTransient)
  })

  it('AddSingleton 操作时使用 Default 对象作为容器', function() {
    expect(AddSingleton).to.equal(Default.AddSingleton)
  })

  it('GetService 操作时使用 Default 对象作为容器', function() {
    expect(GetService).to.equal(Default.GetService)
  })
})
