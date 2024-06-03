import fs from 'fs-extra';
import glob from 'glob';
import path from 'path';
import { Config, PKG, ScanOptions } from '../../type'
import { LinterOptions } from 'stylelint';
import { STYLELINT_IGNORE_PATTERN } from '../../utils/constants';

export const getStylelintConfig = (options: ScanOptions, pkg: PKG, config: Config): LinterOptions => {
  const { fix, cwd } = options;

  const lintConfig: any = {
    fix: Boolean(fix),
    allowEmptyInput: true,
  }

  if (config.stylelintOptions) {
    Object.assign(lintConfig, config.stylelintOptions);
  } else {
    // 是否存在 stylelintrc 文件
    const lintConfigFiles = glob.sync('.stylelintrc?(.@(js|yaml|yml|json))', { cwd })
    if (lintConfigFiles.length === 0 && !pkg.stylelint) {
      lintConfig.Config = {
        extends: 'stylelint-fe-lint'
      }
    }

    // 查找 ignore 文件
    const lintIgnoreFilePath = path.resolve(cwd, './stylelintignore');
    if (!fs.existsSync(lintIgnoreFilePath)) {
      lintConfig.ignorePattern = STYLELINT_IGNORE_PATTERN;
    }
  }
  return lintConfig
}