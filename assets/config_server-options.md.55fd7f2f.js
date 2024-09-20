import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.5b019ba1.js";const u=JSON.parse('{"title":"开发服务器选项","description":"","frontmatter":{},"headers":[],"relativePath":"config/server-options.md","filePath":"config/server-options.md","lastUpdated":1726820578000}'),p={name:"config/server-options.md"},o=l(`<h1 id="server-options" tabindex="-1">开发服务器选项 <a class="header-anchor" href="#server-options" aria-label="Permalink to &quot;开发服务器选项 {#server-options}&quot;">​</a></h1><p><code>pipflow</code> 的本地开发服务器是基于 <code>Browsersync</code> 工具, 它为开发过程提供自动化、高效的同步与调试功能。</p><p>想要了解更多配置细节，请参考 <a href="https://browsersync.io/docs/options" target="_blank" rel="noreferrer">这里</a>。</p><h2 id="server-host" tabindex="-1">server.host <a class="header-anchor" href="#server-host" aria-label="Permalink to &quot;server.host&quot;">​</a></h2><ul><li><strong>类型：</strong> <code>string</code></li><li><strong>默认：</strong> <code>localhost</code></li></ul><p>指定服务器应该监听哪个 IP 地址。</p><h2 id="server-port" tabindex="-1">server.port <a class="header-anchor" href="#server-port" aria-label="Permalink to &quot;server.port&quot;">​</a></h2><ul><li><strong>类型：</strong> <code>number</code></li><li><strong>默认：</strong> <code>9527</code></li></ul><p>指定开发服务器端口。</p><p>也可以通过 CLI 使用 <code>--port 3000</code> 来设置。</p><h2 id="server-https" tabindex="-1">server.https <a class="header-anchor" href="#server-https" aria-label="Permalink to &quot;server.https&quot;">​</a></h2><ul><li><strong>类型：</strong> <code>boolean</code></li><li><strong>默认：</strong> <code>false</code></li></ul><p>为本地主机开发启用 https。注意: 代理选项不需要这样做，因为它会从目标网址中推断出来。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// Enable HTTPS for snippet mode</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">https</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Enable HTTPS mode with custom certificates</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;./app&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">https</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">key</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;path-to-custom.key&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">cert</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;path-to-custom.crt&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// Enable HTTPS for snippet mode</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">https</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Enable HTTPS mode with custom certificates</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">server</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;./app&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">https</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">key</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;path-to-custom.key&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">cert</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;path-to-custom.crt&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="server-open" tabindex="-1">server.open <a class="header-anchor" href="#server-open" aria-label="Permalink to &quot;server.open&quot;">​</a></h2><ul><li><strong>类型：</strong> <code>boolean</code></li><li><strong>默认：</strong> <code>true</code></li></ul><p>开发服务器启动时，自动在浏览器中打开应用程序。</p><h2 id="server-server" tabindex="-1">server.server <a class="header-anchor" href="#server-server" aria-label="Permalink to &quot;server.server&quot;">​</a></h2><ul><li><strong>类型：</strong> <code>string | boolean | object</code></li><li><strong>默认：</strong> <code>dist</code></li></ul><p>内置静态服务器配置。可以指定当前服务基本目录以及索引文件。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// Serve files from the app directory</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;app&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Serve files from the app directory, with a specific index filename</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">baseDir</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;app&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">index</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;index.html&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// Serve files from the app directory</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">server</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;app&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Serve files from the app directory, with a specific index filename</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">server</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">baseDir</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;app&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">index</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;index.html&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="server-proxy" tabindex="-1">server.proxy <a class="header-anchor" href="#server-proxy" aria-label="Permalink to &quot;server.proxy&quot;">​</a></h2><ul><li><strong>类型：</strong> <code>string | ProxyOptions</code></li><li><strong>默认：</strong> <code>false</code></li></ul><p>为开发服务器配置自定义代理规则。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// Using localhost sub directories</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">proxy</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">target</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;http://localhost:4567&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Modify the server request before it hits your application</span></span>
<span class="line"><span style="color:#6A737D;">// and Modify the server response after it&#39;s returned from the proxy</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">proxy</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">target</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;http://yourlocal.dev&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">proxyReq</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">proxyReq</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        proxyReq.</span><span style="color:#B392F0;">setHeader</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;X-Special-Proxy-Header&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;foobar&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">proxyRes</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">proxyRes</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">req</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">res</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//...</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Modify the server response</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">proxy</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">target</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">middleware</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">req</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">res</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">next</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">//...</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">next</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// Using localhost sub directories</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">proxy</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">target</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;http://localhost:4567&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Modify the server request before it hits your application</span></span>
<span class="line"><span style="color:#6A737D;">// and Modify the server response after it&#39;s returned from the proxy</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">proxy</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">target</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;http://yourlocal.dev&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">proxyReq</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">function</span><span style="color:#24292E;">(</span><span style="color:#E36209;">proxyReq</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        proxyReq.</span><span style="color:#6F42C1;">setHeader</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;X-Special-Proxy-Header&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;foobar&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    ],</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">proxyRes</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">function</span><span style="color:#24292E;">(</span><span style="color:#E36209;">proxyRes</span><span style="color:#24292E;">, </span><span style="color:#E36209;">req</span><span style="color:#24292E;">, </span><span style="color:#E36209;">res</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//...</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Modify the server response</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">proxy</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">target</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">middleware</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">function</span><span style="color:#24292E;">(</span><span style="color:#E36209;">req</span><span style="color:#24292E;">, </span><span style="color:#E36209;">res</span><span style="color:#24292E;">, </span><span style="color:#E36209;">next</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">//...</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">next</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="server-middleware" tabindex="-1">server.middleware <a class="header-anchor" href="#server-middleware" aria-label="Permalink to &quot;server.middleware&quot;">​</a></h2><ul><li><strong>类型：</strong> <code>function | function[]</code></li><li><strong>默认：</strong> <code>false</code></li></ul><p>中间件函数或插件。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// Per-route middleware</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">middleware</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      route: </span><span style="color:#9ECBFF;">&quot;/api&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">handle</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">req</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">res</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">next</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// handle any requests at /api</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// Per-route middleware</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">middleware</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      route: </span><span style="color:#032F62;">&quot;/api&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">handle</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">req</span><span style="color:#24292E;">, </span><span style="color:#E36209;">res</span><span style="color:#24292E;">, </span><span style="color:#E36209;">next</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// handle any requests at /api</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="server-cors" tabindex="-1">server.cors <a class="header-anchor" href="#server-cors" aria-label="Permalink to &quot;server.cors&quot;">​</a></h2><ul><li><strong>类型：</strong> <code>boolean</code></li><li><strong>默认：</strong> <code>false</code></li></ul><p>为开发服务器配置 CORS。</p><h2 id="server-browser" tabindex="-1">server.browser <a class="header-anchor" href="#server-browser" aria-label="Permalink to &quot;server.browser&quot;">​</a></h2><ul><li><strong>类型：</strong> <code>string | string[]</code></li><li><strong>默认：</strong> <code>default</code></li></ul><p>要打开的浏览器。</p><p><strong>示例：</strong></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">browser</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;google chrome&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">browser</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;google chrome&#39;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="server-ghostmode" tabindex="-1">server.ghostMode <a class="header-anchor" href="#server-ghostmode" aria-label="Permalink to &quot;server.ghostMode&quot;">​</a></h2><ul><li><strong>类型：</strong> <code>boolean</code></li><li><strong>默认：</strong> <code>false</code></li></ul><p>任何设备上的点击、滚动和表单输入都将镜像到所有其他设备。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// Here you can disable/enable each feature individually</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">ghostMode</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">clicks</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">forms</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">scroll</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Or switch them all off in one go</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">ghostMode</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// Here you can disable/enable each feature individually</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">ghostMode</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">clicks</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">forms</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">scroll</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Or switch them all off in one go</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">ghostMode</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="server-notify" tabindex="-1">server.notify <a class="header-anchor" href="#server-notify" aria-label="Permalink to &quot;server.notify&quot;">​</a></h2><ul><li><strong>类型：</strong> <code>boolean</code></li><li><strong>默认：</strong> <code>true</code></li></ul><p>浏览器右上角的小弹窗通知。</p>`,44),e=[o];function r(t,c,E,i,y,d){return n(),a("div",null,e)}const F=s(p,[["render",r]]);export{u as __pageData,F as default};
