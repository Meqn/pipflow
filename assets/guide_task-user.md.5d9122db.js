import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.e1e0b12f.js";const F=JSON.parse('{"title":"自定义任务和流程","description":"","frontmatter":{},"headers":[],"relativePath":"guide/task-user.md","filePath":"guide/task-user.md","lastUpdated":1698550829000}'),p={name:"guide/task-user.md"},o=l(`<h1 id="自定义任务和流程" tabindex="-1">自定义任务和流程 <a class="header-anchor" href="#自定义任务和流程" aria-label="Permalink to &quot;自定义任务和流程&quot;">​</a></h1><h2 id="extend-task" tabindex="-1">扩展任务 <a class="header-anchor" href="#extend-task" aria-label="Permalink to &quot;扩展任务 {#extend-task}&quot;">​</a></h2><p>示例：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">defineConfig</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;pipflow&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">replace</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;gulp-replace&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineConfig</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  tasks: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      type: </span><span style="color:#9ECBFF;">&#39;html&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      input: </span><span style="color:#9ECBFF;">&#39;./src/**/*.html&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">replace</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;@styles/&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;/static/styles/&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">defineConfig</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;pipflow&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">replace</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;gulp-replace&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineConfig</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  tasks: [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      type: </span><span style="color:#032F62;">&#39;html&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      input: </span><span style="color:#032F62;">&#39;./src/**/*.html&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      plugins: [</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">replace</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;@styles/&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;/static/styles/&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">      ]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h2 id="create-task" tabindex="-1">创建新任务 <a class="header-anchor" href="#create-task" aria-label="Permalink to &quot;创建新任务 {#create-task}&quot;">​</a></h2><h2 id="compose-task" tabindex="-1">组合任务 <a class="header-anchor" href="#compose-task" aria-label="Permalink to &quot;组合任务 {#compose-task}&quot;">​</a></h2><p>在Gulp中，<code>series</code> 和 <code>parallel</code> 是用于定义任务执行顺序的两个方法。</p><ul><li><code>series()</code> - 用于按顺序串联执行任务。通过series方法，你可以按照顺序依次执行一系列的任务。当一个任务完成后，才会执行下一个任务。</li><li><code>parallel()</code> - 用于并行执行任务。通过parallel方法，你可以同时执行一系列的任务，而不必等待一个任务完成后再执行下一个任务。所有的任务会并行执行。</li></ul><p>下面我们将通过 <code>compose</code> 类型的组合任务来创建一个构建 <code>预发布环境</code> 应用程序包的任务。</p><ol><li>先查看项目下的所有任务。通过下面命令可列显所有任务：</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">pipflow</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">task</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--list</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">pipflow</span><span style="color:#24292E;"> </span><span style="color:#032F62;">task</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--list</span></span></code></pre></div><ol start="2"><li>从列显的任务中选择一些任务组合为一个新的任务。</li></ol><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// pipflow.config.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">defineConfig</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;pipflow&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineConfig</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 其他配置项 ...</span></span>
<span class="line"><span style="color:#E1E4E8;">  tasks: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 其他任务 ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      name: </span><span style="color:#9ECBFF;">&#39;build:stag&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">//任务名</span></span>
<span class="line"><span style="color:#E1E4E8;">      type: </span><span style="color:#9ECBFF;">&#39;compose&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">//任务类型</span></span>
<span class="line"><span style="color:#E1E4E8;">      input: [ </span><span style="color:#6A737D;">//任务入口</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&#39;del:dest&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        [</span><span style="color:#9ECBFF;">&#39;copy:public&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;build:image&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">        [</span><span style="color:#9ECBFF;">&#39;build:css&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;build:js&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">        [</span><span style="color:#9ECBFF;">&#39;build:html&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// pipflow.config.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">defineConfig</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;pipflow&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineConfig</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 其他配置项 ...</span></span>
<span class="line"><span style="color:#24292E;">  tasks: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 其他任务 ...</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      name: </span><span style="color:#032F62;">&#39;build:stag&#39;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">//任务名</span></span>
<span class="line"><span style="color:#24292E;">      type: </span><span style="color:#032F62;">&#39;compose&#39;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">//任务类型</span></span>
<span class="line"><span style="color:#24292E;">      input: [ </span><span style="color:#6A737D;">//任务入口</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&#39;del:dest&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        [</span><span style="color:#032F62;">&#39;copy:public&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;build:image&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">        [</span><span style="color:#032F62;">&#39;build:css&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;build:js&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">        [</span><span style="color:#032F62;">&#39;build:html&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      ]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">入口说明</p><p>在 <code>compose</code> 任务中，<code>input</code>入口和其他类型任务有些不同，其 <code>input</code> 值是一个二维数组 <code>string[][]</code>，数组的每一项是一个任务名。</p><p><code>input</code> 的值转换后的结果:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">series</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">parallel</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;任务名&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">), </span><span style="color:#B392F0;">parallel</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">), </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">series</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">parallel</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;任务名&#39;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">...</span><span style="color:#24292E;">), </span><span style="color:#6F42C1;">parallel</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">...</span><span style="color:#24292E;">), </span><span style="color:#D73A49;">...</span><span style="color:#24292E;">)</span></span></code></pre></div><ul><li>数组列表表示一个串联任务，其内部是通过 <code>series</code> 方法执行的。</li><li>数组的子项表示一个并行任务，其内部是通过 <code>parallel</code> 方法执行的。</li></ul></div><ol start="3"><li>执行新任务，构建用于预发布环境的应用程序包。执行如下命令：</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">pipflow</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">task</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">build:stag</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--mode=staging</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">pipflow</span><span style="color:#24292E;"> </span><span style="color:#032F62;">task</span><span style="color:#24292E;"> </span><span style="color:#032F62;">build:stag</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--mode=staging</span></span></code></pre></div><p>为了方便发布，你可以在 <code>package.json</code> 的 <code>scripts</code> 字段内添加 <code>build:stag</code> 脚本</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;scripts&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;dev&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;pipflow dev&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;build&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;pipflow build&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line diff add"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;build:stag&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;cross-env NODE_ENV=staging pipflow task build:stag --mode=staging&quot;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;scripts&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;dev&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;pipflow dev&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;build&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;pipflow build&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line diff add"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;build:stag&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;cross-env NODE_ENV=staging pipflow task build:stag --mode=staging&quot;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>如果当前主机的环境变量 <code>NODE</code> 未知或不等于 <code>!== production</code> ，那么请在执行的命令前加上 <code>cross-env NODE_ENV=production</code> （确保构建主机的环境变量 <code>NODE_ENV</code> 为 <code>production</code>）</p></div>`,19),e=[o];function c(t,r,E,y,i,d){return a(),n("div",null,e)}const g=s(p,[["render",c]]);export{F as __pageData,g as default};