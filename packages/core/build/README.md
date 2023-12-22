
# Task

### 任务类型
- `html` - HTML处理任务，可用于 HTML 文件的语法检查、模板渲染、压缩等
- `script` - JavaScript处理任务，可用于 JavaScript 文件的语法检查、美化、压缩、打包等
- `style` - CSS处理任务，可用于 CSS 预处理器编译、美化、压缩等处理
- `static` - 静态资源处理任务，可用于图片、字体等静态资源的优化、复制等处理
- `image` - 图片资源处理任务，专门用于图片资源的压缩、格式转换等处理
- `server` - 创建本地服务器任务，可以快速创建一个本地开发服务器
- `copy` - 复制文件任务
- `remove` - 删除文件任务
- `archive` - 打包压缩任务，可以将文件打包成 zip 压缩包
- `user` - 用户自定义任务，自定义一些全新任务，完全自主控制处理流程
- `compose` - 组合任务，将已有任务组合成一个新任务，实现更复杂的构建处理


### 综合任务:
 - `serve`任务执行顺序: ['remove', ['public', 'static'], ['style', 'script'], 'html', ['server', 'watch']]
 - `build` 任务执行顺序: ['remove', ['public', 'static'], ['style', 'script'], 'html']


# Packages

## html

### 模板引擎
- EJS - gulp-ejs (`.ejs`)
- Pug (Jade) - gulp-pug (`.pug`)
- art-template (`.art`)
- handlebars - gulp-hb (`.hbs`)
- nunjucks - gulp-nunjucks (`.njk`)
// mustache - gulp-mustache (`.mustache`)



## script

- vinyl-named
- gulp-terser

**babel**
- gulp-babel
- @babel/core
- @babel/preset-env
- babel-loader

**webpack**
- webpack
- webpack-stream
- terser-webpack-plugin
- string-replace-loader


## style

### 预处理器
- sass - gulp-sass (`.scss`, `.sass`)
- less - gulp-less (`.less`)
- stylus - gulp-stylus (`.styl`)


**postcss**
- postcss
- gulp-postcss (postcss-load-config ✅)
- autoprefixer (❌ 被`postcss-preset-env`替代)
- postcss-preset-env
- cssnano
- //postcss-px-to-viewport (https://github.com/evrone/postcss-px-to-viewport)
- //postcss-pxtorem (https://github.com/cuth/postcss-pxtorem)


## image

- //svgo
- //gulp.sprites


## other
- gulp-zip
- rimraf

**serve**
- //browser-sync



# Configuration
- `.browserslistrc`
- `postcss.config.js`
- `babel.config.json`


## terserOptions
```js
{
  terserOptions: genTerserOptions(
    {
      compress: {
        // turn off flags with small gains to speed up minification
        arrows: false,
        collapse_vars: false, // 0.3kb
        comparisons: false,
        computed_props: false,
        hoist_funs: false,
        hoist_props: false,
        hoist_vars: false,
        inline: false,
        loops: false,
        negate_iife: false,
        properties: false,
        reduce_funcs: false,
        reduce_vars: false,
        switches: false,
        toplevel: false,
        typeofs: false,

        // a few flags with noticeable gains/speed ratio
        // numbers based on out of the box vendor bundle
        booleans: true, // 0.7kb
        if_return: true, // 0.4kb
        sequences: true, // 0.7kb
        unused: true, // 2.3kb

        // required features to drop conditional branches
        conditionals: true,
        dead_code: true,
        evaluate: true
      },
      mangle: {
        safari10: true
      }
    },
    options
  ),
  parallel: options.parallel,
  extractComments: false
}
```


## cssnanoOptions

```js
const cssnanoOptions = {
  preset: ['default', {
    mergeLonghand: false,
    cssDeclarationSorter: false
  }]
}
if (rootOptions.productionSourceMap && sourceMap) {
  cssnanoOptions.map = { inline: false }
}
```


# 任务流程
```js
gulp.task('style', () => {
  return pipeline(
    merge(
      ...[
        pipeline(
          gulp.src(['./src/styles/*.scss'], { base: 'src' }),
          [
            sourcemaps.init({ loadMaps: true }),
            sass(),
            concat('styles/index.css')
          ]
        ),
        pipeline(
          gulp.src('./src/styles/index.scss', { base: 'src' }),
          [
            sourcemaps.init({ loadMaps: true }),
            sass()
          ]
        )
      ]
    ),
    [
      sourcemaps.write('.'),
      gulp.dest('dist')
    ]
  )
  .on('end', () => console.log('success!'))
})
```




