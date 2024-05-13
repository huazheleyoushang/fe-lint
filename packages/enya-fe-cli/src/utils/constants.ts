import path from 'path';
import fs from 'fs-extra';

// 获取 package.json 配置
const pkg: Record<string, string> = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf8')
);

// icon 标识
export enum UNICODE {
  success = '\u2714', // ✔
  failure = '\u2716', // ✖
}

export const PKG_NAME = pkg.name;
// 包版本
export const PKG_VERSION = pkg.version;

/**
 * 项目类型 Type
 */

export const PROJECT_TYPES: Array<{ name: string, value: string }> = [
  {
    name: 'Vue + JavaScript',
    value: 'vue',
  },
  {
    name: 'Vue + TypeScript',
    value: 'typeScript/vue',
  },
  {
    name: 'React + JavaScript',
    value:'react',
  },
  {
    name: 'React + TypeScript',
    value: 'typeScript/react',
  },
  {
    name: 'Node + TypeScript',
    value: 'node'
  },
  {
    name: 'Node + TypeScript',
    value: 'typeScript/node'
  }
]