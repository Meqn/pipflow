import{_ as s,o as a,c as n,Q as p}from"./chunks/framework.58083d22.js";const F=JSON.parse('{"title":"其他任务","description":"","frontmatter":{},"headers":[],"relativePath":"guide/task-more.md","filePath":"guide/task-more.md","lastUpdated":1696985871000}'),o={name:"guide/task-more.md"},l=p('<h1 id="其他任务" tabindex="-1">其他任务 <a class="header-anchor" href="#其他任务" aria-label="Permalink to &quot;其他任务&quot;">​</a></h1><h2 id="zip压缩任务-archive" tabindex="-1">ZIP压缩任务 (archive) <a class="header-anchor" href="#zip压缩任务-archive" aria-label="Permalink to &quot;ZIP压缩任务 (archive)&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">pipflow</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pack</span><span style="color:#E1E4E8;"> [options]</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#6A737D;"># example</span></span>\n<span class="line"><span style="color:#B392F0;">pipflow</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pack</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">dist/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">dist.zip</span></span>\n<span class="line"><span style="color:#6A737D;"># 将 `dist/` 目录打包, 压缩包 `dist.zip`在项目的根目录</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#B392F0;">pipflow</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pack</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">public/favicon.ico</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">src/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">dist/source.zip</span></span>\n<span class="line"><span style="color:#6A737D;"># 将 `ico`文件 和 `src/` 目录打包, 压缩包 `source.zip`在dist目录中</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">pipflow</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pack</span><span style="color:#24292E;"> [options]</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#6A737D;"># example</span></span>\n<span class="line"><span style="color:#6F42C1;">pipflow</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pack</span><span style="color:#24292E;"> </span><span style="color:#032F62;">dist/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">dist.zip</span></span>\n<span class="line"><span style="color:#6A737D;"># 将 `dist/` 目录打包, 压缩包 `dist.zip`在项目的根目录</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#6F42C1;">pipflow</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pack</span><span style="color:#24292E;"> </span><span style="color:#032F62;">public/favicon.ico</span><span style="color:#24292E;"> </span><span style="color:#032F62;">src/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">dist/source.zip</span></span>\n<span class="line"><span style="color:#6A737D;"># 将 `ico`文件 和 `src/` 目录打包, 压缩包 `source.zip`在dist目录中</span></span></code></pre></div><h3 id="options" tabindex="-1">options <a class="header-anchor" href="#options" aria-label="Permalink to &quot;options&quot;">​</a></h3><p>最后一项是打包输出的路径，其他项目是打包的目标路径。</p>',5),e=[l];function t(c,i,r,d,y,E){return a(),n("div",null,e)}const _=s(o,[["render",t]]);export{F as __pageData,_ as default};
