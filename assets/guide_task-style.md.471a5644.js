import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.e1e0b12f.js";const u=JSON.parse('{"title":"style 任务","description":"","frontmatter":{},"headers":[],"relativePath":"guide/task-style.md","filePath":"guide/task-style.md","lastUpdated":1703734600000}'),p={name:"guide/task-style.md"},o=l(`<h1 id="style-任务" tabindex="-1">style 任务 <a class="header-anchor" href="#style-任务" aria-label="Permalink to &quot;style 任务&quot;">​</a></h1><p>任务类型为 <code>style</code> 。</p><p><code>style</code> 任务用于处理 CSS 资源,主要包含 CSS 预处理、兼容性处理、压缩等功能。</p><h2 id="process-flow" tabindex="-1">任务流程 <a class="header-anchor" href="#process-flow" aria-label="Permalink to &quot;任务流程 {#process-flow}&quot;">​</a></h2><ul><li>环境变量替换 - 静态替换 <code>env</code> 对应的字符串</li><li>别名替换 - 静态替换 <code>alias</code> 对应的字符串</li><li>CSS 预处理器编译</li><li>自定义插件处理</li><li>postcss 处理 - 包含 属性兼容性前缀(autoprefixer)、压缩混淆(cssnano)等</li><li>生成 source map 文件</li><li>生成文件hash - 支持 <code>[name]-[hash]</code> 和 <code>[name]?[hash]</code> 两种方式。</li></ul><h2 id="file-entry" tabindex="-1">文件入口 <a class="header-anchor" href="#file-entry" aria-label="Permalink to &quot;文件入口 {#file-entry}&quot;">​</a></h2><p>文件入口配置支持 单一字符串，数组，和对象 3 种方式。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 1. 字符串</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">input</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;./src/styles/**/*.{css,scss}&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 2. 数组方式</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">input</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;./src/styles/comm.css&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;./src/styles/index.css&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;./src/styles/page.css&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 3. 对象方式</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">input</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;comm/index&#39;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;./src/styles/base.css&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;./src/styles/utils.css&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;index&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;./src/styles/index.css&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;pages&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;./src/styles/pages/*.css&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 1. 字符串</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">input</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;./src/styles/**/*.{css,scss}&#39;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 2. 数组方式</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">input</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;./src/styles/comm.css&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;./src/styles/index.css&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;./src/styles/page.css&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 3. 对象方式</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">input</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;comm/index&#39;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;./src/styles/base.css&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;./src/styles/utils.css&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    ],</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;index&#39;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;./src/styles/index.css&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;pages&#39;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;./src/styles/pages/*.css&#39;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="css-preprocessor" tabindex="-1">CSS 预处理器 <a class="header-anchor" href="#css-preprocessor" aria-label="Permalink to &quot;CSS 预处理器 {#css-preprocessor}&quot;">​</a></h2><p>pipflow 支持 <code>sass (scss)</code>, <code>less</code>, <code>stylus</code> 三种最常见的 CSS 预处理器。你只需在 <code>style</code> 类型任务的 <code>compiler</code> 属性中配置对应的预处理器即可。</p><p>为了编码方便，你还可以在转译时注入额外代码。</p><p>下面我们以 <code>scss</code> 为例进行简单配置：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// pipflow.config.js</span></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  tasks: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// ... 其他任务</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      type: </span><span style="color:#9ECBFF;">&#39;style&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      input: </span><span style="color:#9ECBFF;">&#39;./src/styles/**/*.scss&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      compiler: </span><span style="color:#9ECBFF;">&#39;sass&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      compilerOptions: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 注入额外代码</span></span>
<span class="line"><span style="color:#E1E4E8;">        additionalData: </span><span style="color:#9ECBFF;">\`@import &#39;./comm/variables&#39;;</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">$--primary-color: blue;\`</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// sass 选项</span></span>
<span class="line"><span style="color:#E1E4E8;">        preprocessorOptions: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          includePaths: [</span><span style="color:#9ECBFF;">&#39;node_modules&#39;</span><span style="color:#E1E4E8;">], </span><span style="color:#6A737D;">//支持加载npm包</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// pipflow.config.js</span></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  tasks: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// ... 其他任务</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      type: </span><span style="color:#032F62;">&#39;style&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      input: </span><span style="color:#032F62;">&#39;./src/styles/**/*.scss&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      compiler: </span><span style="color:#032F62;">&#39;sass&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      compilerOptions: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 注入额外代码</span></span>
<span class="line"><span style="color:#24292E;">        additionalData: </span><span style="color:#032F62;">\`@import &#39;./comm/variables&#39;;</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">$--primary-color: blue;\`</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// sass 选项</span></span>
<span class="line"><span style="color:#24292E;">        preprocessorOptions: {</span></span>
<span class="line"><span style="color:#24292E;">          includePaths: [</span><span style="color:#032F62;">&#39;node_modules&#39;</span><span style="color:#24292E;">], </span><span style="color:#6A737D;">//支持加载npm包</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">additionalData 选项</p><p>所有预处理器都支持 <code>additionalData</code> 选项，可以用于为每个样式内容注入额外代码。请注意，如果注入的是实际的样式而不仅仅是变量时，那么这些样式将会在最终的打包产物中重复出现。</p></div><p>各预处理器使用详见：</p><ul><li><code>sass/scss</code> : <a href="https://www.npmjs.com/package/gulp-sass" target="_blank" rel="noreferrer">配置说明</a></li><li><code>less</code> : <a href="https://www.npmjs.com/package/gulp-less" target="_blank" rel="noreferrer">配置说明</a></li><li><code>stylus</code> : <a href="https://www.npmjs.com/package/gulp-stylus" target="_blank" rel="noreferrer">配置说明</a></li></ul><h2 id="postcss-plugins" tabindex="-1">PostCSS 插件 <a class="header-anchor" href="#postcss-plugins" aria-label="Permalink to &quot;PostCSS 插件 {#postcss-plugins}&quot;">​</a></h2><p>PostCSS 内置了众多插件用来转换 CSS, 你只需在项目根目录的 <code>postcss.config.js</code> 文件中配置即可。目前 <code>pipflow</code> 已内置浏览器兼容性前缀(<code>postcss-preset-env</code>)和压缩优化(<code>cssnano</code>)插件。</p><p>这里列出一些常用的插件和用法示例，更多插件请参见 <a href="https://github.com/postcss/postcss" target="_blank" rel="noreferrer">这里</a></p><h3 id="pxtorem" tabindex="-1">pxtorem <a class="header-anchor" href="#pxtorem" aria-label="Permalink to &quot;pxtorem&quot;">​</a></h3><p>将 <code>px</code> 单位转换为 <code>rem</code> 单位。 更多配置请参见 <a href="https://github.com/cuth/postcss-pxtorem" target="_blank" rel="noreferrer">这里</a></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// postcss.config.js</span></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;postcss-pxtorem&#39;</span><span style="color:#E1E4E8;">)({</span></span>
<span class="line"><span style="color:#E1E4E8;">      rootValue: </span><span style="color:#79B8FF;">16</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      propList: [</span><span style="color:#9ECBFF;">&#39;*&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      minPixelValue: </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      exclude:</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#DBEDFF;">node_modules</span><span style="color:#9ECBFF;">/</span><span style="color:#F97583;">i</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// postcss.config.js</span></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;postcss-pxtorem&#39;</span><span style="color:#24292E;">)({</span></span>
<span class="line"><span style="color:#24292E;">      rootValue: </span><span style="color:#005CC5;">16</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      propList: [</span><span style="color:#032F62;">&#39;*&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      minPixelValue: </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      exclude:</span><span style="color:#032F62;"> /node_modules/</span><span style="color:#D73A49;">i</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="pxtoview" tabindex="-1">pxtoview <a class="header-anchor" href="#pxtoview" aria-label="Permalink to &quot;pxtoview&quot;">​</a></h3><p>将CSS中的 <code>px</code> 单位转换为 <code>vw、vh</code> 等视口单位。 更多配置请参见 <a href="https://github.com/evrone/postcss-px-to-viewport" target="_blank" rel="noreferrer">这里</a></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// postcss.config.js</span></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;postcss-px-to-viewport&#39;</span><span style="color:#E1E4E8;">)({</span></span>
<span class="line"><span style="color:#E1E4E8;">      viewportWidth: </span><span style="color:#79B8FF;">375</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      unitPrecision: </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      viewportUnit: </span><span style="color:#9ECBFF;">&#39;vw&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      propList: [</span><span style="color:#9ECBFF;">&#39;*&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      selectorBlackList: [</span><span style="color:#9ECBFF;">&quot;ignore&quot;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      minPixelValue: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      mediaQuery: </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// postcss.config.js</span></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;postcss-px-to-viewport&#39;</span><span style="color:#24292E;">)({</span></span>
<span class="line"><span style="color:#24292E;">      viewportWidth: </span><span style="color:#005CC5;">375</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      unitPrecision: </span><span style="color:#005CC5;">5</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      viewportUnit: </span><span style="color:#032F62;">&#39;vw&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      propList: [</span><span style="color:#032F62;">&#39;*&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      selectorBlackList: [</span><span style="color:#032F62;">&quot;ignore&quot;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      minPixelValue: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      mediaQuery: </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="with-tailwind-css" tabindex="-1">with Tailwind CSS <a class="header-anchor" href="#with-tailwind-css" aria-label="Permalink to &quot;with Tailwind CSS&quot;">​</a></h3><p>项目中集成 <code>Tailwind CSS</code>。 具体配置请参见 <a href="https://tailwindcss.com/docs/installation/using-postcss" target="_blank" rel="noreferrer">这里</a></p><ol><li>通过 <code>npm</code> 安装 <code>tailwindcss</code> 及其依赖项，并创建 <code>tailwind.config.js</code> 文件。</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">npm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-D</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">tailwindcss</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">autoprefixer</span></span>
<span class="line"><span style="color:#B392F0;">npx</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">tailwindcss</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">init</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">npm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-D</span><span style="color:#24292E;"> </span><span style="color:#032F62;">tailwindcss</span><span style="color:#24292E;"> </span><span style="color:#032F62;">autoprefixer</span></span>
<span class="line"><span style="color:#6F42C1;">npx</span><span style="color:#24292E;"> </span><span style="color:#032F62;">tailwindcss</span><span style="color:#24292E;"> </span><span style="color:#032F62;">init</span></span></code></pre></div><ol start="2"><li>配置 <code>tailwind.config.js</code></li></ol><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/** </span><span style="color:#F97583;">@type</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{import(&#39;tailwindcss&#39;).Config}</span><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  content: [</span><span style="color:#9ECBFF;">&quot;./src/**/*.{html,js}&quot;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">  theme: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    extend: {},</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [],</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/** </span><span style="color:#D73A49;">@type</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{import(&#39;tailwindcss&#39;).Config}</span><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  content: [</span><span style="color:#032F62;">&quot;./src/**/*.{html,js}&quot;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">  theme: {</span></span>
<span class="line"><span style="color:#24292E;">    extend: {},</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [],</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ol start="3"><li>配置 <code>postcss.config.js</code></li></ol><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;tailwindcss&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;autoprefixer&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  ],</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;tailwindcss&#39;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;autoprefixer&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  ],</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,33),e=[o];function c(t,r,E,i,y,d){return n(),a("div",null,e)}const h=s(p,[["render",c]]);export{u as __pageData,h as default};
