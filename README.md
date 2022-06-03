# pkg-exe-build

解决 pkg 打包不能修改 exe 的问题

# 安装

执行 `npm i pkg-exe-build -D`

# 配置

在当前项目目录下创建`exeBuild.config.js`配置文件

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
    assets: ["node_modules/printer/lib/node_printer.node"], // 忽略文件
  },
};
```

# 打包

执行 `npx pkg-exe-build`

```cmd
> 下载 二进制文件
> 读取 EXE
> 设置 Product Version
> 设置 File Version
> 设置 File Info
> 设置 Icon
> 生成 EXE
> 保存 EXE
> Bundling App
> pkg@5.7.0
> Reusing base binaries built locally:
  C:\Users\Promise\.pkg-cache\v3.4\built-v16.15.0-win-x64
```
