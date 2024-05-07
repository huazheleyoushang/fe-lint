module.exports = {
  extends: [
    './index.js',
    '../node.js',
  ].map(require.resolve),
};
