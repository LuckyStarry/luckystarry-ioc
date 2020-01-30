/* tslint:disable */
import { expect } from 'chai'
import { Injectable } from '../src/injectable'
import { ServiceCollection } from '../src/service-collection'

describe('ServiceCollection.AddSingleton', function() {
  it('ServiceCollection.AddSingleton 获取的单例对象一直为同一个', function() {
    let collection = new ServiceCollection()
    let instance = new TestService()
    collection.AddSingleton(TestService, instance)
    expect(collection.GetService(TestService)).to.equal(instance)
    expect(collection.GetService(TestService)).to.equal(instance)
    expect(collection.GetService(TestService)).to.equal(instance)
  })

  it('ServiceCollection.AddSingleton 依赖的单例对象一直为同一个', function() {
    let collection = new ServiceCollection()
    collection.AddSingleton(TestService)
    collection.AddTransient(TestBiz)

    let service = collection.GetService(TestService)
    expect(collection.GetService(TestBiz).Service).to.equal(service)
    expect(collection.GetService(TestBiz).Service).to.equal(service)
    expect(collection.GetService(TestBiz).Service).to.equal(service)
    expect(collection.GetService(TestBiz).Service).to.equal(service)
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
