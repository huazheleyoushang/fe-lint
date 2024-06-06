import { ESLint } from 'eslint';
import fg from 'fast-glob';
import { extname, join } from 'path';
import { ESLINT_FILE_EXT, ESLINT_IGNORE_PATTERN } from '../../utils/constants';
import { getESLintConfig } from './getESLintConfig';
import { formatESLintResults } from './formatESLintResults';


import { PKG, Config, ScanOptions } from '../../type';
export interface DoESLintOptions extends ScanOptions {
  pkg: PKG;
  config?: Config;
}

export async function doESLint(options: DoESLintOptions) {
  let files: string[] = [];
  if (options.files) {
    files = options.files.filter((name) => ESLINT_FILE_EXT.includes(extname(name)));
  } else {
    files = await fg(`**/*.${ESLINT_FILE_EXT.map((t) => t.replace(/^\./, '')).join(',')}}`, {
      cwd: options.cwd,
      ignore: ESLINT_IGNORE_PATTERN,
    })
  }
  
  const eslint = new ESLint(getESLintConfig(options, options.pkg, options.config));
  const reports  = await eslint.lintFiles(files);

  if (options.fix) {
    await ESLint.outputFixes(reports);
  }

  return formatESLintResults(reports, options.quiet, eslint);
}