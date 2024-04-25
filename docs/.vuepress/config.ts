import { defineConfig4CustomTheme, UserPlugins } from 'vuepress/config';

export default defineConfig4CustomTheme({
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'Code Spec',
      description: 'Web Code Spec',
    },
    '/en/': {
      lang: 'en-US',
      title: 'Code Spec',
      description: '前端编码规范工程化',
    }
  },
  base: '/fe-lint/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/index.md' },
      {
        text: '编码规范',
        items: [
          { text: 'HTML 编码规范', link: '/coding/html.md' },
          { text: 'CSS 编码规范', link: '/coding/css.md' },
        ],
      },
    ],
    sidebar: [
      {
        title: '编码规范',
        children: [
          {
            title: 'HTML 编码规范',
            path: '/coding/html.md',
          },
          {
            title: 'CSS 编码规范',
            path: '/coding/css.md',
          },
        ],
      },
      {
        title: '工程规范',
        children: [
          {
            title: '文档规范',
            path: '/coding/css.md',
          },
        ],
      },
    ],
    logo: '/images/logo.png',
    repo: 'huazheleyoushang/fe-lint',
    searchMaxSuggestions: 10,
    docsDir: 'docs',
    footer: {
      createYear: 2024,
      copyrightInfo:
        'fe-lint studio | <a href="https://github.com/huazheleyoushang/fe-lint" target="_blank">github</a>',
    },

    extendFrontmatter: {
      author: {
        name: 'Asren',
        link: 'https://github.com/huazheleyoushang/fe-lint',
      },
    },

    head: [
      ['link', { rel: 'icon', href: '/images/logo.png' }],
      [
        'meta',
        {
          name: 'keywords',
          content: '前端编码规范工程化',
        },
      ],
    ],
    
    plugins: <UserPlugins>[
      [
        'one-click-copy',
        {
          copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'],
          copyMessage: '复制成功',
          duration: 1000,
          showInMobile: false,
        },
      ],
  
      [
        'vuepress-plugin-zooming',
        {
          selector: '.theme-vdoing-content img:not(.no-zoom)',
          options: {
            bgColor: 'rgba(0,0,0,0.6)',
          },
        },
      ],
    ],
  },


  extraWatchFiles: ['.vuepress/config.ts'],
})
