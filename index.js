#!/usr/bin/env node
const { need } = require('pkg-fetch');
const { exec } = require('pkg');
const ResEdit = require('resedit');
const path = require("path");
const fs = require('fs');
const { yellow, blue, green, red } = require("chalk")


const { pkg, icon, version, description, company, name, copyright, file } = require(`${process.cwd()}/exeBuild.config`);
const targets = pkg.targets[0].split('-')

async function build() {
  // 获取下载文件路径
  console.log(`${yellow("> Download Binaries")}`);
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
  console.log(`${yellow("> Read EXE")}`);
  let data = fs.readFileSync(fetchedPath);
  let exe = ResEdit.NtExecutable.from(data);
  let res = ResEdit.NtExecutableResource.from(exe);
  let viList = ResEdit.Resource.VersionInfo.fromEntries(res.entries);

  let vi = viList[0];
  const theversion = `${version}.0`.split(".");

  vi.removeStringValue({ lang: 1033, codepage: 1200 }, 'OriginalFilename');

  vi.removeStringValue({ lang: 1033, codepage: 1200 }, 'InternalName');
  console.log(`${yellow("> Set Product Version")}`);
  vi.setProductVersion(theversion[0], theversion[1], theversion[2], theversion[3], 1033);
  console.log(`${yellow("> Set File Version")}`);
  vi.setFileVersion(theversion[0], theversion[1], theversion[2], theversion[3], 1033);
  console.log(`${yellow("> Set File Info")}`);
  vi.setStringValues(
    { lang: 1033, codepage: 1200 },
    {
      FileDescription: description,
      ProductName: name,
      CompanyName: company,
      LegalCopyright: copyright
    }
  );

  vi.outputToResourceEntries(res.entries);
  console.log(`${yellow("> Set Icon")}`);
  let iconFile = ResEdit.Data.IconFile.from(fs.readFileSync(path.join(process.cwd(), icon)));
  ResEdit.Resource.IconGroupEntry.replaceIconsForResource(
    res.entries,
    1,
    1033,
    iconFile.icons.map((item) => item.data)
  );
  res.outputResource(exe);
  console.log(`${blue("> Generate EXE")}`);
  let newBinary = exe.generate();
  console.log(`${blue("> Save EXE")}`);

  const builtPath = fetchedPath.replace('fetched', 'built')
  fs.writeFileSync(builtPath, Buffer.from(newBinary));
  console.log(`${green("> Bundling App")}`);
  await exec(['--build', '--compress', '--config', `${process.cwd()}/exeBuild.config.js`, `${file}`]);
}


function init() {
  const { copyFileSync, accessSync } = require("fs")
  try {
    accessSync(`${process.cwd()}/exeBuild.config.js`)
    console.log(`Build Config File: ${yellow('exeBuild.config.js')}`);
  } catch (err) {
    copyFileSync('./exeBuild.config.js', `${process.cwd()}/exeBuild.config.js`)
    console.log(`New Build Config File: ${yellow('exeBuild.config.js')}`);
  }
  try {
    accessSync(`${process.cwd()}/app.ico`)
    console.log(`Icon File: ${yellow('app.ico')}`);
  } catch (err) {
    copyFileSync('./app.ico', `${process.cwd()}/app.ico`)
    console.log(`New Icon File: ${yellow('app.ico')}`);
  }
}

const args = process.argv.slice(2);
let type = args[0]

switch (type) {
  case 'init':
    init()
    break;
  case 'build':
    build()
    break;
  default:
    console.log(`Please Run The Command ${blue("pkg-exe-build init")} or ${blue("pkg-exe-build build")}`);
    break;
}
