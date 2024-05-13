import { sync as commandExistsSync } from 'command-exists';

/**
 * npm 类型
 */

const promise: Promise<'npm' | 'pnpm'> = new Promise((resolve) => {
  // 默认使用pnpm
  if (!commandExistsSync('pnpm')) {
    return resolve('npm')
  }
  
  resolve('pnpm')
})

export default promise