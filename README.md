# pkg-exe-build

[中文文档]("")
Exe icon and version information cannot be modified in PKG packaging


# install

run `npm i pkg-exe-build -D`

# config

The installation creates the 'exebuild.config. js' configuration file in the current project directory

```js
module.exports = {
  file: "app.js",
  icon: "app.ico",
  name: "name",
  description: "description",
  company: "company",
  version: "1.0.0",
  copyright: "copyright",
  pkg: {
    // https://github.com/vercel/pkg-fetch
    targets: ["node16-win-x64"],
    outputPath: "dist",
    assets: ["node_modules/**/*"],
  },
};
```

# build

run `npx pkg-exe-build`

```cmd
> Download Binaries
> Read EXE
> Set Product Version
> Set File Version
> Set File Info
> Set Icon
> Generate EXE
> Save EXE
> Bundling App
> pkg@5.7.0
> Reusing base binaries built locally:
  C:\Users\Promise\.pkg-cache\v3.4\built-v16.15.0-win-x64
```
