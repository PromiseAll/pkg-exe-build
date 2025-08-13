#!/usr/bin/env node

import { join } from 'path';
import { execSync } from 'child_process';
import { readFileSync, existsSync, rmSync } from 'fs';

// Test output file path
const outputPath = join(import.meta.dirname, 'CLI Test App.exe');

// Clean up previous test files
if (existsSync(outputPath)) {
  rmSync(outputPath);
}

console.log('Starting to test CLI functionality...');

try {
  // Build CLI command
  // Use properties.attribute format to pass parameters to avoid JSON parsing issues
  const cliCommand = `node "${join(import.meta.dirname, '../dist/cli.js')}" \
    -e "${join(import.meta.dirname, 'index.js')}" \
    -o "${outputPath}" \
    -p -C GZip \
    -t latest-win-x64 \
    --app-version 2.4.2 \
    -i "${join(import.meta.dirname, 'icon.ico')}" \
    -l asInvoker \
    --properties.FileDescription "CLI Test App" \
    --properties.ProductName "CLI Test App" \
    --properties.LegalCopyright "CLI Test App © 2023" \
    --properties.OriginalFilename "CLITestApp.exe"`;

  console.log('Executing command:', cliCommand);

  // Execute CLI command
  execSync(cliCommand, { stdio: 'inherit' });

  // Check if output file exists
  if (existsSync(outputPath)) {
    console.log('CLI test successful! Executable file has been generated.');

    // Try to run the generated executable file
    try {
      const result = execSync(`"${outputPath}"`, { encoding: 'utf8' });
      console.log('Executable file output:', result);
    } catch (runError) {
      console.log('Error running executable file:', runError.message);
    }
  } else {
    console.error('CLI test failed! Executable file was not generated.');
    process.exit(1);
  }
} catch (error) {
  console.error('CLI test failed:', error.message);
  process.exit(1);
}