const { copyFileSync, accessSync } = require("fs")
const { yellow } = require("chalk")

try {
  accessSync(`${process.cwd()}/exeBuild.config.js`)
  console.log(`Build Config File: ${yellow('exeBuild.config.js')}`);
} catch (err) {
  copyFileSync('./exeBuild.config.js', `${process.cwd()}/exeBuild.config.js`)
  console.log(`New Build Config File: ${yellow('exeBuild.config.js')}`);
}