import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.58083d22.js";const g=JSON.parse('{"title":"HTML 任务","description":"","frontmatter":{},"headers":[],"relativePath":"guide/task-html.md","filePath":"guide/task-html.md","lastUpdated":1696985871000}'),p={name:"guide/task-html.md"},o=l(`<h1 id="html-任务" tabindex="-1">HTML 任务 <a class="header-anchor" href="#html-任务" aria-label="Permalink to &quot;HTML 任务&quot;">​</a></h1><h2 id="process-flow" tabindex="-1">处理流程 <a class="header-anchor" href="#process-flow" aria-label="Permalink to &quot;处理流程 {#process-flow}&quot;">​</a></h2><ul><li>环境变量处理 <blockquote><p>环境变量在构建时会被静态替换</p></blockquote></li><li>模板渲染 <blockquote><p>渲染HTML模板引擎，支持 <code>Pug</code>, <code>EJS</code>, <code>Handlebars</code>, <code>Nunjucks</code>, <code>art-template</code></p></blockquote></li><li>别名替换 <blockquote><p>静态替换 <code>alias</code> 对应的字符串</p></blockquote></li><li>自定义处理流程 <blockquote><p>处理 <code>pipflow.config.js</code> 中添加的自定义 <code>plugins</code></p></blockquote></li><li>内容压缩 <blockquote><p>基于 <code>html-minifier-terser</code> 的内容压缩</p></blockquote></li><li>资源文件指纹 <blockquote><p>将构建后通过生成的 <code>manifest.json</code> 中包含 hash 过的资源文件版本的映射，进行引入链接的替换</p></blockquote></li></ul><h2 id="环境变量处理" tabindex="-1">环境变量处理 <a class="header-anchor" href="#环境变量处理" aria-label="Permalink to &quot;环境变量处理&quot;">​</a></h2><p>html内容中的以 <code>p<wbr>rocess.env.XXX</code> 写入的环境变量将会被静态替换。</p><h2 id="html-templater" tabindex="-1">模板渲染 <a class="header-anchor" href="#html-templater" aria-label="Permalink to &quot;模板渲染 {#html-templater}&quot;">​</a></h2><p><code>pipflow</code> 内置了<strong>5</strong>款流行的模板引擎，它们曾经都是主流 🤪。让我们来逐一介绍它们:</p><ol><li><p><strong>Pug</strong>:</p><ul><li><strong>简介:</strong> Pug是一种高度可读性的模板引擎，具有简洁的语法和强大的功能。它采用缩进和标签语法，可以快速生成HTML代码。</li><li><strong>文档:</strong> <a href="https://pugjs.org/api/getting-started.html" target="_blank" rel="noreferrer">Pug文档</a> 、 <a href="https://www.npmjs.com/package/gulp-pug" target="_blank" rel="noreferrer">gulp-pug 插件文档</a></li></ul></li><li><p><strong>EJS</strong>:</p><ul><li><strong>简介:</strong> EJS（Embedded JavaScript）是一种简单而灵活的模板引擎，可将JavaScript代码嵌入到模板中。它允许您动态生成HTML页面。</li><li><strong>文档:</strong> <a href="https://ejs.co/" target="_blank" rel="noreferrer">EJS文档</a> 、 <a href="https://www.npmjs.com/package/gulp-ejs" target="_blank" rel="noreferrer">gulp-ejs 插件文档</a></li></ul></li><li><p><strong>Handlebars</strong>:</p><ul><li><strong>简介:</strong> Handlebars是一种语法简洁的模板引擎，它使用标签和表达式来生成HTML。它具有易学易用的特点，非常适合快速构建静态页面。</li><li><strong>文档:</strong> <a href="https://handlebarsjs.com/guide/" target="_blank" rel="noreferrer">Handlebars文档</a> 、 <a href="https://www.npmjs.com/package/gulp-hb" target="_blank" rel="noreferrer">gulp-hb 插件文档</a></li></ul></li><li><p><strong>Nunjucks</strong>:</p><ul><li><strong>简介:</strong> Nunjucks是一款功能强大的模板引擎，它支持条件语句、循环和继承等高级功能。它被广泛用于JavaScript开发中的模板渲染。</li><li><strong>文档:</strong> <a href="https://mozilla.github.io/nunjucks/" target="_blank" rel="noreferrer">Nunjucks文档</a> 、 <a href="https://www.npmjs.com/package/gulp-nunjucks" target="_blank" rel="noreferrer">gulp-nunjucks 插件文档</a></li></ul></li><li><p><strong>art-template</strong>:</p><ul><li><strong>简介:</strong> art-template是一种快速、简洁而且可扩展的模板引擎。它支持JavaScript语法和自定义扩展，非常适合前端开发和服务器端渲染。</li><li>它同时支持两种模板语法。原始语法兼容 <code>EJS</code>、<code>Underscore</code>、<code>LoDash</code> 模板，标准语法类似 <code>Mustache</code> 。</li><li><strong>文档:</strong> <a href="https://aui.github.io/art-template/" target="_blank" rel="noreferrer">art-template文档</a> 、 <a href="https://www.npmjs.com/package/gulp-art-tpl" target="_blank" rel="noreferrer">gulp-art-tpl 插件文档</a></li><li><em>个人推荐</em>： 功能强大，使用简单</li></ul></li></ol><p>这些模板引擎在过去曾经很流行，每一款都有自己独特的特点和用法。您可以根据自己的需求和偏好选择适合的模板引擎来开发您的项目。</p><h3 id="configuration" tabindex="-1">渲染配置项 <a class="header-anchor" href="#configuration" aria-label="Permalink to &quot;渲染配置项 {#configuration}&quot;">​</a></h3><h3 id="example" tabindex="-1">示例 <a class="header-anchor" href="#example" aria-label="Permalink to &quot;示例 {#example}&quot;">​</a></h3><p>pipflow内置的模板引擎中，Handlebars 的使用相对复杂一些，那么我们来写一个 Handlebars 代码片段复用的示例。</p><p><strong>模板文件：</strong></p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">&lt;!-- ./src/index.html --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">html</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">head</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">title</span><span style="color:#E1E4E8;">&gt;pipflow&lt;/</span><span style="color:#85E89D;">title</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">head</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">&lt;!-- 复用 header.hbs 文件 --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    {{&gt; header }}</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;{{ description }}&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">html</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- ./src/views/includes/header.hbs --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">header</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">h1</span><span style="color:#E1E4E8;">&gt;hello {{ title }}!&lt;/</span><span style="color:#85E89D;">h1</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">header</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">&lt;!-- ./src/index.html --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">html</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">head</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">title</span><span style="color:#24292E;">&gt;pipflow&lt;/</span><span style="color:#22863A;">title</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">head</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">body</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">&lt;!-- 复用 header.hbs 文件 --&gt;</span></span>
<span class="line"><span style="color:#24292E;">    {{&gt; header }}</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;{{ description }}&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">body</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">html</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- ./src/views/includes/header.hbs --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">header</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">h1</span><span style="color:#24292E;">&gt;hello {{ title }}!&lt;/</span><span style="color:#22863A;">h1</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">header</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p><strong>模板配置：</strong></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// ./pipflow.config.js</span></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      type: </span><span style="color:#9ECBFF;">&#39;html&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      input: </span><span style="color:#9ECBFF;">&#39;./src/**/*.{html,hbs}&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      compiler: </span><span style="color:#9ECBFF;">&#39;handlebars&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      compileOptions: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        partials: </span><span style="color:#9ECBFF;">&#39;./src/views/includes/*.{html,hbs}&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        data: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          title: </span><span style="color:#9ECBFF;">&#39;pipflow&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          description: </span><span style="color:#9ECBFF;">&#39;开箱即用的前端开发工作流&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// ./pipflow.config.js</span></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      type: </span><span style="color:#032F62;">&#39;html&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      input: </span><span style="color:#032F62;">&#39;./src/**/*.{html,hbs}&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      compiler: </span><span style="color:#032F62;">&#39;handlebars&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      compileOptions: {</span></span>
<span class="line"><span style="color:#24292E;">        partials: </span><span style="color:#032F62;">&#39;./src/views/includes/*.{html,hbs}&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        data: {</span></span>
<span class="line"><span style="color:#24292E;">          title: </span><span style="color:#032F62;">&#39;pipflow&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          description: </span><span style="color:#032F62;">&#39;开箱即用的前端开发工作流&#39;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="content-compress" tabindex="-1">内容压缩 <a class="header-anchor" href="#content-compress" aria-label="Permalink to &quot;内容压缩 {#content-compress}&quot;">​</a></h2><p>html的压缩是基于 <code>html-minifier-terser</code> 插件, 详细配置请参见 <a href="https://terser.org/html-minifier-terser/" target="_blank" rel="noreferrer">这里</a>。</p><p><strong>压缩默认配置：</strong></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">collapseWhitespace</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">removeComments</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">removeEmptyAttributes</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">collapseBooleanAttributes</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">minifyJS</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">minifyCSS</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">collapseWhitespace</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">removeComments</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">removeEmptyAttributes</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">collapseBooleanAttributes</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">minifyJS</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">minifyCSS</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,20),e=[o];function t(r,c,E,i,y,d){return a(),n("div",null,e)}const u=s(p,[["render",t]]);export{g as __pageData,u as default};
