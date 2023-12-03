
# packages

## html
- //ejs
- //pug
- //handlebars
- //art-template

EJS - gulp-ejs (`.ejs`)
Pug (Jade) - gulp-pug (`.pug`)
art-template (`.art`)
handlebars - gulp-hb (`.hbs`)
nunjucks - gulp-nunjucks (`.njk`)
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

**SASS**
- sass
- gulp-sass

**LESS**
- gulp-less

**Stylus**
- gulp-stylus

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




