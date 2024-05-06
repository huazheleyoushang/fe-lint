/**
 * JS 规则校验
 */

const path = require('path');
const assert = require('assert');
const eslint = require('eslint');
const sumBy = require('lodash/sumBy');

const isObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

describe('eslint-config', () => {
  it('validate-js-config.test.js', async () => {
    const configPath = './index.js';
    const filePath = path.join(__dirname, './fixtures/index.js');

    const cli = new eslint.ESLint({
      overrideConfigFile: configPath,
      useEslintrc: false, // 是否合并eslintrc
      ignore: false,
    });

    // 验证 config 配置
    const config = await cli.calculateConfigForFile(filePath);
    assert.ok(isObject(config));

    // 验证 eslint 是否正常
    const results = await cli.lintFiles([filePath]);
    assert.equal(sumBy(results, 'fatalErrorCount'), 0);
    assert.notEqual(sumBy(results, 'errorCount'), 0);
    assert.notEqual(sumBy(results, 'warningCount'), 0);
  });

  // 验证 es5 规则
  it('validate-js-config.test.js/es5', async () => {
    const configPath = './es5.js';
    const filePath = path.join(__dirname, './fixtures/es5.js');

    const cli = new eslint.ESLint({
      overrideConfigFile: configPath,
      useEslintrc: false,
      ignore: false,
    });

    // 验证 config 配置
    const config = await cli.calculateConfigForFile(filePath);
    assert.ok(isObject(config));

    // 验证 es5 eslint 是否正常
    const results = await cli.lintFiles([filePath]);
    assert.equal(sumBy(results, 'fatalErrorCount'), 0);
    assert.notEqual(sumBy(results, 'errorCount'), 0);
    assert.equal(sumBy(results, 'warningCount'), 0);

    // se5 规则测试
    const { messages } = results[0];
    const errorReport = messages.filter((result) => {
      return result.ruleId === 'comma-dangle';
    });
    assert.notEqual(errorReport.length, 0);
  });
});
