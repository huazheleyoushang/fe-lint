import fs from 'fs-extra';
import path from 'path';
import { Config, PKG, ScanOptions, ScanReport, ScanResult } from '../type';
import { PKG_NAME } from '../utils/constants';
import { doPrettier, doStylelint } from '../lints';

export default async (options: ScanOptions): Promise<ScanReport> => {
  const { cwd, fix, outputReport, config: scanConfig } = options;

  const readConfigFile = (pth: string): any => {
    const localPath = path.resolve(cwd, pth);
    return fs.existsSync(localPath) ? require(localPath) : {};
  }

  const pkg: PKG = readConfigFile('package.json');
  const config: Config = scanConfig || readConfigFile(`${PKG_NAME}.config.js`);
  const runError: Error[] = [];
  let results: ScanResult[] = [];

  // prettier
  if (fix && config.enablePrettier !== false) {
    await doPrettier(options)
  }

  // stylelint
  if (config.enableStylelint !== false) {
    try {
      const stylelintResults = await doStylelint({ ...options, pkg, config });
      results = results.concat(stylelintResults);
    } catch (e) {
      runError.push(e)
    }
  }
 
  console.log(
    {
      results,
      errorCount: 0,
      warningCount: 0,
      runErrors: [],
    }
  )
  return {
    // TODO:
    results,
    errorCount: 0,
    warningCount: 0,
    runErrors: [],
  }
}