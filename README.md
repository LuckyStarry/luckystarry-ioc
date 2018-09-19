# luckystarry-ioc

一个仿 ASP.NET MVC 的 ServiceContainer 的 IoC 框架

[![Build Status](https://www.travis-ci.org/LuckyStarry/luckystarry-ioc.svg?branch=master)](https://www.travis-ci.org/LuckyStarry/luckystarry-ioc?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/LuckyStarry/luckystarry-mvc/badge.svg?branch=master)](https://coveralls.io/github/LuckyStarry/luckystarry-ioc?branch=master)
[![Npm Status](https://img.shields.io/npm/v/luckystarry-ioc.svg)](https://www.npmjs.com/package/luckystarry-ioc)
[![codebeat badge](https://codebeat.co/badges/f1c54a62-2552-484f-92d5-fd3166e3d468)](https://codebeat.co/projects/github-com-luckystarry-luckystarry-ioc-master)
[![License Status](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://raw.githubusercontent.com/LuckyStarry/luckystarry-ioc/master/LICENSE)

## Install

```bash
npm i -S luckystarry-ioc
```

## Usage

简单的使用如下所示：

```typescript
// index.ts
import ioc, { Injectable } from 'luckystarry-ioc'

@Injectable()
class Foo {}

@Injectable()
class Bar {
  private _foo: Foo
  public constructor(foo: Foo) {
    this._foo = foo
  }
}

ioc.AddTransient(Foo)
ioc.AddTransient(Bar)

let foo = ioc.GetService(Foo)
let bar = ioc.GetService(Bar)
```

为了使用 _注解_ 的特性，请在项目运行目录添加 _tsconfig.json_

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## LICENSE

MIT License

Copyright (c) 2018 SUN BO <starry@vip.qq.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
