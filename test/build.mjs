import { join } from 'path';
import pkgBuild from '../dist/index.js';
import { execSync } from 'child_process';

const build = pkgBuild({
  entry: join(import.meta.dirname, 'index.js'),
  out: join(import.meta.dirname, 'My Cool App.exe'),
  pkg: ['-C', 'GZip'], // Specify extra pkg arguments
  version: '2.4.2',
  target: 'latest-win-x64',
  icon: join(import.meta.dirname, 'icon.ico'), // Application icons must be in .ico format
  executionLevel: 'asInvoker',
  properties: {
    FileDescription: 'My Cool App',
    ProductName: 'My Cool App',
    LegalCopyright: 'My Cool App © 2023',
    OriginalFilename: 'MyCool App.exe',
  },
});

build.then(() => {
  console.log('Build completed!');
  console.log(execSync(`"${join(import.meta.dirname, 'My Cool App.exe')}"`).toString());
});
