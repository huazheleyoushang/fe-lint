module.exports = {
  extends: [
    './rules/base/es6.js'
  ].map(require.resolve),
  parser: '@babel/eslint-parser',
  parserOpts: {
    requireConfigFile: false,
    ecmaVersion: 2020,
    sourceType: 'script',
    sourceType: 'module',
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: true,
      jsx: true,
    },
  },
  root: true,
}