import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  sourcemap: true,
  format: "cjs",
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  outfile: 'dist/index.min.js',
});

await esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: false,
  sourcemap: true,
  format: "cjs",
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  outfile: 'dist/index.js',
});

await esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  sourcemap: true,
  format: "esm",
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  outfile: 'dist/index.min.js',
});

await esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: false,
  sourcemap: true,
  format: "esm",
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  outfile: 'dist/index.js',
});
