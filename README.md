# romanint

[![CI](https://github.com/manferlo81/romanint/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/manferlo81/romanint/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/manferlo81/romanint/branch/main/graph/badge.svg?token=9XPXHS6ZWD)](https://codecov.io/gh/manferlo81/romanint)

A simple integer to roman number converter

## Install

### npn

```bash
npm install romanint
```

### yarn

```bash
yarn add romanint
```

### pnpn

```bash
pnpm add romanint
```

## Import

### Using import (ES Module)

```javascript
import toRoman from 'romanint';
```

### Using Node.js require

```javascript
const toRoman = require('romanint');
```

### In the browser

After including the `script` tag into your `html` file, `toRoman` method will be globally available.

## Usage

```javascript
console.log(toRoman(123));
```

```bash
> 'CXXIII'
```

## License

[MIT](LICENSE) &copy; 2020-2024 [Manuel Fernández](https://github.com/manferlo81) @manferlo81
