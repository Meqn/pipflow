# gulp-renew

[![version](https://img.shields.io/npm/v/gulp-renew?style=flat-square&logo=npm)](https://www.npmjs.com/package/gulp-renew)
[![Codecov](https://img.shields.io/codecov/c/github/meqn/pipflow?token=5TYW2Z1S4C&style=flat-square&logo=codecov)](https://codecov.io/gh/Meqn/pipflow)
[![release](https://img.shields.io/github/actions/workflow/status/meqn/pipflow/release.yml?style=flat-square)](https://github.com/Meqn/pipflow/releases)
[![node.js](https://img.shields.io/node/v/gulp-renew?style=flat-square&logo=nodedotjs)](https://nodejs.org/en/about/releases/)
[![license](https://img.shields.io/npm/l/gulp-renew?style=flat-square)](https://github.com/Meqn/pipflow)

[ [English](./README.md) | [中文](./README.zh_CN.md) ]



A plugin that supports batch string replacement for gulp.  
Replacement rules support regular expressions and function replacements.

> Based on [gulp-replace](https://www.npmjs.com/package/gulp-replace)

## Installation

```
npm install --save-dev gulp-renew
```

## Usage

```js
const gulp = require('gulp');
const renew = require('gulp-renew');

gulp.task('default', function() {
  return gulp.src('src/**/*.js')
   .pipe(renew([
      { search: 'oldText', replacement: 'newText' },
      { search: /oldPattern/g, replacement: 'newPattern' }
    ]))
   .pipe(gulp.dest('dist'));
});

gulp.task('html', function() {
  return gulp.src('src/**/*.html')
   .pipe(renew([
      [‘foo1’, 'bar1'],
      [/foo2/g, 'bar2'],
      [‘foo3’, 'bar3']
    ]))
   .pipe(gulp.dest('dist'));
});
```

## API

```js
renew(replacements[, options])
```

### replacements

Contains the rules for replacement. Each rule is an object containing the search and replacement properties.

`type`: `Array<{ search: string | RegExp, replacement: string | Function }>`

- `search`：The string or regular expression to search for.
- `replacement`：The string or function to replace with.

### options

Options.

`Type`: `Object`

#### `options.skipBinary`

Whether to skip binary files.

`Type`: `boolean`

`Default`: `true`

Skip binary files. This option is true by default. If you want to replace content in binary files, you must explicitly set it to false.

**示例：**

- String replacement:

```js
# Writing style 1：
renew([
  { search: 'foo', replacement: 'bar' }
])

# Write style 2：
renew([
  ['foo', 'bar']
])

# Write style 3 ：
renew({ 'foo1': 'bar1', 'foo2': 'bar2' })
```

- Regular expression replacement:

```js
renew({ search: /oldPattern/g, replacement: 'newPattern' })
```

- Function replacement:

```js
renew([
  {
    search: 'oldText',
    replacement: function (match) {
      return match.toUpperCase()
    },
  },
  {
    search: /foo(.{3})/g,
    replacement: function (match, p1, offset, string) {
      return 'bar' + p1
    },
  },
])
```
