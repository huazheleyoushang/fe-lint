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

describe('eslint-config/js', () => {
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

  /**
   * es5 测试用例
   */

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

  /**
   * Vue 测试用例
   */

  it('validate-js-config.test.js/vue', async () => {
    const configPath = './vue.js';
    const filePath = path.join(__dirname, './fixtures/vue.vue');

    const cli = new eslint.ESLint({
      overrideConfigFile: configPath,
      useEslintrc: false,
      ignore: false,
    });

    const config = await cli.calculateConfigForFile(filePath);
    assert.ok(isObject(config));

    const results = await cli.lintFiles([filePath]);
    assert.equal(sumBy(results, 'fatalErrorCount'), 0);
    assert.notEqual(sumBy(results, 'errorCount'), 0);
    assert.notEqual(sumBy(results, 'warningCount'), 0);

    // 验证 vue 规则是否生效
    const { messages } = results[0];
    const errorReport = messages.filter((result) => {
      return result.ruleId && result.ruleId.indexOf('vue/') !== -1;
    });
    assert.notEqual(errorReport.length, 0);
  });

  /**
   * React 测试用例
   */

  it('validate-js-config.test.js/react', async () => {
    const configPath = './react.js';
    const filePath = path.join(__dirname, './fixtures/react.jsx');

    const cli = new eslint.ESLint({
      overrideConfigFile: configPath,
      useEslintrc: false,
      ignore: false,
    });

    const config = await cli.calculateConfigForFile(filePath);
    assert.ok(isObject(config));

    const results = await cli.lintFiles([filePath]);
    assert.equal(sumBy(results, 'fatalErrorCount'), 0);
    assert.notEqual(sumBy(results, 'errorCount'), 0);
    assert.notEqual(sumBy(results, 'warningCount'), 0);
    const { messages } = results[0];
    const errorReport = messages.filter((result) => {
      return result.ruleId && result.ruleId.indexOf('react/') !== -1;
    });
    assert.notEqual(errorReport.length, 0);
  });

  /**
   * node 测试用例
   */

  it('validate-js-config.test.js/node', async () => {
    const configPath = './node.js';
    const filePath = path.join(__dirname, './fixtures/node.js');

    const cli = new eslint.ESLint({
      overrideConfigFile: configPath,
      useEslintrc: false,
      ignore: false,
    });
    // 验证 node 规则配置
    const config = await cli.calculateConfigForFile(filePath);
    assert.ok(isObject(config));
    assert.strictEqual(config.env.node, true);
    assert.strictEqual(config.plugins.includes('node'), true);
    // 验证 node 规则是否生效
    const results = await cli.lintFiles([filePath]);

    const { messages, errorCount, warningCount } = results[0];

    const ruleIds = Array.from(messages.map((item) => item.ruleId));
    assert.strictEqual(ruleIds.includes('no-var'), true);
    assert.strictEqual(errorCount, 7);
    assert.strictEqual(warningCount, 4);

    // 验证已关闭的 link 规则是否校验正常，以 node/exports-style 为例
    assert.strictEqual(ruleIds.includes('node/exports-style'), false);
  });
});
