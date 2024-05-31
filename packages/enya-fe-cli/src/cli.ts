#! /usr/bin/env node

import { program } from 'commander';
import init from './action/init'
import create from './action/create';
import path from 'path';
import generateTemplate from './utils/generate-template';
import update from './action/update';
import { PKG_NAME, PKG_VERSION } from './utils/constants';
import figlet from 'figlet';
import scan from './action/scan';
import ora from 'ora';

const cwd = process.cwd();

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
    const checking = ora();
    checking.start();
    console.log('开始扫描项目...');

    setTimeout(() => {
      checking.stop();
      console.log('扫描完成')
    }, 3000)
    scan({
      cwd,
      include: cmd.include || cwd,
    })
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
