/**
 * 用于覆盖个别 es5 和 es6 不同的规则
 */

module.exports = {
  rules: {
    // 逗号风格，es5 中最后一个不加逗号
    'comma-dangle': ['error', 'never']
  }
}