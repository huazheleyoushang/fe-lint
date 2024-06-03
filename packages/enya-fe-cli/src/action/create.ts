import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';
import log from '../utils/log';
import ora from 'ora';
import gitClone from 'git-clone';

import { PROJECT_TYPES, PLATEFORM_TYPE } from '../utils/constants';
import type { CreateOptions, PKG, CONFIG } from '../type';
import { templateList } from '../utils/map-template';

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

const editFile = async (projectName: string) => {
  try {
    // 读取文件
    fs.readFile(`${process.cwd()}/${projectName}/package.json`, (err, data) => {
      if (err) throw err;

      let _data = JSON.parse(data.toString())
      _data.name = projectName
      _data.version = '0.1.0'
      let str = JSON.stringify(_data, null, 2);

      fs.writeFile(`${process.cwd()}/${projectName}/package.json`, str, function (err) {
          if (err) throw err;
      })
    });
  } catch (error) {
    log.error('\n 修改文件失败')
  }
}

/**
 * 新建模版项目
 * create
 */
const createTemplate = async (payload: CONFIG) => {
  const { cwd, projectName } = payload
  const config: CONFIG = {
    projectName,
    cwd,
  }

  config.plateformType = await choosePlateformType()
  config.projectType = await chooseProjectType()

  const changeGit = templateList.filter((temp) => temp.key === config.projectType)
  if(changeGit.length === 0) {
    log.warn('暂不支持该模版, 请关注更新')
    return
  }
  const loading = ora('📝  构建项目模版中...')
  loading.start();
  const gitLink = changeGit[0].git
  gitClone(
    gitLink,
    projectName, 
    { checkout: 'main' },
    async function (err) {
      if (err) {
        log.error(err)
        loading.stop()
        return
      }
      await editFile(projectName)
      fs.removeSync(`${cwd}/${projectName}/.git`)
      loading.stop()

      log.success(`✅ 项目${projectName}创建成功`)
      log.success(`\n cd ${projectName}`)
      log.success(`\n pnpm install`)
      log.success(`\n pnpm dev \n`)
    }
  )
}

export default async (options: CreateOptions) => {
  const cwd = options.cwd || process.cwd();

  const isInstall = options.isInstall || true;

  // 获取输入配置
  const config: CONFIG = {
    projectName: options.projectName,
    cwd,
  };

  // 当前项目名是否存在
  if (fs.existsSync(path.join(cwd, options.projectName))) {
    const answers = await inquirer.prompt([
      {
        message: '是否要覆盖之前文件夹？',
        type: 'confirm',
        name: 'isOverWrite',
        default: false,
      }
    ])

    if(answers.isOverWrite) {
      fs.removeSync(path.join(cwd, options.projectName))
      createTemplate(config)
    } else {
      return;
    }
  } else {
    createTemplate(config)
  }
};
