const path = require('path');
const fs = require('fs-extra');


describe('init', () => {
  const outputPath = path.resolve(__dirname, './fixtures/template/temp');

  test('node api init should work as expected', async () => {
    const settings = require(`${outputPath}/.vscode/settings.json`);
  });
});
