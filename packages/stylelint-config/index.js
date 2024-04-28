module.exports = {
  defaultSeverity: 'warning',
  plugins: ['stylelint-scss'],
  rules: {
    /**
     * css 规则配置
     * https://stylelint.io/user-guide/rules
     */
    "at-rule-no-unknown": null,
    'scss/at-rule-no-unknown': true,
    'block-no-empty': null,
    'color-no-invalid-hex': true,
    'comment-no-empty': true,
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: ['consecutive-duplicates-with-different-values']
      }
    ],
    'declaration-block-no-shorthand-property-override': true,
    'font-family-no-duplicate-names': true,
    'function-calc-no-unspaced-operator': true,
    'function-linear-gradient-no-nonstandard-direction': true,
    'keyframe-declaration-no-important': true,
    'media-feature-name-no-unknown': true,
    'no-descending-specificity': null, // @reason 实际有很多这样用的，且多数人熟悉 css 优先级
    'no-duplicate-at-import-rules': true,
    'no-duplicate-selectors': true,
    'no-empty-source': null,
    'no-extra-semicolons': true,
    'no-invalid-double-slash-comments': true,
    'property-no-unknown': true,
  }
}
