/* tslint:disable */
import { expect } from 'chai'
import { Injectable } from '../src/injectable'
import { ServiceCollection } from '../src/service-collection'

describe('ServiceCollection.AddSingleton', function() {
  it('ServiceCollection.AddSingleton 用子类注册为基类的单例对象时，类型池注册的为基类', function() {
    let collection = new ServiceCollection()
    collection.AddSingleton(BaseService, TestService)
    collection.AddTransient(TestBiz)

    let biz = collection.GetService(TestBiz)
    expect(biz.Service).instanceOf(TestService)
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
