import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "pipflow",
  description: "A web developer workflow based on Gulp. It has built-in merging, compilation, and compression features that greatly simplify front-end development.",
  lang: 'zh-CN',

  locales: {
    root: { label: '简体中文' },
    en: { label: 'English', link: '/en/' }
  },

  lastUpdated: true,

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    editLink: {
      pattern: 'https://github.com/meqn/pipflow-cli/edit/main/docs/:path',
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
      { text: '指南', link: '/guide/' },
      { text: '配置', link: '/config/' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '起步',
          items: [
            { text: '开始', link: '/guide/' },
            { text: '命令行界面', link: '/guide/cli' },
            { text: '环境变量与模式', link: '/guide/env-and-mode' },
            { text: '静态资源处理', link: '/guide/assets' },
            { text: '构建生产版本', link: '/guide/build' }
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
            { text: '自定义任务和流程', link: '/guide/task-user' },
            { text: '其他', link: '/guide/task-more' }
          ]
        },
        {
          text: '配置和API参考',
          link: '/config/',
        },
        {
          text: '常见问题',
          link: '/guide/help',
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
