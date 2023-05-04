/* tslint:disable */
import { expect } from 'chai'
import { Injectable } from '../src/injectable'
import { ServiceCollection } from '../src/service-collection'

describe('ServiceCollection.AddSingleton', function () {
  it('ServiceCollection.AddSingleton 修复 v0.2.0 的问题：用类型注册单例时，可能会被重复创建多次的问题', function () {
    let collection = new ServiceCollection()
    collection.AddSingleton(BaseService, TestService)
    collection.AddTransient(TestBiz)

    let bizA = collection.GetService(TestBiz)
    let bizB = collection.GetService(TestBiz)
    expect(bizA.Service).is.equal(bizB.Service)
  })
})

@Injectable()
class BaseService {
  public constructor() {}
}

@Injectable()
class TestService extends BaseService {
  public constructor() {
    super()
  }
}

@Injectable()
class TestBiz {
  private service: BaseService
  constructor(service: BaseService) {
    this.service = service
  }

  public get Service(): BaseService {
    return this.service
  }
}
