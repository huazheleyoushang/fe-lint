import fg from 'fast-glob';
import { extname, join } from 'path';
import { PKG, ScanOptions } from '../../type';
import { ESLINT_FILE_EXT, ESLINT_IGNORE_PATTERN } from '../../utils/constants';
import stylelint from 'stylelint';
import { getStylelintConfig } from './getStylelintConfig';
import { formatStylelintResults } from './formatStylelintResults';


export interface doEslintOptions extends ScanOptions {
  pkg: PKG,
}

export async function doStylelint(options: doEslintOptions) {
  let files: string[] = [];

  // 匹配 eslint 规则
  if (options.files) {
    files = options.files.filter((name) => ESLINT_FILE_EXT.includes(extname(name)))
  } else {
    const pattern = join(
      options.include,
      `**/*.{${ESLINT_FILE_EXT.map((t) => t.replace(/^\./, '')).join(',')}}`,
    );
    files = fg.sync(pattern, {
      cwd: options.cwd,
      ignore: ESLINT_IGNORE_PATTERN,
    });
  }

  const data = await stylelint.lint({
    files,
    ...getStylelintConfig(options, options.pkg, options.config),
  })

  return formatStylelintResults(data.results, options.quiet)
}