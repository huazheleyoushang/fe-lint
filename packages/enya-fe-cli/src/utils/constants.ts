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

/**
 * eslint 扫描文件扩展名
 */
export const ESLINT_FILE_EXT: string[] = ['.js', '.jsx', '.ts', '.tsx', '.vue'];

/**
 * eslint 扫描/忽略文件
 * 同步到 config/.eslintignore.ejs
 */

export const ESLINT_IGNORE_PATTERN: string[] = [
  'node_modules',
  'build',
  'dist',
  'lib',
  'coverage',
  'test',
  'tests',
  'es',
  '**/*-min.js',
  '**/*.min.js',
  '**/*.bundle.js',
]

/**
 * stylelint 扫描文件扩展名
 */
export const STYLELINT_FILE_EXT: string[] = ['.css', '.scss', '.less', '.sass'];

/**
 * 扫描文件拓展名
 */
export const STYLELINT_IGNORE_PATTERN: string[] = [
  'node_modules/',
  'build/',
  'dist/',
  'coverage/',
  'es/',
  'lib/',
  '**/*.min.css',
  '**/*-min.css',
  '**/*.bundle.css',
]

/**
 * markdownLint 扫描文件扩展名
 */
export const MARKDOWN_LINT_FILE_EXT: string[] = ['.md'];

/**
 * markdownLint 扫描忽略的文件或文件目录
 */
export const MARKDOWN_LINT_IGNORE_PATTERN: string[] = [
  'node_modules/',
  'build/',
  'dist/',
  'coverage/',
  'es/',
  'lib/',
];

/**
 * Prettier 扫描文件扩展名
 */
export const PRETTIER_FILE_EXT = [
  ...STYLELINT_FILE_EXT,
  ...ESLINT_FILE_EXT,
  ...MARKDOWN_LINT_FILE_EXT,
];

/**
 * Prettier 扫描忽略的文件或文件目录
 */
export const PRETTIER_IGNORE_PATTERN: string[] = [
  'node_modules/**/*',
  'build/**/*',
  'dist/**/*',
  'lib/**/*',
  'es/**/*',
  'coverage/**/*',
];
