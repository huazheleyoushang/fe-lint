# enya-fe-cli

`enya-fe-cli` 是[前端编码规范工程化](https://github.com/huazheleyoushang/fe-lint)的配套 Lint 工具，可以为项目一键接入规范、一键扫描和修复规范问题，保障项目的编码规范和代码质量，同时支持一键构建项目

## CLI 使用

### 安装

在终端执行：

```bash
npm install enya-fe-lint -g
```

安装完成后，可执行 `enya -h` 以验证安装成功。

### 快速构建 🚀

#### `enya create <项目名称>`：一键构建

## 已有项目接入规范

### 使用 🔧

#### `enya init`：一键初始化项目

> 注 1：如果项目已经配置过 ESLint、stylelint 等 Linter，执行 `enya init` 将会提示存在冲突的依赖和配置，并在得到确认后进行覆盖：
>
> 注 2：`enya init` 自动写入 `.vscode/extensions.json` 和 `.vscode/settings.json` 配置文件，实现保存自动化格式

#### `enya scan`：一键扫描

在项目的根目录执行命令，即可扫描项目的规范问题：

支持下列参数：

- `-q` `--quiet` 仅报告 error 级别的问题
- `-o` `--output-report` 输出扫描出的规范问题日志
- `-i` `--include <dirpath>` 指定要进行规范扫描的目录
- `--no-ignore` 忽略 eslint 的 ignore 配置文件和 ignore 规则

#### `enya fix`：一键修复

在项目的根目录执行命令，即可修复部分规范问题：

支持下列参数：

- `-i` `--include <dirpath>` 指定要进行修复扫描的目录
- `--no-ignore` 忽略 eslint 的 ignore 配置文件和 ignore 规则

注意请 review 下修复前后的代码，以免工具误修的情况。
