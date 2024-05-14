import fs from 'fs-extra';
import path from 'path';
import _ from 'lodash';
import glob from 'glob';
import ejs from 'ejs';

import {
  ESLINT_IGNORE_PATTERN,
  STYLELINT_FILE_EXT,
  STYLELINT_IGNORE_PATTERN,
  MARKDOWN_LINT_IGNORE_PATTERN,
} from '../utils/constants';

/**
 * 配置合并
 * @param filepath 
 * @param content 
 * @returns 
 */
const mergeVSCodeConfig = (filepath: string, content: string) => {
  if (!fs.existsSync(filepath)) {
    return content;
  }
  
  try {
    const targetData = fs.readJSONSync(filepath);
    const sourceData = JSON.parse(content);

    return JSON.stringify(
      _.mergeWith(targetData, sourceData, (target, source) => {
        if (Array.isArray(target) && Array.isArray(source)) {
          return [...new Set(source.concat(target))]
        }
      }),
      null,
      2,
    )
  } catch (e) {
    return ''
  }
}

/**
 * 实例化模板
 * @param cwd
 * @param data
 * @param vscode
 */
export default async (cwd: string, data: Record<string, any>, vscode?: boolean) => {
  const templatePath = path.resolve(__dirname, '../config')
  const templates = glob.sync(`${vscode ? '_vscode' : '**'}/*.ejs`, {cwd: templatePath})

  for (const template of templates) {
    const filepath = path.resolve(cwd, template.replace(/\.ejs$/, '').replace(/^_/, '.'))
    let content = ejs.render(fs.readFileSync(path.resolve(templatePath, template), 'utf8'), {
      eslintIgnores: ESLINT_IGNORE_PATTERN,
      stylelintExt: STYLELINT_FILE_EXT,
      stylelintIgnores: STYLELINT_IGNORE_PATTERN,
      markdownLintIgnores: MARKDOWN_LINT_IGNORE_PATTERN,
      ...data,
    });

    // 合并vscode
    if (/^vscode/.test(template)) {
      content= mergeVSCodeConfig(filepath, content);
    }

    // 跳过空文件
    if (!content.trim()) continue;

    fs.outputFileSync(filepath, content, 'utf8');
  }
};
