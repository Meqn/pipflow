import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.e1e0b12f.js";const u=JSON.parse('{"title":"任务配置","description":"","frontmatter":{},"headers":[],"relativePath":"config/task-options.md","filePath":"config/task-options.md","lastUpdated":1699167417000}'),o={name:"config/task-options.md"},p=l(`<h1 id="task-options" tabindex="-1">任务配置 <a class="header-anchor" href="#task-options" aria-label="Permalink to &quot;任务配置 {#task-options}&quot;">​</a></h1><p>每个任务的单独配置项，设置后会覆盖全局配置。</p><h2 id="name" tabindex="-1">name <a class="header-anchor" href="#name" aria-label="Permalink to &quot;name {#name}&quot;">​</a></h2><ul><li><strong>类型：</strong> <code>string</code></li><li><strong>默认：</strong> <code>[type]:[index]</code></li></ul><p>任务名称, 默认为 <code>任务类型 + 任务索引</code></p><h2 id="type" tabindex="-1">type <a class="header-anchor" href="#type" aria-label="Permalink to &quot;type&quot;">​</a></h2><ul><li><strong>类型：</strong> <code>string</code></li></ul><p>任务类型。</p><p>内置任务类型： <code>&#39;html&#39; | &#39;style&#39; | &#39;script&#39; | &#39;static&#39; | &#39;image&#39; | &#39;server&#39; | &#39;remove&#39; | &#39;copy&#39; | &#39;archive&#39; | &#39;user&#39;</code> 。</p><h2 id="input" tabindex="-1">input <a class="header-anchor" href="#input" aria-label="Permalink to &quot;input {#input}&quot;">​</a></h2><ul><li><strong>类型：</strong> <code>string | string[] | object</code></li></ul><p>指定任务入口文件。</p><h2 id="dest" tabindex="-1">dest <a class="header-anchor" href="#dest" aria-label="Permalink to &quot;dest {#dest}&quot;">​</a></h2><ul><li><strong>类型：</strong> <code>string</code></li><li><strong>默认：</strong> <code>dist</code></li></ul><p>指定任务输出路径。</p><blockquote><p>继承 <code>build.outDir</code> 配置，请参见 <a href="./build-options.html#build-outdir">这里</a></p></blockquote><h2 id="base" tabindex="-1">base <a class="header-anchor" href="#base" aria-label="Permalink to &quot;base {#base}&quot;">​</a></h2><ul><li><strong>类型：</strong> <code>string</code></li><li><strong>默认：</strong> <code>./src</code></li></ul><p>显式地在创建的 Vinyl 对象上设置 <code>base</code> 属性。</p><blockquote><p>继承 全局 <code>base</code> 配置，请参见 <a href="./shared-options.html#base">这里</a></p></blockquote><h2 id="compiler" tabindex="-1">compiler <a class="header-anchor" href="#compiler" aria-label="Permalink to &quot;compiler {#compiler}&quot;">​</a></h2><ul><li><strong>类型：</strong> <code>string</code></li></ul><p>文件转译工具。仅对任务类型为 <code>html</code>, <code>style</code>, <code>script</code> 有效。</p><ul><li>当 <code>type</code> 为 <code>&#39;html&#39;</code>时, <code>compiler</code> 为 HTML模板引擎；(请参见 <a href="./../guide/task-html.html#html-templater">这里</a>) <blockquote><p>内置模板引擎: <code>Pug</code>, <code>EJS</code>, <code>Handlebars</code>, <code>Nunjucks</code>, <code>art-template</code></p></blockquote></li><li>当 <code>type</code> 为 <code>&#39;style&#39;</code>时, <code>compiler</code> 为 CSS预处理器。(请参见 <a href="./../guide/task-style.html#css-preprocessor">这里</a>) <blockquote><p>支持的 CSS 预处理器: <code>sass</code>, <code>less</code>, <code>stylus</code></p></blockquote></li><li>当 <code>type</code> 为 <code>&#39;script&#39;</code>时, <code>compiler</code> 为 <code>babel</code>。</li></ul><h2 id="compiler-options" tabindex="-1">compilerOptions <a class="header-anchor" href="#compiler-options" aria-label="Permalink to &quot;compilerOptions {#compiler-options}&quot;">​</a></h2><ul><li><strong>类型：</strong> <code>object</code></li></ul><p>转译配置项。</p><ul><li>HTML模板引擎 配置项，请参见 <a href="./../guide/task-html.html#configuration">这里</a></li><li>CSS预处理器 配置项，请参见 <a href="./../guide/task-style.html#configuration">这里</a></li></ul><h3 id="html模板引擎" tabindex="-1">HTML模板引擎 <a class="header-anchor" href="#html模板引擎" aria-label="Permalink to &quot;HTML模板引擎&quot;">​</a></h3><p>当转译器compiler 为 HTML模板引擎时，其值为传递给 HTML 模板引擎的选项。</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CompilerOptions</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 渲染时的数据</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">data</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#FFAB70;">key</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">]</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">any</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 其他编译选项</span></span>
<span class="line"><span style="color:#E1E4E8;">  [</span><span style="color:#FFAB70;">key</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">]</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">any</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CompilerOptions</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 渲染时的数据</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">data</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#E36209;">key</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">]</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">any</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 其他编译选项</span></span>
<span class="line"><span style="color:#24292E;">  [</span><span style="color:#E36209;">key</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">]</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">any</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>每一个HTML模板引擎选项都包含 <code>data</code> 属性，用于渲染时所需的数据。</p><p>示例：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">compiler</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;pug&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">compilerOptions</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">data</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">title</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;Piflow&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;A gulp-based front-end development workflow.&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">strict</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">delimiter</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;%&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">compiler</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;pug&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">compilerOptions</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">data</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">title</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;Piflow&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;A gulp-based front-end development workflow.&#39;</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">strict</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">delimiter</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;%&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="css预处理器" tabindex="-1">CSS预处理器 <a class="header-anchor" href="#css预处理器" aria-label="Permalink to &quot;CSS预处理器&quot;">​</a></h3><p>当转译器compiler 为 CSS预处理器时，其值为传递给 CSS 预处理器的选项。</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CompilerOptions</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 注入的额外代码</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">additionalData</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 预处理器特有的选项</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">preprocessorOptions</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#FFAB70;">key</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">]</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">any</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CompilerOptions</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 注入的额外代码</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">additionalData</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">String</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 预处理器特有的选项</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">preprocessorOptions</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#E36209;">key</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">]</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">any</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>每个预处理器支持的选项可以在它们各自的文档中找到：</p><ul><li><code>sass/scss</code> : <a href="./.html">选项</a></li><li><code>less</code> : <a href="./.html">选项</a></li><li><code>stylus</code> : <a href="./.html">选项</a></li></ul><p>示例：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// pipflow.config.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  tasks: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      type: </span><span style="color:#9ECBFF;">&#39;style&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      compiler: </span><span style="color:#9ECBFF;">&#39;sass&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      compilerOptions: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 注入的额外代码</span></span>
<span class="line"><span style="color:#E1E4E8;">        additionalData: </span><span style="color:#9ECBFF;">\`@import &#39;./comm/variables&#39;;</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">$--primary-color: blue;\`</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 预处理器特有的选项</span></span>
<span class="line"><span style="color:#E1E4E8;">        preprocessorOptions: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// pipflow.config.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  tasks: [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      type: </span><span style="color:#032F62;">&#39;style&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      compiler: </span><span style="color:#032F62;">&#39;sass&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      compilerOptions: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 注入的额外代码</span></span>
<span class="line"><span style="color:#24292E;">        additionalData: </span><span style="color:#032F62;">\`@import &#39;./comm/variables&#39;;</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">$--primary-color: blue;\`</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 预处理器特有的选项</span></span>
<span class="line"><span style="color:#24292E;">        preprocessorOptions: {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">additionalData 选项</p><p>所有预处理器选项支持 <code>additionalData</code> 选项，可以用于为每个样式内容注入额外代码。请注意，如果注入的是实际的样式而不仅仅是变量时，那么这些样式将会在最终的打包产物中重复出现。</p></div><h2 id="minify" tabindex="-1">minify <a class="header-anchor" href="#minify" aria-label="Permalink to &quot;minify {#minify}&quot;">​</a></h2><ul><li><strong>类型：</strong> <code>boolean | MinifyOptions</code></li><li><strong>默认：</strong> <code>false</code></li></ul><p>文件最小化混淆或压缩。</p><blockquote><p>继承 <code>build.minify</code> 配置 或 对应的混淆/压缩配置项，请参见 <a href="./build-options.html#build-minify">这里</a></p></blockquote><h2 id="plugins" tabindex="-1">plugins <a class="header-anchor" href="#plugins" aria-label="Permalink to &quot;plugins {#plugins}&quot;">​</a></h2><ul><li><strong>类型：</strong> <code>function[]</code></li></ul><p>自定义任务处理流程。 请参见 <a href="./../guide/task-user.html">这里</a></p><h2 id="file-hash" tabindex="-1">fileHash <a class="header-anchor" href="#file-hash" aria-label="Permalink to &quot;fileHash {#file-hash}&quot;">​</a></h2><ul><li><strong>类型：</strong> <code>boolean | &#39;-&#39; | &#39;?&#39;</code></li><li><strong>默认：</strong> <code>false</code></li></ul><p>文件哈希和版本控制</p><blockquote><p>继承 <code>build.fileHash</code> 配置，请参见 <a href="./build-options.html#build-filehash">这里</a></p></blockquote><h2 id="sourcemap" tabindex="-1">sourcemap <a class="header-anchor" href="#sourcemap" aria-label="Permalink to &quot;sourcemap {#sourcemap}&quot;">​</a></h2><ul><li><strong>类型：</strong> <code>boolean</code></li><li><strong>默认：</strong> <code>false</code></li></ul><p>是否生成 source map 文件。</p><blockquote><p>继承 <code>build.sourcemap</code> 配置，请参见 <a href="./build-options.html#build-sourcemap">这里</a></p></blockquote><h2 id="alias" tabindex="-1">alias <a class="header-anchor" href="#alias" aria-label="Permalink to &quot;alias {#alias}&quot;">​</a></h2><ul><li><strong>类型：</strong> <code>{ [key: string]: string }</code></li></ul><p>别名替换，会合并全局 <code>alias</code> 配置。</p><blockquote><p>继承 全局 <code>alias</code> 配置，请参见 <a href="./shared-options.html#alias">这里</a></p></blockquote><h2 id="watch" tabindex="-1">watch <a class="header-anchor" href="#watch" aria-label="Permalink to &quot;watch {#watch}&quot;">​</a></h2><ul><li><strong>类型：</strong> <code>boolean</code></li><li><strong>默认：</strong> <code>false</code></li></ul><p>在 <code>serve</code> 阶段是否监视文件变动并重新编译、刷新页面。</p><h2 id="filename" tabindex="-1">filename <a class="header-anchor" href="#filename" aria-label="Permalink to &quot;filename {#filename}&quot;">​</a></h2><ul><li><strong>类型：</strong> <code>string</code></li><li><strong>默认：</strong> <code>archive</code></li></ul><p>生成的文件名。目前仅对 <code>archive</code> 任务类型有效。</p><div class="tip custom-block"><p class="custom-block-title">温馨提示</p><p>如果需要创建压缩包，可以使用 <code>pipflow pack</code> 命令快速生成压缩包。 请参见 [<a href="./../guide/cli.html#pipflow-pack">这里</a>]。</p></div>`,68),e=[p];function c(t,r,i,E,y,d){return a(),n("div",null,e)}const m=s(o,[["render",c]]);export{u as __pageData,m as default};
