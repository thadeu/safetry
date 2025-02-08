<p align="center">
  <h1 align="center">🛟 safetry</h1>
  <p align="center"><i>A simple and lightweight transform to create a safe try/catch expressions in JavaScript/Typescript</i></p>
</p>

<p align="center">
  <img alt="Build Status" src="https://github.com/thadeu/safetry/actions/workflows/ci.yml/badge.svg?cacheSeconds=0">  
  <img alt="GitHub package.json version (subfolder of monorepo)" src="https://img.shields.io/github/package-json/v/thadeu/sa🛟fetry?cacheSeconds=0">
  <img alt="GitHub repo size" src="https://img.shields.io/bundlephobia/min/%40thadeu%2Fsafetry?cacheSeconds=0">
</p>

> [!WARNING]
> THIS IS AN EXPERIMENTAL PLUGIN TO USE WITH ESBUILD, WE DONT ENCOURAGE TO USE IT IN PRODUCTION YET.

## Motivation

Because in sometimes, we need to use safe conditions with try/catch easyless. But without multiple line or blocks.

A few days we saw an idea to this, `Safe Assignment Operator Proposal`. But, maybe it wont be able to advanced to next step in the tc39 proposals.

https://github.com/arthurfiorette/proposal-try-operator/tree/proposal-safe-assignment-operator

Also, the same author created another proposal for try/catch, called `Try Operator`

https://github.com/arthurfiorette/proposal-try-operator

> [!NOTE]
> I decided to create a plugin to ESBuild to make my first idea to this implementation, using IIFE and Transform code.

## Documentation <!-- omit in toc -->

Version    | Documentation
---------- | -------------
unreleased | https://github.com/thadeu/safetry/README.md

## Table of Contents <!-- omit in toc -->
  - [Installation](#installation)
  - [Compatibility](#Ccmpatibility)
  - [Configuration](#configuration)
  - [Usage](#usage)

## Compatibility

| kind           | branch  | javascript         |
| -------------- | ------- | ------------------ |
| unreleased     | main    | >= 20.x |

## Installation

Use Yarn

```bash
yarn add @thadeu/safetry
```

or use NPM

```bash
npm i @thadeu/safetry
```

or use PNPM

```bash
pnpm add @thadeu/safetry
```

or use Github directly

```bash
pnpm add github:@thadeu/safetry
```

and then, enjoy!

## Configuration

Currently, we support only ESBuild to compile safetry expressions.

```ts
import { build } from 'esbuild';
import { safetryPlugin } from '@thadeu/safetry';

await esbuild.build({
  ...
  plugins: [safetryPlugin],
});
```

## Usage

You dont need import anything to use safetry, because we going to transform your code in the build step.

For example:

**Imagine that you could something like this:**

```ts
const [error, value] = safetry { 2 + 2 }
```

That's mean that if the expression throws an error, the variable `error` will be set with the error object and `value` will be `undefined`.

Also, the last expression always will be returned to the value. You can use `return` or not, like Ruby, Rust and another languages.

Let's see an others examples:

```ts
async function calc() {
  const [err, value] = await safetry {
    const x = 10;
    const y = 20;

    x + y
  }

  if (err) {
    return err
  }

  return value
}
```

Inside a function, you can use `safetry` like a normal function.

```ts
function safeOperation(operation) {
  return safetry {
    return operation()
  }
}

const [err4, val4] = safeOperation(() => 42)
```

Performing array operations

```ts
const [error5, value5] = safetry {
  const arr = [1, 2, 3];

  return arr.map(x => x * 2);
}
```

You can create a complex calcs inside the block and then return you any value.

```ts
const [error, value] = safetry {
  const numbers = [1, 2, 3, 4, 5];
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  const average = sum / numbers.length;

  return {
    sum,
    average,
    squared: sum * average
  }
}
```

```ts
function riskyFunction(shouldThrow) {
  if (shouldThrow) throw new Error('Risky business!');

  return 'Ok!';
}

const [error, value] = safetry { riskyFunction(false) }
```

Also we support to use async functions.

```ts
async function fetchAsync(): Promise<any> {
  const [error, response]: AsyncSafetryResult<any> = await safetry {
    return fetch('https://dummyjson.com/test').then(res => res.json())
  }

  return [error, response]
}
```

## Development

After checking out the repo, install dependencies. Then, run `test` to run the tests.

Also you must create a input and output files to test your changes with your statements.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/thadeu/safetry. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](https://github.com/thadeu/safetry/blob/master/CODE_OF_CONDUCT.md).


## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
