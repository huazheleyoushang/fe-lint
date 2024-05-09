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

    const cli = new eslint.ESLint({
      overrideConfigFile: configPath,
      useEslintrc: false,
      ignore: false,
      // TS 配置
      overrideConfig: {
        parserOptions: {
          project: path.join(__dirname, './fixtures/tsconfig.json'),
        },
      },
    });

    const config = await cli.calculateConfigForFile(filePath);
    assert.ok(isObject(config));

    // 验证 tslint 规则是否生效
    const results = await cli.lintFiles([filePath]);
    assert.equal(sumBy(results, 'fatalErrorCount'), 0);
    assert.notEqual(sumBy(results, 'errorCount'), 0);
    assert.notEqual(sumBy(results, 'warningCount'), 0);

    // 验证 eslint-config-vue， @typescript/-eslint 是否正常
    const { messages } = results[0];
    const errorReport = messages.filter((result) => {
      return result.ruleId && result.ruleId.indexOf('vue/') !== -1;
    });
    const errorReportTs = messages.filter((result) => {
      return result.ruleId && result.ruleId.indexOf('@typescript-eslint/') !== -1;
    });

    assert.notEqual(errorReport.length, 0);
    assert.notEqual(errorReportTs.length, 0);
  });

  /**
   * 降级 react 校验
   */
  it('validate-ts-config.test.js/essential/react', async () => {
    const configPath = './essential/typescript/react.js';
    const filePath = path.join(__dirname, './fixtures/ts-react.tsx');

    const cli = await new eslint.ESLint({
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

    // 验证配置 是否正确
    const results = await cli.lintFiles([filePath]);
    assert.equal(sumBy(results, 'fatalErrorCount'), 0);
    assert.notEqual(sumBy(results, 'errorCount'), 0);
    assert.notEqual(sumBy(results, 'warningCount'), 0);

    // 验证 tsx 是否正确
    const { messages } = results[0];
    const errorReport = messages.filter((result) => {
      return result.ruleId && result.ruleId.indexOf('react/') !== -1;
    });
    assert.notEqual(errorReport.length, 0);

    const errorReportTs = messages.filter((result) => {
      return result.ruleId && result.ruleId.indexOf('@typescript-eslint/') !== -1;
    });
    assert.notEqual(errorReportTs.length, 0);

    // 验证 @typescript-eslint/semi 是否降级
    const errorSemi = messages.filter((result) => {
      return result.ruleId === '@typescript-eslint/semi';
    });
    assert.equal(errorSemi.length, 0);

    // 验证 指定规则已关闭 react/jsx-indent
    const errorIndent = messages.filter((result) => {
      return result.ruleId && result.ruleId === 'react/jsx-indent';
    });
    assert.equal(errorIndent.length, 0);
  });
});
