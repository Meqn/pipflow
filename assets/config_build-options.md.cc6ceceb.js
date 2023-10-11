import{_ as d,o as l,c,Q as e,k as i,a as o}from"./chunks/framework.58083d22.js";const P=JSON.parse('{"title":"构建选项","description":"","frontmatter":{},"headers":[],"relativePath":"config/build-options.md","filePath":"config/build-options.md","lastUpdated":1696985871000}'),a={name:"config/build-options.md"},t=e('<h1 id="build-options" tabindex="-1">构建选项 <a class="header-anchor" href="#build-options" aria-label="Permalink to &quot;构建选项 {#build-options}&quot;">​</a></h1><h2 id="build-outdir" tabindex="-1">build.outDir <a class="header-anchor" href="#build-outdir" aria-label="Permalink to &quot;build.outDir {#build-outdir}&quot;">​</a></h2><ul><li><strong>类型：</strong> <code>string</code></li><li><strong>默认：</strong> <code>dist</code></li></ul><p>指定输出路径（相对于<code>项目根目录</code>)。</p><h2 id="build-fileHash" tabindex="-1">build.fileHash <a class="header-anchor" href="#build-fileHash" aria-label="Permalink to &quot;build.fileHash {#build-fileHash}&quot;">​</a></h2><ul><li><strong>类型：</strong> <code>boolean | &#39;-&#39; | &#39;?&#39;</code></li><li><strong>默认：</strong> <code>&#39;-&#39;</code></li></ul><p><code>build</code> 命令构建后生成的静态资源在它们的文件名中包含了 <code>hash</code> 以便更好的控制缓存，同时也会生成对应的 <code>manifest.json</code> 文件。</p><ul><li>值为 <code>false</code> 时，关闭文件哈希。</li><li>值为 <code>true</code> 或 <code>-</code> 时，将生成文件名哈希和版本映射文件<code>manifest.json</code>。</li><li>值为 <code>?</code> 时，仅生成版本映射文件<code>manifest.json</code>。</li></ul><h2 id="build-sourcemap" tabindex="-1">build.sourcemap <a class="header-anchor" href="#build-sourcemap" aria-label="Permalink to &quot;build.sourcemap {#build-sourcemap}&quot;">​</a></h2><ul><li><strong>类型：</strong> <code>string</code></li><li><strong>默认：</strong> <code>dist</code></li></ul><p><code>build</code> 命令构建后是否生成 source map 文件。如果为 <code>true</code>，将会创建一个独立的 source map 文件。</p><h2 id="build-minify" tabindex="-1">build.minify <a class="header-anchor" href="#build-minify" aria-label="Permalink to &quot;build.minify {#build-minify}&quot;">​</a></h2><ul><li><strong>类型：</strong> <code>boolean</code></li><li><strong>默认：</strong> <code>p<wbr>rocess.env.NODE_ENV === &quot;production&quot;</code></li></ul><p>全局配置, 设置为 <code>false</code> 可以统一禁用最小化混淆或压缩。</p><div class="warning custom-block"><p class="custom-block-title">⚠️ 提示</p><p>该配置项仅对任务类型 <code>type</code> 为 <code>html</code>, <code>style</code>, <code>script</code>, <code>static</code>, <code>image</code> 有效。这里是全局配置，也可以在每个任务项内单独配置 <code>minify</code>。</p></div><h2 id="build-htmlminify" tabindex="-1">build.htmlMinify <a class="header-anchor" href="#build-htmlminify" aria-label="Permalink to &quot;build.htmlMinify&quot;">​</a></h2><ul><li><strong>类型：</strong> <code>boolean | HtmlMinifyOptions</code></li><li><strong>默认：</strong> 与 <code>build.minify</code> 一致</li></ul><p>HTML 最小化压缩配置项，此选项配置后会覆盖 <code>build.minify</code>。</p><p>html压缩是基于 <code>html-minifier-terser</code> 插件, 详细配置请参见 <a href="https://terser.org/html-minifier-terser/" target="_blank" rel="noreferrer">这里</a>。</p>',19),s=i("h2",{"js-minify":"",id:"build-jsminify",tabindex:"-1"},[o("build.jsMinify "),i("a",{class:"header-anchor",href:"#build-jsminify","aria-label":'Permalink to "build.jsMinify {js-minify}"'},"​")],-1),n=e('<ul><li><strong>类型：</strong> <code>boolean | TerserMinifyOptions</code></li><li><strong>默认：</strong> 与 <code>build.minify</code> 一致</li></ul><p>Javascript 最小化混淆配置项，此选项配置后会覆盖 <code>build.minify</code>。</p><p>JS最小化混淆是基于 <code>terser</code> 插件, 详细配置请参见 <a href="https://terser.org/docs/options/" target="_blank" rel="noreferrer">这里</a>。</p>',3),r=i("h2",{"css-minify":"",id:"build-cssminify",tabindex:"-1"},[o("build.cssMinify "),i("a",{class:"header-anchor",href:"#build-cssminify","aria-label":'Permalink to "build.cssMinify {css-minify}"'},"​")],-1),u=e('<ul><li><strong>类型：</strong> <code>boolean | CSSNanoOptions</code></li><li><strong>默认：</strong> 与 <code>build.minify</code> 一致</li></ul><p>CSS 最小化压缩配置项，此选项配置后会覆盖 <code>build.minify</code>。</p><p>CSS压缩是基于 <code>cssnano</code> 插件, 详细配置请参见 <a href="https://cssnano.co/docs/config-file/" target="_blank" rel="noreferrer">这里</a>。</p>',3),m=i("h2",{"image-minify":"",id:"build-imageminify",tabindex:"-1"},[o("build.imageMinify "),i("a",{class:"header-anchor",href:"#build-imageminify","aria-label":'Permalink to "build.imageMinify {image-minify}"'},"​")],-1),b=e('<ul><li><strong>类型：</strong> <code>boolean | {plugins?: Plugin[], options?: Options}</code></li><li><strong>默认：</strong> <code>dist</code></li></ul><p>图片压缩配置项，此选项配置后会覆盖 <code>build.minify</code>。</p><p>图片压缩是基于 <code>gulp-imagemin</code> 插件, 详细配置请参见 <a href="https://www.npmjs.com/package/gulp-imagemin" target="_blank" rel="noreferrer">这里</a>。</p><div class="danger custom-block"><p class="custom-block-title">🚨 提醒</p><p>由于安装 <code>gulp-imagemin</code> 依赖经常失败(国内环境)，且图片压缩是一项耗时的一次性任务。所以 <code>pipflow</code> 将 <code>gulp-imagemin</code> 的安装提取到项目的依赖中。如果你的项目不需要 压缩图片或者手动一次性压缩，请删除项目的 <code>package.json</code> 中的 <code>gulp-imagemin</code> 依赖，并将 <code>imageMinify</code> 配置项的值设置为 <code>false</code>。</p></div>',4),p=[t,s,n,r,u,m,b];function f(_,h,g,y,T,k){return l(),c("div",null,p)}const q=d(a,[["render",f]]);export{P as __pageData,q as default};
