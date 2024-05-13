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

export interface InitOptions {
  cwd: string,
  // 检查版本是否需要升级
  checkVersionUpdate: boolean;
  // 项目名称
  name: string;
  // 是否需要写入 lint 配置
  rewriteConfig?: boolean;
  // eslint 类型
  eslintType?: string;
  // 是否启用 eslint
  enableEslint?: boolean;
  // 是否启用 stylelint
  enableStylelint?: boolean;
  // 是否启用 markdownlint
  enableMarkdownlint?: boolean;
  // 是否启用 prettier
  enablePrettier?: boolean;
  // 是否初始化后，安装依赖
  disableNpmInstall?: boolean;
}