import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    build: {
      target: 'esnext',
    },
  },
  title: 'DOCS',
  base: '/docs/',
  outDir: '../dist',
  description: 'this is react docs for xiaoman',
  themeConfig: {
    logo: '/logo.png',
    search: {
      provider: 'local',
    },
    lastUpdated: {
      text: '更新时间',
    },
    outline: {
      label: '文章目录',
      level: [1, 3],
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/index' },
      { text: '教程', link: '/doc/introduce' },
    ],

    sidebar: [
      {
        text: 'Overview',
        items: [{ text: '说明', link: '/overview/readme' }],
      },
      {
        text: '前端',
        items: [
          { text: 'HTML', link: '/frontend/HTML' },
          { text: 'CSS', link: '/frontend/CSS' },
          { text: 'JS in Web', link: '/frontend/JS' },
          { text: 'TypeScript', link: '/frontend/TS' },
          // { text: 'NodeJS', link: '/frontend/ECMAscript' },
        ],
      },
      {
        text: '计算机网络',
        items: [
          { text: 'network', link: '/network/network' },
          { text: 'HTTP', link: '/network/http' },
          { text: 'DNS', link: '/network/DNS' },
          { text: '网安', link: '/network/Netsafe' },
        ],
      },
      {
        text: '工程化',
        items: [
          { text: 'Git', link: '/engineering/git' },
          { text: 'Nginx', link: '/engineering/nginx' },
          { text: 'Docker', link: '/engineering/docker' },
        ],
      },
      {
        text: '面经',
        items: [
          { text: '设计模式', link: '/for_interview/design_patterns' },
          { text: 'Out of 01', link: '/for_interview/outof01' },
        ],
      },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright ©2025-present xiaoman',
    },
  },
  markdown: {
    lineNumbers: true,
  },
  rewrites: {
    'self-media/index.md': 'self-media.md',
  },
})
