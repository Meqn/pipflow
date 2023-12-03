const htmlMinifyOptions = {
  collapseWhitespace: true, //移除多余空白
  removeComments: true, //移除注释
  // removeRedundantAttributes: true, //移除默认值的属性
  removeEmptyAttributes: true, //移除空的属性
  // removeAttributeQuotes: true, //移除属性值周围的引号，仅在可能的情况下使用
  collapseBooleanAttributes: true, //当属性值为布尔类型时，移除属性值，仅保留属性名称
  minifyJS: true, //使用terser来压缩内联JavaScript代码
  minifyCSS: true //使用clean-css压缩内联CSS代码
}

// !警告: sass@2.x以后该配置无效
const sassDefaultOptions = {
  includePaths: ['node_modules'], //支持加载npm包
  importer: [
    // 支持以 `~` 开头的 npm包
    function (url, prev, done) {
      url = url.startsWith('~') ? url.substr(1) : url;
      if (typeof done === 'function') {
        done({ file: url })
      } else {
        return { file: url }
      }
    }
  ],
  importers: [
    {
      findFileUrl: url => findUrlFromNpm(url, '~')
    }
  ]
}

module.exports = {
  htmlMinifyOptions,
  sassDefaultOptions
}
