import { defineConfig } from 'vitepress'

import { version } from '../../packages/main/package.json'
const ogTitle = 'pipflow'
const ogDescription = 'A web developer workflow based on Gulp. 基于gulp工作流的前端构建工具. 开箱即用,无需配置即可启动web项目的开发.'
const ogUrl = 'https://pipflow.mengqing.org'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: ogTitle,
  description: ogDescription,
  lang: 'zh-CN',

  locales: {
    root: { label: '简体中文' },
    en: { label: 'English', link: '/en/' }
  },

  lastUpdated: true,

  sitemap: {
    hostname: ogUrl
  },

  /* prettier-ignore */
  head: [
    // ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    // ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['meta', { name: 'theme-color', content: '#ea4a4a' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'zh-CN' }],
    ['meta', { name: 'og:site_name', content: ogTitle }],
    // ['meta', { name: 'og:image', content: 'https://vitepress.dev/vitepress-og.jpg' }],
    ['meta', { name: 'og:url', content: ogUrl }],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    editLink: {
      pattern: 'https://github.com/meqn/pipflow/edit/main/docs/:path',
      text: '为此页提供修改建议'
    },

    outline: {
      label: '本目录'
    },

    search: {
      provider: 'local'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present <a href="https://github.com/meqn">Mervin</a>',
    },

    nav: [
      { text: '指南', link: '/guide/', activeMatch: '/guide/' },
      { text: '配置', link: '/config/', activeMatch: '/config/' },
      { text: '插件', link: '/plugins', activeMatch: '/plugins' },
      { text: '常见问题', link: '/help', activeMatch: '/help' },
      { 
        text: '相关连接',
        items: [
          { text: 'gulp入门', link: 'https://gulpjs.com/docs/en/getting-started/quick-start' },
          { text: '官方API', link: 'https://gulpjs.com/docs/en/api/concepts' },
          { text: '检索插件', link: 'https://gulpjs.com/plugins/' }
        ]
      },
      {
        text: `v${version}`,
        items: [
          { text: 'Changelog', link: 'https://github.com/Meqn/pipflow/releases' },
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '起步',
          items: [
            { text: '开始', link: '/guide/' },
            { text: '命令行界面', link: '/guide/cli' },
            { text: '静态资源处理', link: '/guide/assets' },
            { text: '构建生产版本', link: '/guide/build' },
            { text: '模式与环境变量', link: '/guide/env-and-mode' },
          ]
        },
        {
          text: '任务',
          items: [
            { text: '概要', link: '/guide/task' },
            { text: 'HTML', link: '/guide/task-html' },
            { text: 'Javascript', link: '/guide/task-script' },
            { text: 'CSS', link: '/guide/task-style' },
            { text: '静态资源', link: '/guide/task-assets' },
            { text: 'server服务', link: '/guide/task-server' },
            { text: '自定义任务和流程', link: '/guide/task-user' },
            { text: '其他', link: '/guide/task-more' }
          ]
        },
        /* {
          text: '框架指南',
          link: '/framework',
        }, */
        {
          text: '配置和API参考',
          link: '/config/',
        },
        {
          text: '常见问题',
          link: '/help',
        }
      ],
      '/config/': [
        {
          text: '配置',
          items: [
            { text: '配置 pipflow', link: '/config/' },
            { text: '共享选项', link: '/config/shared-options' },
            { text: '构建选项', link: '/config/build-options' },
            { text: '服务器选项', link: '/config/server-options' },
            { text: '任务选项', link: '/config/task-options' },
          ] 
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/meqn/pipflow' }
    ]
  }
})
