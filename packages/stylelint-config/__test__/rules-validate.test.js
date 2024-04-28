const assert = require('assert')
const stylelint = require('stylelint')

describe('rules-validate.test.js', () => {
  it('styles lint', async() => {
    const filePath = path.join(__dirname, './fixtures/index.css')

    const result = await stylelint.lint({
      configFile: path.join(__dirname, '../index.js'),
      files: filePaths,
      fix: false,
    });
  })
})