import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';
import log from '../utils/log';

import { PROJECT_TYPES, PLATEFORM_TYPE } from '../utils/constants';
import type { CreateOptions, PKG } from '../type';

// 选择项目语言和框架
const chooseProjectType = async (): Promise<string> => {
  const { type } = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: '请选择项目类型',
      choices: PROJECT_TYPES,
    },
  ])
  return type
}

/**
 * 选择项目类型
 * @param {string}
 * PC/H5
 */
const choosePlateformType = async (): Promise<string> => {
  const { type } = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: '请选择平台',
      choices: PLATEFORM_TYPE,
    },
  ])
  return type
}

/**
 * 判断本地是否存在项目
 * answers
 */

const chooseProjectName  = async () => {

}

export default async (options: CreateOptions) => {
  const cwd = options.cwd || process.cwd();

  const isInstall = options.isInstall || true;

  

  // 获取输入配置
  const config: Record<string, any> = {};

  config.plateformType = await choosePlateformType()

  config.projectType = await chooseProjectType()

  log.info(`✨  Creating project in ${cwd}/${options.name}.`)

  console.log(config)
  // 当前项目名是否存在
  if (fs.existsSync(path.join(process.cwd(), options.name))) {
    // 存在
    const answers = await inquirer.prompt([
      {
        message: '是否要覆盖之前文件夹？',
        type: 'confirm',
        name: 'isOverWrite',
        default: false,
      }
    ])
    // 是否覆盖
    if(answers.overwrite) {
      // 覆盖
      fs.removeSync(path.join(process.cwd(), options.name))
    } else {
      return;
    }
  } else {
    // gitClone()
  }

};
