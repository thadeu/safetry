const esbuild = require('esbuild');
const { safetryPlugin } = require('../src/esbuild/plugin');

async function build() {
  try {
    await esbuild.build({
      entryPoints: ['./examples/index.ts'],
      bundle: true,
      outfile: './examples/bundle.js',
      format: 'cjs',
      platform: 'node',
      plugins: [safetryPlugin],
      sourcemap: false,
    });

  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();