/* tslint:disable */
import { expect } from 'chai'
import index, {
  AddSingleton,
  AddTransient,
  Default,
  GetService,
  ServiceCollection
} from '../src/index'

describe('Index', function() {
  it('存在 默认导出', function() {
    expect(index).not.null
    expect(index).not.undefined
    expect(typeof index).to.equal('object')
  })

  it('存在 Default', function() {
    expect(Default).not.null
    expect(Default).not.undefined
    expect(typeof Default).to.equal('object')
  })

  it('存在 AddTransient', function() {
    expect(AddTransient).not.null
    expect(AddTransient).not.undefined
    expect(typeof AddTransient).to.equal('function')
  })

  it('存在 AddSingleton', function() {
    expect(AddSingleton).not.null
    expect(AddSingleton).not.undefined
    expect(typeof AddSingleton).to.equal('function')
  })

  it('存在 GetService', function() {
    expect(GetService).not.null
    expect(GetService).not.undefined
    expect(typeof GetService).to.equal('function')
  })

  it('默认导出 与 Default 为同一个对象', function() {
    expect(Default).to.equal(index)
  })

  it('默认导出类型为 ServiceCollection', function() {
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
