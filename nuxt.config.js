import path from 'path'
import webpack from 'webpack'
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin'

export default {
  mode: 'universal',
  purgeCSS: {
    mode: 'postcss',
    whitelistPatterns: [/^ant\w*/, /^van-\w*/],
    whitelistPatternsChildren: [/^ant\w*/, /^van-\w*/]
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/plugins/loading' },
    { src: '@/plugins/antd-ui' },
    { src: '@/plugins/globleComponent' },
    {
      src: '@/plugins/vuex-local',
      mode: 'client'
    }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
    'nuxt-composition-api',
    '@nuxtjs/tailwindcss',
    '@/plugins/importCss'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true,
    prefix: '/api'
  },
  proxy: {
    '/api': {
      target: 'http://api.hclyz.com:81',
      pathRewrite: {
        '^/api': '/mf'
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^ant-design-vue/, /^vant/],
    plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), new LodashModuleReplacementPlugin({
      shorthands: true
    })],
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    },
    extractCSS: true,
    babel: {
      plugins: ['lodash'],
      babelrc: false,
      cacheDirectory: undefined,
      presets: ['@nuxt/babel-preset-app']
    },
    /*
    ** You can extend webpack config here
    */
    extend (config) {
      config.resolve.alias['@ant-design/icons/lib/dist$'] = path.resolve(__dirname, './plugins/antd-icons.ts')
    }
  }
}
