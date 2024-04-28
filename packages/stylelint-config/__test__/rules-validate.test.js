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

    if (result && result.errored) {
      const filesResult = JSON.parse(result.output || '[]') || [];
      filesResult.forEach((fileResult) => {
        console.log(`-=-=- ${filePaths} -=-=-`);
        console.log(fileResult.warnings);
      });

      assert.ok(filesResult.length !== 0);
    }
  })
})