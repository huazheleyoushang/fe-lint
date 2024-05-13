module.exports = {
  extends: ['eslint-fe-lint/typescript/node', 'prettier'],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  rules: {
    '@typescript-eslint/no-require-imports': 0,
    'no-console': 0,
  },
};
