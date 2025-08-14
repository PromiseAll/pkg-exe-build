<h1 align="center">pkg-exe-build</h1>
<p align="center">
    <a href="https://github.com/PromiseAll/pkg-exe-build" target="_blank">
  <img alt="GitHub tag (latest by date)" src="https://img.shields.io/github/v/tag/PromiseAll/pkg-exe-build?label=Version">
  </a>
  <a href="https://github.com/PromiseAll/pkg-exe-build/blob/master/LICENSE" target="_blank">
    <img alt="License: LGPL-3.0-or-later" src="https://img.shields.io/github/license/PromiseAll/pkg-exe-build?color=green" />
  </a>
</p>

<p align="center">
  <strong>中文文档</strong> |
  <a href="README.md">English Documentation</a>
</p>

一个用于配置 Windows PKG 包生成的 exe 文件图标和详细信息的 Node.js 工具。本项目是基于 [AngaBlue/exe](https://github.com/AngaBlue/exe) 2.0 版本的分支，并进行了更新和改进。

### 🏠 [项目主页](https://github.com/PromiseAll/pkg-exe-build)

## ⚠️ 与 1.X 版本的不兼容变更

与 1.X 系列相比，此版本引入了多项重大变更：

1. **仓库地址**：新仓库位于 https://github.com/PromiseAll/pkg-exe-build
2. **PKG 依赖**：更新为使用 `@yao-pkg/pkg` 替代原有的 pkg 包
3. **构建系统**：现在使用 tsup 进行构建，替代之前的构建系统
4. **模块系统**：完整的 ES Module 支持，同时提供 ESM 和 CommonJS 导出
5. **CLI 命令**：包现在提供了一个简短的 CLI 命令别名 `pkge` 以便更方便地使用

## 安装

使用您选择的包管理器安装此包并保存到 `devDependencies`。

```sh
npm i -D pkg-exe-build
```

## 命令行用法

您也可以使用命令行方式来构建可执行文件。为了方便使用，本包提供了一个简短的 CLI 命令别名 `pkge`：

```sh
npx pkge -e ./index.js -o ./build/我的酷应用.exe
```

### 命令行选项

| 选项               | 描述                                                                           | 必需   | 默认值           | 示例值                                 |
| ------------------ | ------------------------------------------------------------------------------ | ------ | ---------------- | -------------------------------------- |
| `-e, --entry`      | 应用程序的入口文件路径。                                                        | 是     | N/A              | `./index.js`                           |
| `-o, --out`        | 输出可执行文件的路径。                                                          | 是     | N/A              | `./build/我的酷应用.exe`               |
| `-p, --pkg`        | pkg 包的额外参数。                                                              | 否     | `[]`             | `-C GZip`                              |
| `-t, --target`     | 目标 Node 版本和架构。                                                          | 否     | `latest-win-x64`  | `latest-win-x64`                       |
| `--app-version`    | 应用程序的版本。                                                                | 否     | None             | `2.4.2`                                |
| `-i, --icon`       | 应用程序的 .ico 格式图标路径。                                                  | 否     | Node.js 图标     | `./assets/icon.ico`                    |
| `-l, --execution-level` | 应用程序的执行级别。                                                      | 否     | `asInvoker`      | `asInvoker`                            |
| `--properties.FileDescription` | 可执行文件的描述。                                            | 否     | None             | `"我的酷应用"`                         |
| `--properties.ProductName` | 产品名称。                                                      | 否     | None             | `"我的酷应用"`                         |
| `--properties.LegalCopyright` | 版权信息。                                                  | 否     | None             | `"我的酷应用 © 2023"`                  |
| `--properties.OriginalFilename` | 原始文件名。                                            | 否     | None             | `"我的酷应用.exe"`                     |

### 命令行示例

基本用法：

```sh
npx pkge -e ./index.js -o ./build/我的酷应用.exe
```

完整参数：

```sh
npx pkge \
  -e ./index.js \
  -o ./build/我的酷应用.exe \
  -p -C GZip \
  -t latest-win-x64 \
  --app-version 2.4.2 \
  -i ./assets/icon.ico \
  -l asInvoker \
  --properties.FileDescription "我的酷应用" \
  --properties.ProductName "我的酷应用" \
  --properties.LegalCopyright "我的酷应用 © 2023" \
  --properties.OriginalFilename "我的酷应用.exe"
```

## 基本用法

```js
// build.js
import pkgBuild from "pkg-exe-build";

const build = pkgBuild({
  entry: "./index.js",
  out: "./build/我的酷应用.exe",
});

build.then(() => console.log("构建完成！"));
```

或者使用 CommonJS：

```js
// build.js
const pkgBuild = require("pkg-exe-build");

const build = pkgBuild({
  entry: "./index.js",
  out: "./build/我的酷应用.exe",
});

build.then(() => console.log("构建完成！"));
```

## 示例用法

指定更多参数并完全自定义生成的可执行文件。

```js
// build.js
import pkgBuild from "pkg-exe-build";

const build = pkgBuild({
  entry: "./index.js",
  out: "./build/我的酷应用.exe",
  pkg: ["-C", "GZip"], // 指定额外的 pkg 参数
  version: "2.4.2",
  target: "latest-win-x64",
  icon: "./assets/icon.ico", // 应用图标必须是 .ico 格式
  executionLevel: "asInvoker",
  properties: {
    FileDescription: "我的酷应用",
    ProductName: "我的酷应用",
    LegalCopyright: "PromiseAll https://github.com/PromiseAll",
    OriginalFilename: "我的酷应用.exe",
  },
});

build.then(() => console.log("构建完成！"));
```

## 配置选项

| 选项             | 描述                                                                           | 必需   | 默认值           | 示例值                                 | 可能的值                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------ | ------ | ---------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `entry`          | 应用程序的入口文件路径。                                                        | 是     | N/A              | `'./index.js'`                         | 任何有效的文件路径。                                                                                                   |
| `out`            | 输出可执行文件的路径。                                                          | 是     | N/A              | `'./build/我的酷应用.exe'`             | 任何有效的文件路径。                                                                                                   |
| `pkg`            | [pkg 包的额外参数](https://github.com/vercel/pkg#options)。                    | 否     | `[]`             | `['-C', 'GZip']`                       | pkg 参数数组。                                                                                                        |
| `version`        | 应用程序的版本。                                                                | 否     | None             | `'2.4.2'`                              | 语义化版本字符串。例如：`major.minor.patch`                                                                           |
| `target`         | 目标 Node 版本和架构。                                                          | 否     | `'latest-win-x64'`| `'latest-win-x64'`                     | Windows [pkg 目标字符串](https://github.com/vercel/pkg#options)。例如：`latest-win-x64`、`node18-windows-x64` 等。    |
| `icon`           | 应用程序的 .ico 格式图标路径。                                                  | 否     | Node.js 图标     | `'./assets/icon.ico'`                  | 任何有效的 .ico 文件路径。                                                                                             |
| `executionLevel` | 应用程序的执行级别。                                                            | 否     | `'asInvoker'`    | `'asInvoker'`                          | `asInvoker`、`highestAvailable`、`requireAdministrator`                                                               |
| `properties`     | 可执行文件的元数据。                                                            | 否     | None             | `{ FileDescription: '我的酷应用', ... }`| 如示例中所示的键值对。                                                                                                 |

### 关于 `properties` 的说明：

- `FileDescription`：可执行文件的描述。
- `ProductName`：产品名称。
- `LegalCopyright`：包含 URL 的版权详细信息。
- `OriginalFilename`：原始文件名。

## 开发

构建项目：

```sh
npm run build
```

运行测试：

```sh
npm test
```

运行 CLI 测试：

```sh
npm run test:cli
```

## 支持我们

如果这个项目对您有帮助，请给我们一个 ⭐️！

## 📝 许可证

版权所有 © [PromiseAll](https://github.com/PromiseAll)。<br />
本项目采用 [LGPL-3.0-or-later](https://github.com/PromiseAll/pkg-exe-build/blob/master/LICENSE) 许可证。

## 致谢

本项目基于 [AngaBlue/exe](https://github.com/AngaBlue/exe) 2.0 版本。