/**
 * TS 规则校验
 */

const path = require('path');
const assert = require('assert');
const eslint = require('eslint');
const sumBy = require('lodash/sumBy');

const isObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

describe('eslint-config/ts', () => {
  it('validate-ts-config.test.js', async () => {
    const configPath = './typescript/index.js';
    const filePath = path.join(__dirname, './fixtures/ts.ts');

    const cli = new eslint.ESLint({
      overrideConfigFile: configPath,
      useEslintrc: false,
      ignore: false,
      overrideConfig: {
        parserOptions: {
          project: path.join(__dirname, './fixtures/tsconfig.json'),
        },
      },
    });

    const config = await cli.calculateConfigForFile(filePath);
    assert.ok(isObject(config));

    const results = await cli.lintFiles([filePath]);
    assert.equal(sumBy(results, 'fatalErrorCount'), 0);
    assert.notEqual(sumBy(results, 'errorCount'), 0);
    assert.equal(sumBy(results, 'warningCount'), 0);

    // 验证 eslint-plugin-typescript 是否正常
    const { messages } = results[0];
    const errorReport = messages.filter((result) => {
      return result.ruleId && result.ruleId.indexOf('@typescript-eslint/') !== -1;
    });
    assert.notEqual(errorReport.length, 0);

    // 验证 eslint-import-resolve-typescript 是否正常
    const path2 = path.join(__dirname, './fixtures/import-a.ts');
    const path3 = path.join(__dirname, './fixtures/import-b.ts');
    const results2 = await cli.lintFiles([path2, path3]);
    assert.ok(results2.errorCount !== 0 || results2.warnCount !== 0);
  });

  /**
   * 验证 validate-ts-config.test/vue
   */
  it('validate-ts-config.test.js/vue', async () => {
    const configPath = './typescript/vue.js';
    const filePath = path.join(__dirname, './fixtures/ts-vue.vue');
  });
});
