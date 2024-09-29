# gulp-renew

支持字符串批量替换插件。  
替换规则支持正则表达式和函数替换。

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

包含要进行替换的规则。每个规则是一个对象，包含 search 和 replacement 属性
`type`: `Array<{ search: string | RegExp, replacement: string | Function }>`

- `search`：要搜索的字符串或正则表达式。
- `replacement`：要替换的字符串或函数。

### options

选项
`Type`: `Object`

#### `options.skipBinary`

是否跳过二进制文件。
`Type`: `boolean`
`Default`: `true`

如果 `skipBinary` 选项设置为 `true`，插件将不会处理二进制文件。

**示例：**

- 字符串替换：

```js
# 写法 1：
renew([
  { search: 'foo', replacement: 'bar' }
])

# 写法 2：
renew([
  ['foo', 'bar']
])

# 写法 3 ：
renew({ 'foo1': 'bar1', 'foo2': 'bar2' })
```

- 正则表达式替换

```js
renew({ search: /oldPattern/g, replacement: 'newPattern' })
```

- 函数替换

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
