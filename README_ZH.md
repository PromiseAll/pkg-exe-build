# pkg-exe-build

配置 windows 平台下 pkg 打包 生成 exe文件的图标及详细信息

# 安装

执行 `npm i pkg-exe-build -D`

# 配置

安装会在当前项目目录下创建`exeBuild.config.js`配置文件

```js
module.exports = {
  file: "app.js", // 入口
  icon: "favicon.ico", // 图标
  name: "name", // 名称
  description: "描述信息",
  company: "公司",
  version: "1.0.0",
  copyright: "版权信息",
  pkg: {
    // 参考pkg 的配置文档 https://github.com/vercel/pkg-fetch
    targets: ["node16-win-x64"], //注意只能配置 win 且 只能一个
    outputPath: "dist", // 输出目录
    assets: ["node_modules/**/*"], // 资源目录
  },
};
```

# 打包

执行 `npx pkg-exe-build` 进行打包

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