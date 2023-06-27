import * as esbuild from 'esbuild';
import { type BuildOptions } from 'esbuild';

const options: BuildOptions = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  sourcemap: true,
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
};

// CommonJS
await esbuild.build({
  ...options,
  minify: false,
  format: 'cjs',
  outfile: 'dist/index.js',
});

// CommonJS (minified)
await esbuild.build({
  ...options,
  minify: true,
  format: 'cjs',
  outfile: 'dist/index.min.js',
});

// ES Module
await esbuild.build({
  ...options,
  minify: false,
  format: 'esm',
  outfile: 'dist/index.mjs',
});

// ES Module (minified)
await esbuild.build({
  ...options,
  minify: true,
  format: 'esm',
  outfile: 'dist/index.min.mjs',
});
