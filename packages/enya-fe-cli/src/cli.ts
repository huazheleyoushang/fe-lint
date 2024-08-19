#! /usr/bin/env node

import fs from 'fs-extra';
import glob from 'glob';
import { program } from 'commander';
import init from './action/init'
import create from './action/create';
import path from 'path';
import generateTemplate from './utils/generate-template';
import update from './action/update';
import npmType from './utils/npm-type';
import printReport from './utils/print-report';
import { PKG_NAME, PKG_VERSION } from './utils/constants';
import figlet from 'figlet';
import scan from './action/scan';
import ora from 'ora';
import { execSync } from 'child_process';
import log from './utils/log';

const cwd = process.cwd();

/**
 * 若无 node_modules，则帮用户 install（否则会找不到 config）
 */
const installDepsIfThereNo = async () => {
  const lintConfigFiles = [].concat(
    glob.sync('.eslintrc?(.@(js|yaml|yml|json))', { cwd }),
    glob.sync('.stylelintrc?(.@(js|yaml|yml|json))', { cwd }),
    glob.sync('.markdownlint(.@(yaml|yml|json))', { cwd }),
  );
  const nodeModulesPath = path.resolve(cwd, 'node_modules');

  if (!fs.existsSync(nodeModulesPath) && lintConfigFiles.length > 0) {
    const npm = await npmType;
    log.info(`使用项目 Lint 配置，检测到项目未安装依赖，将进行安装（执行 ${npm} install）`);
    execSync(`cd ${cwd} && ${npm} i`);
  }
};

// 项目描述
program
  .name(PKG_NAME)
  .usage('<command> [options]')
  .description('📝 这里是描述文案很长很长......')
  .version(PKG_VERSION);

// help 信息
program.on('--help', () => {
  console.log(
    figlet.textSync("Enya", {
      font: "Ghost",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true,
    })
  );
  console.log('Examples:');
  console.log('');
  console.log('  $ enya init');
  console.log('  $ enya create my-project');
});

// 项目初始化
program
  .command('init')
  .description('初始化项目规范和工具配置，可以自定义类型和需求定制')
  .option('--vscode', '✍️ 写入.vscode/setting.json配置')
  .action( async (cmd) => {
    if(cmd.vscode) {
      const configPath = path.resolve(cwd, `${PKG_NAME}.config.js`);
      generateTemplate(cwd, require(configPath), true);
    } else {
      await init({
        cwd,
        checkVersionUpdate: true, // 校验版本
      });
    }
  });

// 项目扫描
program
  .command('scan')
  .description('🔍  - 对项目代码规范问题进行扫描')
  .option('-q, --quiet', '❌  仅报告错误信息 - 默认: false')
  .option('-o, --output', '🐛  输出扫描问题的文件日志')
  .option('-i, --include', '扫描指定目录文件')
  .option('--no-ignore', '忽略 ignore 文件')
  .action(async (cmd) => {
    await installDepsIfThereNo();

    const checking = ora();
    checking.start(`执行 ${PKG_NAME} 代码检查`);

    const { results, errorCount, warningCount, runErrors } = await scan({
      cwd,
      fix: false,
      include: cmd.include || cwd,
      quiet: Boolean(cmd.quiet),
      outputReport: Boolean(cmd.outputReport),
      ignore: cmd.ignore, // 对应 --no-ignore
    });
    let type = 'success';
    if (runErrors.length > 0 || errorCount > 0) {
      type = 'fail';
    } else if (warningCount > 0) {
      type = 'warn';
    }

    checking[type]();
    if (results.length > 0) printReport(results, false);

    // 输出 lint 运行错误
    runErrors.forEach((e) => console.log(e));
  });

// 修复
program
.command('fix')
.description('一键修复：自动修复项目的代码规范扫描问题')
.option('-i, --include <dirpath>', '指定要进行修复扫描的目录')
.option('--no-ignore', '忽略 eslint 的 ignore 配置文件和 ignore 规则')
.action(async (cmd) => {
  await installDepsIfThereNo();

  const checking = ora();
  checking.start(`执行 ${PKG_NAME} 代码修复`);

  const { results } = await scan({
    cwd,
    fix: true,
    include: cmd.include || cwd,
    ignore: cmd.ignore, // 对应 --no-ignore
  });

  checking.succeed();
  if (results.length > 0) printReport(results, true);
});

// 版本更新
program
 .command('update')
 .description(`${PKG_NAME} 已更新至最新版本`)
 .action(async () => {
    await update(true)
  });

program.command('create <projectName>')
  .description('✨  创建新项目')
  .option('拉取项目模版，集成前端规范')
  .action( async (projectName) => {
    console.log('[Project Name] >', projectName)
    await create({
      projectName,
      cwd,
    })
  });

program.parse(process.argv);
