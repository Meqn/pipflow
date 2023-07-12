const { task, src, dest, series, parallel } = require('gulp')

const {
  scriptTask,
  styleTask,
  htmlTask,
  removeTask,
  copyTask,
  staticTask,
  archiveTask,
  userTask,
  serveTask,
  reload
} = require('@pipflow/core')

console.log('reload', typeof reload)
task('clean', (done) => {
  removeTask('dist/', done)
})

task('script', (done) => {
  scriptTask({
    name: '',
    type: 'script',
    input: './src/scripts/**/*.{js,mjs}',
    base: './src', //同顶部 src
    dest: 'dist/', //同顶部 build.outDir
    compiler: 'babel', //编译器
    module: true, // 模块化 (js包含 import/require, 必须启用)
    plugins: [],
  
    fileHash: '-', //
    minify: false,
    sourcemap: true, //构建后是否生成 source map 文件。
    alias: {
      'HEHE': 'world'
    }
  }, done)
})

task('style', done => {
  // ['*.{sass,scss,css}', '*.{less,css}', '*.{styl,stylus,css}']
  styleTask({
    name: 'style',
    input: 'src/styles/**/*.{sass,scss,css}',
    dest: 'dist/',
    base: './src',
    compiler: 'sass',
    minify: process.env.NODE_ENV === 'production',
    fileHash: '?',
    sourcemap: true
  }, done)
})

task('html', done => {
  htmlTask({
    input: './src/views/art/**/*.{html,art}',
    dest: 'dist/',
    base: './src',
    minify: false,
    fileHash: true,
    compiler: 'artTemplate',
    compilerOptions: {
      data: {
        title: 'artTemplate',
        author: 'Merven',
        content: 'The pipflow is a great framework',
        year: '2024',
      }
    },
    alias: {
      '@/': '/',
      'HEHE': 'hello',
    }
  }, done)
})

task('public', (done) => {
  copyTask({
    input: 'public/**',
    dest: 'dist/'
  }, done)
})

task('custom', (done) => {
  return userTask({
    /* compiler({ gulp }, done) {
      return gulp.src('public/**')
        .pipe(dest('dist/'))
        .on('end', done)
    } */
    plugins: [
      src('public/**'),
      dest('dist/')
    ]
  }, done)
})

task('static', (done) => {
  staticTask({
    input: 'src/styles/**',
    dest: 'dist/',
    base: './src',
    fileHash: true,
    sourcemap: true
  }, done)
})

task('archive', (done) => {
  archiveTask({
    input: './dist/**',
    dest: 'dist/'
  }, done)
})

task('serve', done => {
  serveTask({
    open: 'ui'
  }, done)
})

task('build', series('clean', parallel('style', 'script', 'custom'), parallel('html'), parallel('archive', 'serve')))
