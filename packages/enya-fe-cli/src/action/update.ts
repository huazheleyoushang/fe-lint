import ora from 'ora';
import { execSync } from 'child_process';
import { PKG_NAME, PKG_VERSION } from '../utils/constants';
import log from '../utils/log';
import npmType from '../utils/npm-type';

/**
 * 检查最新版本号
 */
const checkLatestVersion = async (): Promise<string | null> => {
  const npm = await npmType;
  // 测试数据
  const PKG_NAME_TEST = 'eslint-fe-lint'
  const latestVersion = execSync(`${npm} view ${PKG_NAME_TEST} version`).toString('utf-8').trim();

  if (latestVersion === PKG_VERSION) {
    return null;
  }

  const curCompare = PKG_VERSION.split('.').map(Number)
  const lastCompareArr = latestVersion.split('.').map(Number)

  // 依次比较版本号大小
  for (let i = 0; i < curCompare.length; i++) {
    if (curCompare[i] > lastCompareArr[i]) {
      return null;
    } else if (curCompare[i] < lastCompareArr[i]) {
      return latestVersion
    }
  }
}

export default async (install = true) => {
  /**
   * 检查最新包版本，自动安装
   */
  const checking = ora(`[${PKG_NAME}] 正在检查最新版本...`);
  checking.start();

  try {
    const npm = await npmType;
    const latestVersion = await checkLatestVersion();

    checking.stop();
    if (!latestVersion) {
      log.info(`[${PKG_NAME}] 当前版本为最新版本，无需更新`);
      return;
    } else if (latestVersion && install) {

    }


  } catch (e) {
    // 兜底处理
    checking.stop();
    log.error(e);
  }
};
