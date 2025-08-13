import { defineConfig } from 'tsup';
export default defineConfig({
  entry: [`src/index.ts`, `src/cli.ts`],
  dts: true,
  bundle: true,
  target: 'esnext',
  format: ['cjs', 'esm'],
  publicDir: 'src/assets',
  shims: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
  silent: false,
  external: [],
  platform: 'node',
});
