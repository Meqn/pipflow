import{_ as s,o as a,c as n,Q as p}from"./chunks/framework.5b019ba1.js";const u=JSON.parse('{"title":"其他任务","description":"","frontmatter":{},"headers":[],"relativePath":"guide/task-more.md","filePath":"guide/task-more.md","lastUpdated":1726820578000}'),l={name:"guide/task-more.md"},o=p(`<h1 id="more-task" tabindex="-1">其他任务 <a class="header-anchor" href="#more-task" aria-label="Permalink to &quot;其他任务 {#more-task}&quot;">​</a></h1><p>下面是一些辅助任务，用于复制、压缩 和 删除 文件及目录等。</p><h2 id="copy-task" tabindex="-1">copy 复制任务 <a class="header-anchor" href="#copy-task" aria-label="Permalink to &quot;copy 复制任务 {#copy-task}&quot;">​</a></h2><p><code>copy</code> 任务用于复制文件和目录。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// pipflow.config.js</span></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  tasks: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      type: </span><span style="color:#9ECBFF;">&#39;copy&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      input: </span><span style="color:#9ECBFF;">&#39;src/assets/**/*&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      dest: </span><span style="color:#9ECBFF;">&#39;dist/assets/&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// pipflow.config.js</span></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  tasks: [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      type: </span><span style="color:#032F62;">&#39;copy&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      input: </span><span style="color:#032F62;">&#39;src/assets/**/*&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      dest: </span><span style="color:#032F62;">&#39;dist/assets/&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这会将 <code>src/assets/</code> 目录下的所有文件复制到 <code>dist/assets/</code>。</p><blockquote><p>copy任务支持 <code>glob</code> 写法来匹配文件,可以配置 <code>input</code> 和 <code>dest</code> 路径来定义复制源和输出目标。如果源文件是目录,会将整个目录复制过去。</p></blockquote><h2 id="remove-task" tabindex="-1">remove 删除任务 <a class="header-anchor" href="#remove-task" aria-label="Permalink to &quot;remove 删除任务 {#remove-task}&quot;">​</a></h2><p><code>remove</code> 任务用于删除文件和目录。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// pipflow.config.js</span></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  tasks: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      type: </span><span style="color:#9ECBFF;">&#39;remove&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      input: </span><span style="color:#9ECBFF;">&#39;dist/**/*.map&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// pipflow.config.js</span></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  tasks: [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      type: </span><span style="color:#032F62;">&#39;remove&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      input: </span><span style="color:#032F62;">&#39;dist/**/*.map&#39;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这会删除 <code>dist</code> 目录下所有的 <code>.map</code> 文件。</p><p><code>input</code> 同样支持 <code>glob</code> 写法。</p><h2 id="archive-task" tabindex="-1">archive 压缩任务 <a class="header-anchor" href="#archive-task" aria-label="Permalink to &quot;archive 压缩任务 {#archive-task}&quot;">​</a></h2><p><code>archive</code> 任务用于文件和目录的压缩和打包。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// pipflow.config.js</span></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  tasks: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      type: </span><span style="color:#9ECBFF;">&#39;archive&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      input: </span><span style="color:#9ECBFF;">&#39;dist/**/*&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      dest: </span><span style="color:#9ECBFF;">&#39;release.zip&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// pipflow.config.js</span></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  tasks: [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      type: </span><span style="color:#032F62;">&#39;archive&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      input: </span><span style="color:#032F62;">&#39;dist/**/*&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      dest: </span><span style="color:#032F62;">&#39;release.zip&#39;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这会将 <code>dist</code> 目录下的所有文件和目录打包压缩成 <code>release.zip</code>。</p>`,16),e=[o];function c(t,r,i,E,y,d){return a(),n("div",null,e)}const k=s(l,[["render",c]]);export{u as __pageData,k as default};
