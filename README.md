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
  <a href="README_CN.md">中文文档</a> |
  <strong>English Documentation</strong>
</p>

A Node.js tool for configuring Windows PKG package generated exe file icons and detailed information. This project is a fork of [AngaBlue/exe](https://github.com/AngaBlue/exe) version 2.0, with updates and improvements.

### 🏠 [Homepage](https://github.com/PromiseAll/pkg-exe-build)

## ⚠️ Breaking Changes from 1.X

This version introduces several breaking changes compared to the 1.X series:

1. **Repository**: New repository at https://github.com/PromiseAll/pkg-exe-build
2. **PKG Dependency**: Updated to use `@yao-pkg/pkg` instead of the original pkg package
3. **Build System**: Now uses tsup for building instead of the previous build system
4. **Module System**: Full ES Module support with both ESM and CommonJS exports
5. **CLI Command**: The package now provides a short CLI command alias `pkge` for easier usage

## Install

Install this package and save to `devDependencies` using your package manager of choice.

```sh
npm i -D pkg-exe-build
```

## Command Line Usage

You can also use the command line interface to build executables. The package provides a short CLI command alias `pkge` for convenience:

```sh
npx pkge -e ./index.js -o ./build/My Cool App.exe
```

### Command Line Options

| Option            | Description                                                                   | Required | Default Value      | Example Value                             |
| ----------------- | ----------------------------------------------------------------------------- | -------- | ------------------ | ----------------------------------------- |
| `-e, --entry`     | Path to the entry file of the application.                                    | Yes      | N/A                | `./index.js`                              |
| `-o, --out`       | Path for the output executable file.                                          | Yes      | N/A                | `./build/My Cool App.exe`                |
| `-p, --pkg`       | Extra arguments for the pkg package.                                          | No       | `[]`               | `-C GZip`                                 |
| `-t, --target`    | Target node version and architecture.                                         | No       | `latest-win-x64`   | `latest-win-x64`                          |
| `--app-version`   | Version of the application.                                                   | No       | None               | `2.4.2`                                   |
| `-i, --icon`      | Path to the application's icon in .ico format.                                | No       | Node.js icon       | `./assets/icon.ico`                       |
| `-l, --execution-level` | Execution level for the application.                                          | No       | `asInvoker`        | `asInvoker`                               |
| `--properties`    | Metadata for the executable file (JSON format).                               | No       | None               | `'{"FileDescription":"My Cool App"}'`    |

### Command Line Examples

Basic usage:

```sh
npx pkge -e ./index.js -o ./build/My Cool App.exe
```

Full parameters:

```sh
npx pkge \
  -e ./index.js \
  -o ./build/My Cool App.exe \
  -p -C GZip \
  -t latest-win-x64 \
  --app-version 2.4.2 \
  -i ./assets/icon.ico \
  -l asInvoker \
  --properties '{"FileDescription":"My Cool App","ProductName":"My Cool App","LegalCopyright":"PromiseAll https://github.com/PromiseAll","OriginalFilename":"My Cool App.exe"}'
```

## Basic Usage

```js
// build.js
import pkgBuild from "pkg-exe-build";

const build = pkgBuild({
  entry: "./index.js",
  out: "./build/My Cool App.exe",
});

build.then(() => console.log("Build completed!"));
```

Or using CommonJS:

```js
// build.js
const pkgBuild = require("pkg-exe-build");

const build = pkgBuild({
  entry: "./index.js",
  out: "./build/My Cool App.exe",
});

build.then(() => console.log("Build completed!"));
```

## Example Usage

Specify more arguments and completely customize the resultant executable.

```js
// build.js
import pkgBuild from "pkg-exe-build";

const build = pkgBuild({
  entry: "./index.js",
  out: "./build/My Cool App.exe",
  pkg: ["-C", "GZip"], // Specify extra pkg arguments
  version: "2.4.2",
  target: "latest-win-x64",
  icon: "./assets/icon.ico", // Application icons must be in .ico format
  executionLevel: "asInvoker",
  properties: {
    FileDescription: "My Cool App",
    ProductName: "My Cool App",
    LegalCopyright: "PromiseAll https://github.com/PromiseAll",
    OriginalFilename: "My Cool App.exe",
  },
});

build.then(() => console.log("Build completed!"));
```

## Configuration Options

| Option           | Description                                                                   | Required | Default Value      | Example Value                             | Possible Values                                                                                                       |
| ---------------- | ----------------------------------------------------------------------------- | -------- | ------------------ | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `entry`          | Path to the entry file of the application.                                    | Yes      | N/A                | `'./index.js'`                            | Any valid file path.                                                                                                  |
| `out`            | Path for the output executable file.                                          | Yes      | N/A                | `'./build/My Cool App.exe'`               | Any valid file path.                                                                                                  |
| `pkg`            | [Extra arguments for the pkg package](https://github.com/vercel/pkg#options). | No       | `[]`               | `['-C', 'GZip']`                          | Array of pkg arguments.                                                                                               |
| `version`        | Version of the application.                                                   | No       | None               | `'2.4.2'`                                 | Semantic version string. e.g. `major.minor.patch`                                                                     |
| `target`         | Target node version and architecture.                                         | No       | `'latest-win-x64'` | `'latest-win-x64'`                        | Windows [pkg target string](https://github.com/vercel/pkg#options). e.g. `latest-win-x64`, `node18-windows-x64`, etc. |
| `icon`           | Path to the application's icon in .ico format.                                | No       | Node.js icon       | `'./assets/icon.ico'`                     | Any valid .ico file path.                                                                                             |
| `executionLevel` | Execution level for the application.                                          | No       | `'asInvoker'`      | `'asInvoker'`                             | `asInvoker`, `highestAvailable`, `requireAdministrator`                                                               |
| `properties`     | Metadata for the executable file.                                             | No       | None               | `{ FileDescription: 'My Cool App', ... }` | Key-value pairs as shown in example.                                                                                  |

### Note on `properties`:

- `FileDescription`: Description of the executable.
- `ProductName`: Name of the product.
- `LegalCopyright`: Copyright details with the URL.
- `OriginalFilename`: Name of the original file.

## Development

To build the project:

```sh
npm run build
```

To run tests:

```sh
npm test
```

To run CLI tests:

```sh
npm run test:cli
```

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © [PromiseAll](https://github.com/PromiseAll).<br />
This project is [LGPL-3.0-or-later](https://github.com/PromiseAll/pkg-exe-build/blob/master/LICENSE) licensed.

## Acknowledgments

This project is based on [AngaBlue/exe](https://github.com/AngaBlue/exe) version 2.0.
