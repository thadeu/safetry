import { describe, it, expect } from 'vitest';
import { build } from 'esbuild';
import { safetryPlugin } from '../src/esbuild/plugin';
import path from 'path';
import fs from 'fs';

const resolvePath = file => path.resolve(__dirname, file);

describe('safetryPlugin', () => {
  it('case1', async () => {
    const input = path.resolve(__dirname, 'fixtures/case1/input.js')

    const compile = await build({
      entryPoints: [input],
      bundle: true,
      platform: 'node',
      format: 'esm',
      plugins: [safetryPlugin],
      write: false,
    });


    const file = compile.outputFiles[0].text.trim()
    const output = fs.readFileSync(resolvePath('fixtures/case1/output.js'), 'utf-8');

    expect(file).toStrictEqual(output)
  });

  it('case2', async () => {
    const input = path.resolve(__dirname, 'fixtures/case2/input.js')

    const compile = await build({
      entryPoints: [input],
      bundle: true,
      platform: 'node',
      format: 'esm',
      plugins: [safetryPlugin],
      write: false,
    });


    const file = compile.outputFiles[0].text.trim()
    const output = fs.readFileSync(resolvePath('fixtures/case2/output.js'), 'utf-8');

    expect(file).toStrictEqual(output)
  });

  it('case3', async () => {
    const input = path.resolve(__dirname, 'fixtures/case3/input.ts')

    const compile = await build({
      entryPoints: [input],
      bundle: true,
      platform: 'node',
      format: 'esm',
      plugins: [safetryPlugin],
      write: false,
    });



    const file = compile.outputFiles[0].text.trim()
    const output = fs.readFileSync(resolvePath('fixtures/case3/output.js'), 'utf-8');

    expect(file).toStrictEqual(output)
  });

  it('case4', async () => {
    const input = path.resolve(__dirname, 'fixtures/case4/input.ts')

    const compile = await build({
      entryPoints: [input],
      bundle: true,
      platform: 'node',
      format: 'esm',
      plugins: [safetryPlugin],
      write: false,
    });



    const file = compile.outputFiles[0].text.trim()
    const output = fs.readFileSync(resolvePath('fixtures/case4/output.js'), 'utf-8');

    expect(file).toStrictEqual(output)
  });

  it('if dont exists safetry', async () => {
    const input = path.resolve(__dirname, 'fixtures/case5/input.js')

    const compile = await build({
      entryPoints: [input],
      bundle: true,
      platform: 'node',
      format: 'esm',
      plugins: [safetryPlugin],
      write: false,
    });



    const file = compile.outputFiles[0].text.trim()
    const output = fs.readFileSync(resolvePath('fixtures/case5/output.js'), 'utf-8');

    expect(file).toStrictEqual(output)
  })
});