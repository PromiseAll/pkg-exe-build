#!/usr/bin/env node

import { program } from 'commander';
import pkgBuild from './index.js';
import type { Options } from './Options.js';
import packageJson from '../package.json';

// Define CLI program
program
  .name('pkge')
  .description('Package Node.js applications into Windows executables with icons and detailed information')
  .version(packageJson.version);

// Define required parameters
program
  .requiredOption('-e, --entry <path>', 'Path to the application entry file')
  .requiredOption('-o, --out <path>', 'Path for the output executable file');

// Define optional parameters
program
  .option('-p, --pkg <args...>', 'Extra arguments for the pkg package', [])
  .option('-t, --target <target>', 'Target Node version and architecture', 'latest-win-x64')
  .option('--app-version <version>', 'Application version (format: major.minor.patch)')
  .option('-i, --icon <path>', 'Path to the application icon in .ico format')
  .option('-l, --execution-level <level>', 'Application execution level', 'asInvoker')
  .option('--properties <properties>', 'Metadata for the executable file (JSON format)')
  .option('--properties.FileDescription <description>', 'Description of the executable')
  .option('--properties.ProductName <name>', 'Product name')
  .option('--properties.LegalCopyright <copyright>', 'Copyright information')
  .option('--properties.OriginalFilename <filename>', 'Original filename');

// Parse command line arguments
program.parse();
const options = program.opts();

// Build configuration object
const buildConfig: Options = {
  entry: options.entry,
  out: options.out,
  pkg: options.pkg,
  target: options.target,
  version: options.appVersion,
  icon: options.icon,
  executionLevel: options.executionLevel,
};

// Parse properties parameter
let propertiesObj: {
  FileDescription?: string;
  ProductName?: string;
  LegalCopyright?: string;
  OriginalFilename?: string;
} = {};

// First try to parse JSON format properties parameter
if (options.properties) {
  try {
    propertiesObj = JSON.parse(options.properties);
  } catch (error) {
    console.error('Error: properties parameter must be valid JSON format');
    console.error('Received properties value:', options.properties);
    console.error('JSON parsing error details:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

// Then process individual properties.attribute parameters (will override attributes with the same name in JSON)
if (options.propertiesFileDescription) {
  propertiesObj.FileDescription = options.propertiesFileDescription;
}
if (options.propertiesProductName) {
  propertiesObj.ProductName = options.propertiesProductName;
}
if (options.propertiesLegalCopyright) {
  propertiesObj.LegalCopyright = options.propertiesLegalCopyright;
}
if (options.propertiesOriginalFilename) {
  propertiesObj.OriginalFilename = options.propertiesOriginalFilename;
}

// If any properties attributes are set, add them to buildConfig
if (Object.keys(propertiesObj).length > 0) {
  buildConfig.properties = propertiesObj as any;
}

// Validate execution level
const validExecutionLevels: Array<'asInvoker' | 'highestAvailable' | 'requireAdministrator'> = [
  'asInvoker',
  'highestAvailable',
  'requireAdministrator',
];

if (buildConfig.executionLevel && !validExecutionLevels.includes(buildConfig.executionLevel as any)) {
  console.error(`Error: Invalid execution level "${buildConfig.executionLevel}"`);
  console.error(`Valid execution levels: ${validExecutionLevels.join(', ')}`);
  process.exit(1);
}

// Validate version format
if (buildConfig.version && !/^\d+\.\d+\.\d+$/.test(buildConfig.version)) {
  console.error('Error: Version format must be major.minor.patch (e.g.: 1.0.0)');
  process.exit(1);
}

// Execute build
console.log('Starting to build executable...');
console.log(`Entry file: ${buildConfig.entry}`);
console.log(`Output path: ${buildConfig.out}`);

pkgBuild(buildConfig)
  .then(() => {
    console.log('Build completed!');
  })
  .catch((error) => {
    console.error('Build failed:', error.message);
    process.exit(1);
  });