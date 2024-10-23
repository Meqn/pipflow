# gulp-html-css

[![version](https://img.shields.io/npm/v/gulp-html-css?style=flat-square&logo=npm)](https://www.npmjs.com/package/gulp-html-css)
[![Codecov](https://img.shields.io/codecov/c/github/meqn/pipflow?token=5TYW2Z1S4C&style=flat-square&logo=codecov)](https://codecov.io/gh/Meqn/pipflow)
[![release](https://img.shields.io/github/actions/workflow/status/meqn/pipflow/release.yml?style=flat-square)](https://github.com/Meqn/pipflow/releases)
[![node.js](https://img.shields.io/node/v/gulp-html-css?style=flat-square&logo=nodedotjs)](https://nodejs.org/en/about/releases/)
[![license](https://img.shields.io/npm/l/gulp-html-css?style=flat-square)](https://github.com/Meqn/pipflow)

[ [English](./README.md) | [中文](./README.zh_CN.md) ]

一个用于处理 `HTML` 文件中 `CSS` 的 Gulp 插件。

它可以编译和转换 `<style>` 标签中的 CSS 以及内联样式，使用 `PostCSS` 进行处理。如果存在 `<style lang="">` 属性，它会使用相应的预处理器进行编译内容。

## Features

- 处理 `<style>` 标签内的 CSS
- 处理 HTML 元素中的内联样式
- 支持 `<style lang="">` 属性中指定 CSS 预处理器（Sass、Less、Stylus）
- 使用 `PostCSS` 统一转换 CSS
- 支持合并 `postcss.config.js` 配置文件

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
          /* PostCSS 插件 */
        ],
        {
          /* 选项 */
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

类型：`Array` | `Object`

用于处理 CSS 的 PostCSS 插件。

### options

类型：`Object`

插件的配置选项。

- `postcss`：`Object` - PostCSS 选项
- `compiler`：`Object` - CSS 预处理器编译器（如 Sass、Less、Stylus）
- `compilerOptions`：`Object` - 预处理器的选项

### ext

类型：`Object` | `boolean`

扩展配置。如果设置为 `true` 或 `{ merge: true }`，将与现有的 PostCSS 配置合并。

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
          // Sass 选项
        },
        postcss: {
          // PostCSS 选项
        },
      })
    )
    .pipe(gulp.dest('dist'))
})
```

这个示例处理 HTML 文件，编译 `<style lang="sass">` 标签中的 Sass，然后应用 Autoprefixer 并使用 cssnano 压缩 CSS。

## License

MIT
