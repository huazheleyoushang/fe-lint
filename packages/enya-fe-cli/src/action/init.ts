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
  const { name } = options;
  console.log(name);
  const cwd = options.cwd || process.cwd();
  const isTest = process.env.NODE_ENV === 'test';
  const checkVersionUpdate = options.checkVersionUpdate || false;
  const disableNpmInstall = options.disableNpmInstall || false;

  // 获取输入配置
  const config: Record<string, any> = {};
  const pkgPath = path.resolve(cwd, 'package.json');
  let pkg: PKG = fs.readJSONSync(pkgPath);

  // 版本检查
  if (!isTest && checkVersionUpdate) {
    await update();
  }

  // 默认 enableEslint true
  if (typeof options.enableEslint === 'boolean') {
    config.enableEslint = options.enableEslint
  } else {
    config.enableEslint = true
  }

  if (options.eslintType && PROJECT_TYPES.find((choose) => choose.value === options.eslintType)) {
    config.eslintType = options.eslintType
  } else {
    config.eslintType = await chooseEslintType()
  }

  // 初始化 stylelint
  if (typeof options.enableStylelint === 'boolean') {
    config.enableStylelint = options.enableEslint
  } else {
    config.enableStylelint = await chooseEnableStyle(true)
  }

  // 初始化 markdownlint
  if (typeof options.enableMarkdownlint === 'boolean') {
    config.enableMarkdownlint = options.enableEslint
  } else {
    config.enableMarkdownlint = await chooseEnableMarkdown()
  }

  // 初始化 prettier
  if (typeof options.enablePrettier === 'boolean') {
    config.enablePrettier = options.enableEslint
  } else {
    config.enablePrettier = await chooseEnablePrettier()
  }

  console.log('config', config)

  if (!isTest) {
    // 检查依赖配置
    // TODO:
    const pkg = await conflictResolve(cwd, options.rewriteConfig)
    console.log('pkg--', pkg)
    if (!disableNpmInstall) {
      // 初始化后，安装依赖
      log.info('🚀安装依赖...')
      const npm = await npmType

      // spawn.sync(npm, ['i', '-D', PKG_NAME], {stdio: 'inherit', cwd})
      log.success('📦安装成功：D')

    }
  }

  return

  // 写入 package.json
  pkg = {
   ...pkg,
   ...config,
  }
  fs.writeJSONSync(pkgPath, pkg, {
    spaces: 2,
  })

  // 写入.eslintrc.js
  if (config.enableEslint) {
    const eslintPath = path.resolve(cwd, '.eslintrc.js');
    const eslintTplPath = path.resolve(__dirname, '../template/eslintrc.js');
    fs.copySync(eslintTplPath, eslintPath);
  }

  // 写入.stylelintrc.js

}