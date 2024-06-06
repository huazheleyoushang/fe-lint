import fs from 'fs-extra';
import path from 'path';
import { Config, PKG, ScanOptions, ScanReport, ScanResult } from '../type';
import { PKG_NAME } from '../utils/constants';
import { doPrettier, doStylelint, doESLint} from '../lints';

export default async (options: ScanOptions): Promise<ScanReport> => {
  const { cwd, fix, outputReport, config: scanConfig } = options;

  const readConfigFile = (pth: string): any => {
    const localPath = path.resolve(cwd, pth);
    return fs.existsSync(localPath) ? require(localPath) : {};
  }

  const pkg: PKG = readConfigFile('package.json');
  const config: Config = scanConfig || readConfigFile(`${PKG_NAME}.config.js`);
  const runErrors: Error[] = [];
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
      runErrors.push(e)
    }
  }

  // eslint
  if (config.enableESLint !== false) {
    try {
      const eslintResults = await doESLint({...options, pkg, config });
      results = results.concat(eslintResults);
    } catch (e) {
      runErrors.push(e)
    }
  } 

  // 生成报告
  if (outputReport) {
    const reportPath = path.resolve(cwd, `./${PKG_NAME}-report.json`);
    fs.outputFileSync(reportPath, JSON.stringify(results, null, 2));
  }
 
  return {
    results,
    errorCount: results.reduce((count, { errorCount }) => count + errorCount, 0 ),
    warningCount: results.reduce((count, { warningCount }) => count + warningCount, 0),
    runErrors
  }
}