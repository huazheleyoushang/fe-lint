# eslint-fe-lint

JavaScript TypeScript Node 规范

提供多套规则配置，支持 `JavaScript, TypeScript, Node, Vue, React` 等多种项目

## ⛰️ JavaScript 项目

针对未使用 `React` 或 `Vue` 的原生 `JavaScript` 项目，使用 `ESLint` 原生规则和 [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import) 规则，使用 [@babel/eslint-parser](https://www.npmjs.com/package/@babel/eslint-parser) 作为 `parser`，是本包的默认配置。

### 🔗 依赖

- [@babel/core](https://www.npmjs.com/package/@babel/core)@^7.16.0
- [@babel/eslint-parser](https://www.npmjs.com/package/@babel/eslint-parser)@^7.16.3
- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)@^2.25.3

### 🔧 安装

```shell
npm i -D eslint-fe-lint @babel/core @babel/eslint-parser eslint-plugin-import
```

### ⚙️ 配置

```json
{
  "extends": ["eslint-fe-lint"]
}
```

## 🪐 JavaScript + Vue 项目 - eslint-fe-lint/vue

### 🔗 依赖

- [@babel/core](https://www.npmjs.com/package/@babel/core)@^7.16.0
- [@babel/eslint-parser](https://www.npmjs.com/package/@babel/eslint-parser)@^7.16.3
- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)@^2.25.3
- [vue-eslint-parser](https://www.npmjs.com/package/vue-eslint-parser)@^7.0.0
- [eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue)@^7.3.0

### 🔧 安装

```shell
npm i -D eslint-fe-lint @babel/core @babel/eslint-parser eslint-plugin-import vue-eslint-parser eslint-plugin-vue
```

### ⚙️ 配置

```json
{
  "extends": ["eslint-fe-lint/vue"]
}
```
