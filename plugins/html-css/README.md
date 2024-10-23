# gulp-html-css

[![version](https://img.shields.io/npm/v/gulp-html-css?style=flat-square&logo=npm)](https://www.npmjs.com/package/gulp-html-css)
[![Codecov](https://img.shields.io/codecov/c/github/meqn/pipflow?token=5TYW2Z1S4C&style=flat-square&logo=codecov)](https://codecov.io/gh/Meqn/pipflow)
[![release](https://img.shields.io/github/actions/workflow/status/meqn/pipflow/release.yml?style=flat-square)](https://github.com/Meqn/pipflow/releases)
[![node.js](https://img.shields.io/node/v/gulp-html-css?style=flat-square&logo=nodedotjs)](https://nodejs.org/en/about/releases/)
[![license](https://img.shields.io/npm/l/gulp-html-css?style=flat-square)](https://github.com/Meqn/pipflow)

[ [English](./README.md) | [中文](./README.zh_CN.md) ]

A Gulp plugin for processing CSS within HTML.

It compiles and transforms CSS in `<style>` tags and inline styles using `PostCSS`.  
If a `<style lang="">` attribute exists, it compiles the content using the appropriate preprocessor before applying `PostCSS`.

## Features

- Handle CSS within `<style/>` tag
- Handle inline styles
- Support for CSS preprocessor in the `<style lang=""/>`（Sass、Less、Stylus）
- Using `PostCSS` to transform CSS
- Supports merge `postcss.config.js`

## Installation

```bash
npm install --save-dev gulp-html-css
```

## Usage

```javascript
const gulp = require('gulp')
const htmlCss = require('gulp-html-css')

gulp.task('process-html', () => {
  return gulp
    .src('src/**/*.html')
    .pipe(
      htmlCss(
        [
          /* PostCSS plugins */
        ],
        {
          /* options */
        }
      )
    )
    .pipe(gulp.dest('dist'))
})
```

## API

```js
htmlCss(plugins, options, ext)
```

### plugins

Type: `Array` | `Object`

PostCSS plugins to be used for processing CSS.

### options

Type: `Object`

Configuration options for the plugin.

- `postcss`: `Object` - PostCSS options
- `compiler`: `Object` - CSS preprocessor compiler (e.g., Sass, Less, Stylus)
- `compilerOptions`: `Object` - Options for the preprocessor

### ext

Type: `Object` | `boolean`

Extended configuration. If set to `true` or `{ merge: true }`, it will merge with the existing PostCSS config.

## Example

```javascript
const gulp = require('gulp')
const htmlCss = require('gulp-html-css')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const sass = require('sass')

gulp.task('process-html', () => {
  return gulp
    .src('src/**/*.html')
    .pipe(
      htmlCss([autoprefixer(), cssnano()], {
        compiler: sass,
        compilerOptions: {
          // Sass options
        },
        postcss: {
          // PostCSS options
        },
      })
    )
    .pipe(gulp.dest('dist'))
})
```

This example processes HTML files, compiling Sass within `<style lang="sass">` tags, then applies Autoprefixer and minifies the CSS using cssnano.

## License

MIT
