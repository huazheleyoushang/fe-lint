module.exports = {
  extends: [
    '../index.js',
    '../rules/typescript.js',
  ].map(require.resolve),
};
