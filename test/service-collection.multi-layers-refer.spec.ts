/* tslint:disable */
import { expect } from 'chai'
import { Injectable } from '../src/injectable'
import { ServiceCollection } from '../src/service-collection'

describe('ServiceCollection', function() {
  it('三层依赖', function() {
    let collection = new ServiceCollection()
    collection.AddTransient(R1Class)
    collection.AddTransient(R2Class)
    collection.AddTransient(R3Class)

    let obj = collection.GetService(R3Class)
    expect(obj).is.not.null
    expect(obj).is.instanceof(R3Class)
    expect(obj.R2).is.not.null
    expect(obj.R2).is.instanceof(R2Class)
    expect(obj.R2.R1).is.not.null
    expect(obj.R2.R1).is.instanceof(R1Class)
  })
})

@Injectable()
class R1Class {
  public get Name(): string {
    return R1Class.name
  }
}

@Injectable()
class R2Class {
  private r1: R1Class
  public constructor(r1: R1Class) {
    this.r1 = r1
  }

  public get Name(): string {
    return R2Class.name
  }

  public get R1(): R1Class {
    return this.r1
  }
}

@Injectable()
class R3Class {
  private r2: R2Class
  public constructor(r2: R2Class) {
    this.r2 = r2
  }

  public get Name(): string {
    return R3Class.name
  }

  public get R2(): R2Class {
    return this.r2
  }
}
