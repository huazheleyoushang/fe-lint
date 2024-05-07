---
title: CSS 编码规范
categories:
  - 编码规范
tags:
  - 编码规范
author:
  name: Asren
  link: https://github.com/huazheleyoushang/fe-lint/tree/master/packages/stylelint-config
---

## CSS 编码规范

规范包括 `CSS` 及其预编译语言（`Sass`、`Less`）的编码风格，部分规则可通过 [stylelint](https://stylelint.io/) 规则工具

### 编码风格

- 1.1【强制】所有声明都应该以分号结尾，不能省略

```css
/* bad */
.content {
  margin-top: 10px
  padding-left: 15px
}

/* good */
.content {
  margin-top: 10px;
  padding-left: 15px;
}
```

- 1.2【推荐】使用两个空格缩进，不要使用4个空格

```css
/* bad */
.box {
    width: 100px;
}

/* good */
.box {
  width: 100px;
}
```

- 1.3【推荐】选择器和 `{` 之间保留一个空格

```css
/* bad */
.select{
  height: 44px;
}

/* good */
.select {
  height: 44px;
}
```

- 1.4【推荐】属性名和 `:` 之前无空格，`:` 和属性值之间保留一个空格

```css
/* bad */
.select {
  background :color;
}

/* good */
.select {
  background: #fff;
}

```

- 1.5【推荐】`>`、`+` 等组合器前后各保留一个空格

```css
/* bad */
.container {
  &>.select {
    display: none;
  }
}
.box+.div {
  width: 100%;
}

/* good */
.container {
  & > .select {
    display: none;
  }
}
.box + .div {
  width: 100%;
}

```

- 1.6.【推荐】十六进制使用小写字母

```css
/* bad */
.main {
  background: #FFF;
}

/* good */
.main {
  background: #fff;
}
```

- 1.7.【建议】不要使用 `id` 选择器

```css
/* bad */
#spell {
  font-size: 12px;
}

/* good */
.spell {
  font-size: 12px;
}
```

- 1.8.【推荐】属性值为 0 的时候，可以省略单位

```css
/* bad */
.modal {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
}

/* good */
.modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
```

- 1.9【参考】使用多个选择器时，每个选择器应该单独成行

```css
/* bad */
.selector, .selector-secondary, .selector-third {
  padding: 15px;
  margin-bottom: 15px;
}

/* good */
.selector,
.selector-secondary,
.selector-third {
  padding: 15px;
  margin-bottom: 15px;
}
```

- 2.0【建议】不允许无效的注释

```css
/* bad */
a {
  //color: pink;
}
/* a { color: pink;  } */
a {
  /* color: pink; */
}

/* good */
a {
  color: pink;
}
```

- 2.1【推荐】函数计算不需要空格

```css
/* bad */
a {
  top: calc(1px + 2px);
}

/* good */
a {
  top: calc(1px+2px);
}
a { transform: rotate(atan(-2+1)); }
```
