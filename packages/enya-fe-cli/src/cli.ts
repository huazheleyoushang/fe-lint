#! /usr/bin/env node

import { program } from 'commander';
import init from './action/init'
import path from 'path';
import generateTemplate from './utils/generate-template';
import update from './action/update';
import { PKG_NAME, PKG_VERSION } from './utils/constants';


const cwd = process.cwd();

// 项目描述
program
  .name(PKG_NAME)
  .description('📖 这里是描述文案很长很长......')
  .version(PKG_VERSION);

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

// 版本更新
program
 .command('update')
 .description(`${PKG_NAME} 已更新至最新版本`)
 .action(async () => {
    await update(true)
  });

program.command('create <name>')
  .description('创建一个新项目')
  .action((name) => {
    console.log('[Project Name] >', name)
  });

program.parse(process.argv);