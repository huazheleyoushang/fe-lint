import { defineConfig4CustomTheme, UserPlugins } from 'vuepress/config';

export default defineConfig4CustomTheme({
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '编码规范',
      description: '前端编码规范工程化',
    },
    '/en/': {
      lang: 'en-US',
      title: 'Code Spec',
      description: 'Web Code Spec',
    }
  },
  base: '/fe-lint/',
  themeConfig: {
    locales: {
      '/en/': {
        selectText: 'Languages',
        label: 'English',
        ariaLabel: 'Languages',
        editLinkText: 'https://github.com/huazheleyoushang/fe-lint',
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        algolia: {},
        nav: [
          { text: 'Home', link: '/index.md' },
          {
            text: 'Code Spec',
            items: [
              { text: 'HTML Code Spec', link: '/coding/html.md' },
              { text: 'CSS Code Spec', link: '/coding/css.md' },
              { text: 'Java Script Code Spec', link: '/coding/javascript.md' },
            ],
          },
        ],
        sidebar: {
          '/': [/* ... */],
          '/nested/': [/* ... */]
        }
      },
      '/': {
        // 多语言下拉菜单的标题
        selectText: '选择语言',
        // 该语言在下拉菜单中的标签
        label: '简体中文',
        // 编辑链接文字
        editLinkText: 'https://github.com/huazheleyoushang/fe-lint',
        // Service Worker 的配置
        serviceWorker: {
          updatePopup: {
            message: "发现新内容可用.",
            buttonText: "刷新"
          }
        },
        // 当前 locale 的 algolia docsearch 选项
        algolia: {},
        nav: [
          { text: '首页', link: '/index.md' },
          {
            text: '编码规范',
            items: [
              { text: 'HTML 编码规范', link: '/coding/html.md' },
              { text: 'CSS 编码规范', link: '/coding/css.md' },
              { text: 'Java Script 编码规范', link: '/coding/javascript.md' },
              { text: 'Node 编码规范', link: '/coding/node.md' },
              { text: 'Vue 编码规范', link: '/coding/vue.md' },
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
              {
                title: 'Java Script 编码规范',
                path: '/coding/javascript.md',
              },
              {
                title: 'Node 编码规范',
                path: '/coding/node.md',
              },
              {
                title: 'Vue 编码规范',
                path: '/coding/vue.md',
              }
            ],
          },
          {
            title: '模版规范',
          },
        ]
      }
    },
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
