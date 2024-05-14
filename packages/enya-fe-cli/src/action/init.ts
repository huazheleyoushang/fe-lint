import path from 'path';
import inquirer from 'inquirer';
import spawn from 'cross-spawn';
import fs from 'fs-extra';
import update from './update';
import npmType from '../utils/npm-type';

import { PKG_NAME, PROJECT_TYPES } from '../utils/constants';
import type { InitOptions, PKG } from '../type';
import log from '../utils/log';
import conflictResolve from '../utils/conflict-resolve';
import generateTemplate from '../utils/generate-template';

// 操作步骤
let step = 0

// 选择项目语言和框架
const chooseEslintType = async (): Promise<string> => {
  const { type } = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: `${++step}. 请选择项目类型`,
      choices: PROJECT_TYPES,
    },
  ])
  return type
}

/**
 * 选择是否使用 stylelint
 * 默认-y
 */
const chooseEnableStyle = async (defaultValue: boolean): Promise<boolean> => {
  const { enable } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'enable',
      message: `${++step}. 是否使用stylelint`,
      default: defaultValue,
    }
  ])
  return enable
}

/**
 * 是否使用 markdownlint 
 */
const chooseEnableMarkdown = async (): Promise<boolean> => {
  const { enable } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'enable',
      message: `${++step}. 是否使用markdownlint`,
      default: true,
    }
  ])
  return enable
}

/**
 * 是否使用 prettier
 */
const chooseEnablePrettier = async (): Promise<boolean> => {
  const { enable } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'enable',
      message: `${++step}. 是否使用prettier`,
      default: true,
    }
  ])
  return enable
}

export default async (options: InitOptions) => {
  const cwd = options.cwd || process.cwd();
  const isTest = process.env.NODE_ENV === 'test';
  const checkVersionUpdate = options.checkVersionUpdate || false;
  const disableNpmInstall = options.disableNpmInstall || false;

  // 获取输入配置
  const config: Record<string, any> = {};
  const pkgPath = path.resolve(cwd, 'package.json');
  let pkg: PKG = fs.readJSONSync(pkgPath);

  // 版本检查
  // TODO:
  // if (!isTest && checkVersionUpdate) {
  //   await update();
  // }

  // 默认 enableEslint true
  if (typeof options.enableESLint === 'boolean') {
    config.enableESLint = options.enableESLint;
  } else {
    config.enableESLint = true;
  }

  if (options.eslintType && PROJECT_TYPES.find((choose) => choose.value === options.eslintType)) {
    config.eslintType = options.eslintType
  } else {
    config.eslintType = await chooseEslintType()
  }

  // 初始化 stylelint
  if (typeof options.enableStylelint === 'boolean') {
    config.enableStylelint = options.enableStylelint
  } else {
    config.enableStylelint = await chooseEnableStyle(true)
  }

  // 初始化 markdownlint
  if (typeof options.enableMarkdownlint === 'boolean') {
    config.enableMarkdownlint = options.enableMarkdownlint
  } else {
    config.enableMarkdownlint = await chooseEnableMarkdown()
  }

  // 初始化 prettier
  if (typeof options.enablePrettier === 'boolean') {
    config.enablePrettier = options.enablePrettier
  } else {
    config.enablePrettier = await chooseEnablePrettier()
  }

  if (!isTest) {
    // 检查依赖配置-重写
    const pkg = await conflictResolve(cwd, options.rewriteConfig);
    if (!disableNpmInstall) {
      // 初始化后，安装依赖
      log.info('🚀 安装依赖...');
      const npm = await npmType;

      spawn.sync(npm, ['i', '-D', PKG_NAME], {stdio: 'inherit', cwd});
      log.success('📦 安装成功');

    }
  }

  // 更新 pkg.json
  pkg = fs.readJSONSync(pkgPath);

  // 新增script命令
  if (!pkg.scripts) {
    pkg.scripts = {};
  }
  if (!pkg.scripts[`${PKG_NAME}-scan`]) {
    pkg.scripts[`${PKG_NAME}-scan`] = `${PKG_NAME} scan`;
  }
  if (!pkg.scripts[`${PKG_NAME}-fix`]) {
    pkg.scripts[`${PKG_NAME}-fix`] = `${PKG_NAME} fix`;
  }


  // 写入配置
  log.info('写入配置中...');
  await generateTemplate(cwd, config);
  log.success('✅ 写入配置成功');

  // 完成信息
  const logs = [`${PKG_NAME} 初始化完成`].join('\r\n');
  log.success(logs);
}