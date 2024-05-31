import { ESLint } from 'eslint';
import stylelint from 'stylelint';
import markdownlint from 'markdownlint';
/**
 * 类型定义
 */

export interface PKG {
  eslintConfig?: any;
  eslintIgnore?: string[];
  stylelint?: any;
  peerDependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  dependencies?: Record<string, string>;

  [key: string]: any;
}

export interface CONFIG {
  projectName: string;
  cwd?: string;
  projectType?: string;
  plateformType?: string;
}

export interface CreateOptions {
  // 项目名称
  projectName: string;
  cwd: string;
  // 是否启用 ESlint
  enableESLint?: boolean;
  // 是否启用 stylelint
  enableStylelint?: boolean;
  // 是否自动下载依赖
  isInstall?: boolean;
}
export interface InitOptions {
  cwd: string,
  // 检查版本是否需要升级
  checkVersionUpdate: boolean;
  // 是否需要写入 lint 配置
  rewriteConfig?: boolean;
  // eslint 类型
  eslintType?: string;
  // 是否启用 ESlint
  enableESLint?: boolean;
  // 是否启用 stylelint
  enableStylelint?: boolean;
  // 是否启用 markdownlint
  enableMarkdownlint?: boolean;
  // 是否启用 prettier
  enablePrettier?: boolean;
  // 是否初始化后，安装依赖
  disableNpmInstall?: boolean;
}

export interface Config {
  // 是否启用 ESLint
  enableESLint?: boolean;
  // 是否启用 stylelint
  enableStylelint?: boolean;
  // 是否启用 markdown lint
  enableMarkdownlint?: boolean;
  // 是否启用 prettier
  enablePrettier?: boolean;
  // ESLint 配置项
  eslintOptions?: ESLint.Options;
  // stylelint 配置项
  stylelintOptions?: stylelint.LinterOptions;
  // markdownlint 配置项
  markdownlintOptions?: markdownlint.Options;
}

// 扫描项目类型
export interface ScanOptions {
  // 工程目录
  cwd: string;
  // 进行规范扫描的目录
  include: string;
  // 扫描文件列表
  files?: string[];
  quiet?: boolean;
  ignore?: boolean;
  // 自动修复
  fix?: boolean;
  // 生成报告
  outputReport?: boolean;
  config?: Config,
}

// 扫描项目导出类型
export interface ScanResult {
  filePath: string;
  errorCount: number;
  warningCount: number;
  fixableErrorCount: number;
  fixableWarningCount: number;
  messages: Array<{
    line: number;
    column: number;
    rule: string;
    url: string;
    message: string;
    errored: boolean;
  }>;
}

export interface ScanReport {
  results: ScanResult[];
  errorCount: number;
  warningCount: number;
  runErrors: Error[];
}