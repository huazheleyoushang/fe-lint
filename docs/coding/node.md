---
title: Node 编码规范
categories:
  - 编码规范
tags:
  - 编码规范
author:
  name: Asren
  link: https://github.com/huazheleyoushang/fe-lint
---

# Node 编码规范

:::tip
`Node.js` 规范主要包含编码风格、安全规范, 其中编码风格 参考 [eslint-config-egg](https://github.com/eggjs/eslint-config-egg)。
:::

## 1. 编码风格

- 1.1.【推荐】使用 `Node.js` 内置的全局变量。来源 : [node/prefer-global](https://github.com/mysticatea/eslint-plugin-node/blob/v11.1.0/docs/rules/prefer-global)

```js
/* bad */
/*eslint node/prefer-global/buffer: [error]*/

const { Buffer } = require("buffer")
const b = Buffer.alloc(16)

/* good */
/*eslint node/prefer-global/buffer: [error]*/

const b = Buffer.alloc(16)

/* bad */
/*eslint node/prefer-global/url: [error]*/

const { URL } = require("url")
const u = new URL(s)

/* good */
/*eslint node/prefer-global/url: [error]*/

const u = new URL(s)
```

- 1.2.【推荐】使用 `Node.js` promise API。

```js
/* bad */
/*eslint node/prefer-promises/dns: [error]*/
const dns = require("dns")

function lookup(hostname) {
    dns.lookup(hostname, (error, address, family) => {
        //...
    })
}

/*eslint node/prefer-promises/dns: [error]*/
import dns from "dns"

function lookup(hostname) {
    dns.lookup(hostname, (error, address, family) => {
        //...
    })
}

/* good */
/*eslint node/prefer-promises/dns: [error]*/
const { promises: dns } = require("dns")

async function lookup(hostname) {
    const { address, family } = await dns.lookup(hostname)
    //...
}

/*eslint node/prefer-promises/dns: [error]*/
import { promises as dns } from "dns"

async function lookup(hostname) {
    const { address, family } = await dns.lookup(hostname)
    //...
}
```

- 1.3.【推荐】模块引用声明放在文件顶端、引用顺序。🔒 来源 `eslint` 规则: [import/order](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md)

```js
/* bad */
import _ from 'lodash';
import path from 'path'; // `path` import should occur before import of `lodash`

// -----

var _ = require('lodash');
var path = require('path'); // `path` import should occur before import of `lodash`

// -----

var path = require('path');
import foo from './foo'; // `import` statements must be before `require` statement

/* good */

import path from 'path';
import _ from 'lodash';

// -----

var path = require('path');
var _ = require('lodash');

// -----

// Allowed as ̀`babel-register` is not assigned.
require('babel-register');
var path = require('path');

// -----

// Allowed as `import` must be before `require`
import foo from './foo';
var path = require('path');
```

- 1.4.【推荐】抛出错误异常，使用原生 `Error` 对象

```js
/* bad */
throw 'error'

throw null

throw undefined

/* good */
throw new Error()

throw new Error('error reason')

const err = new Error()
throw err
```
