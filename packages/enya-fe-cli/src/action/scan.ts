import fs from 'fs-extra';
import path from "path";
import { ScanOptions, ScanReport } from "../type";

export default async (options: ScanOptions): Promise<ScanReport> => {
  const { cwd, fix, outputReport, config: scanConfig } = options;

  const readConfigFile = (pth: string): any => {
    const localPath = path.resolve(cwd, pth);
    return fs.existsSync(localPath) ? require(localPath) : {};
  }

  return {
    // TODO:
    results: [],
    errorCount: 0,
    warningCount: 0,
    runErrors: [],
  }
}