const path = require('path');
const fs = require('fs-extra');
const execa = require('execa');
const packageJson = require('../package.json');

const cli = (args, options) => {
  return execa('node', [path.resolve(__dirname, '../lib/cli.js'), ...args], options);
};

test('--version should output right version', async () => {
  const { stdout } = await cli(['--version']);
  expect(stdout).toBe(packageJson.version);
});
