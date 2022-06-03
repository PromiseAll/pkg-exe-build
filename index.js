#!/usr/bin/env node
const { need } = require('pkg-fetch');
const { exec } = require('pkg');
const ResEdit = require('resedit');
const path = require("path");
const fs = require('fs');

const { pkg, icon, version, description, company, name, copyright, file } = require(`${process.cwd()}/exeBuild.config`);
const targets = pkg.targets[0].split('-')

async function build() {
  // 获取下载文件路径
  console.log("> 下载 二进制文件");
  let fetchedPath = await need(
    {
      nodeRange: targets[0], //node 版本
      platform: targets[1],// win 版本
      arch: targets[2], // 64位
      forceBuild: false, // 是否构建
      forceFetch: true,
      dryRun: false, //输出类型 ['exists', 'fetched', 'built']
      // output: 'test'  // 自定义路劲
    })
  console.log('> 读取 EXE');
  let data = fs.readFileSync(fetchedPath);
  let exe = ResEdit.NtExecutable.from(data);
  let res = ResEdit.NtExecutableResource.from(exe);
  let viList = ResEdit.Resource.VersionInfo.fromEntries(res.entries);
  // console.log(viList[0].data.strings);
  let vi = viList[0];
  const theversion = `${version}.0`.split(".");
  // console.log('删除 OriginalFilename');
  vi.removeStringValue({ lang: 1033, codepage: 1200 }, 'OriginalFilename');
  // console.log('删除 InternalName');
  vi.removeStringValue({ lang: 1033, codepage: 1200 }, 'InternalName');
  console.log('> 设置 Product Version');
  vi.setProductVersion(theversion[0], theversion[1], theversion[2], theversion[3], 1033);
  console.log('> 设置 File Version');
  vi.setFileVersion(theversion[0], theversion[1], theversion[2], theversion[3], 1033);
  console.log('> 设置 File Info');
  vi.setStringValues(
    { lang: 1033, codepage: 1200 },
    {
      FileDescription: description,
      ProductName: name,
      CompanyName: company,
      LegalCopyright: copyright
    }
  );
  // console.log(vi.data.strings);
  vi.outputToResourceEntries(res.entries);
  console.log('> 设置 Icon');
  let iconFile = ResEdit.Data.IconFile.from(fs.readFileSync(path.join(__dirname, icon)));
  ResEdit.Resource.IconGroupEntry.replaceIconsForResource(
    res.entries,
    1,
    1033,
    iconFile.icons.map((item) => item.data)
  );
  res.outputResource(exe);
  console.log('> 生成 EXE');
  let newBinary = exe.generate();
  console.log('> 保存 EXE');
  const builtPath = fetchedPath.replace('fetched', 'built')
  fs.writeFileSync(builtPath, Buffer.from(newBinary));
  console.log('> Bundling App');
  await exec(['--build', '--compress', '--config', `${process.cwd()}/exeBuild.config.js`, `${file}`]);
}

build()