module.exports = {
  extends: [
    './index.js',
    '../rules/node',
  ].map(require.resolve),
};
