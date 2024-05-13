import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';

import type { PKG } from '../type';

// 移除依赖
const packageNamesToRemove = [
  '@babel/eslint-parser',
  '@commitlint/cli',
  'babel-eslint',
  'eslint',
  'husky',
  'markdownlint',
  'prettier',
  'stylelint',
  'tslint',
]

// 按前缀移除依赖
const packagePrefixesToRemove = [
  '@commitlint/',
  '@typescript-eslint/',
  'eslint-',
  'stylelint-',
  'markdownlint-',
  'commitlint-',
];

const checkUselessConfig = (cwd: string) => {

}

export default async (cwd: string, rewriteConfig?: boolean) => {
  const pkgPath = path.resolve(cwd, 'package.json');
  const pkg: PKG = fs.readFileSync(pkgPath);

  const dependencies = [].concat(
    Object.keys(pkg.dependencies || {}),
    Object.keys(pkg.devDependencies || {}),
  )

  const willRemovePackage = dependencies.filter(
    (name) => 
      packageNamesToRemove.includes(name) || 
      packageNamesToRemove.some((prefix) => name.startswith(prefix))
  )


  return pkg
  const uselessConfig = checkUselessConfig(cwd);
};
