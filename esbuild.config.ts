import * as esbuild from 'esbuild';
import { type BuildOptions } from 'esbuild';

const baseOptions: BuildOptions = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  sourcemap: true,
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
};

const minifyOptions: BuildOptions = {
  minifyWhitespace: true,
  minifySyntax: true,
  minifyIdentifiers: false,
};

// CommonJS
await esbuild.build({
  ...baseOptions,
  minify: false,
  format: 'cjs',
  outfile: 'dist/index.js',
});

// CommonJS (minified)
await esbuild.build({
  ...baseOptions,
  ...minifyOptions,
  format: 'cjs',
  outfile: 'dist/index.min.js',
});

// ES Module
await esbuild.build({
  ...baseOptions,
  minify: false,
  format: 'esm',
  outfile: 'dist/index.mjs',
});

// ES Module (minified)
await esbuild.build({
  ...baseOptions,
  ...minifyOptions,
  format: 'esm',
  outfile: 'dist/index.min.mjs',
});
