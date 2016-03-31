# eslint-defaults
[![Build Status](https://travis-ci.org/vinsonchuong/eslint-defaults.svg?branch=master)](https://travis-ci.org/vinsonchuong/eslint-defaults)

Smarter default configuration based on project structure and libraries used.

## Installing
`eslint-defaults` is available as an
[npm package](https://www.npmjs.com/package/eslint-defaults).

## Usage
```sh
eslint
```

All CLI flags are supported, and `.eslintrc` will be used if it exists.
However, when using `-c` (`--config`), the included default configuration will
not be used. The defaults can be re-included as follows:

```js
module.exports = {
  extends: require.resolve('eslint-defaults/lib/config');
}
```

By default, files and patterns listed in `.gitignore` will not be linted.

Note that currently, even though ignored directories are not linted, their
files are still enumerated (see
[eslint/eslint#5679](https://github.com/eslint/eslint/issues/5679)). Until that
issue is resolved, `eslint-defaults` will default to enumerating files in the
`src` and `spec` directories. This behavior can still be overridden by passing
a list of file paths to the CLI.

## Development
### Getting Started
The application requires the following external dependencies:
* Node.js

The rest of the dependencies are handled through:
```bash
npm install
```

Run tests with:
```bash
npm test
```
