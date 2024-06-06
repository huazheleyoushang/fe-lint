import fg from 'fast-glob';
import { extname, join } from 'path';
import { PKG, ScanOptions } from '../../type';
import { STYLELINT_FILE_EXT, STYLELINT_IGNORE_PATTERN } from '../../utils/constants';
import stylelint from 'stylelint';
import { getStylelintConfig } from './getStylelintConfig';
import { formatStylelintResults } from './formatStylelintResults';


export interface DoStylelintOptions extends ScanOptions {
  pkg: PKG,
}

export async function doStylelint(options: DoStylelintOptions) {
  let files: string[] = [];

  // 匹配 eslint 规则
  if (options.files) {
    files = options.files.filter((name) => STYLELINT_FILE_EXT.includes(extname(name)))
  } else {
    const pattern = join(
      options.include,
      `**/*.{${STYLELINT_FILE_EXT.map((t) => t.replace(/^\./, '')).join(',')}}`,
    );
    files = fg.sync(pattern, {
      cwd: options.cwd,
      ignore: STYLELINT_IGNORE_PATTERN,
    });
  }

  const data = await stylelint.lint({
    ...getStylelintConfig(options, options.pkg, options.config),
    files,
  })

  return formatStylelintResults(data.results, options.quiet)
}