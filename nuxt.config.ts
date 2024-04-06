// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    '@nuxtjs/color-mode',
    "nuxt-headlessui",
  ],
  app: {
    head: {
      title: 'String Theory',
      link: [
        {
          rel: 'icon',
          href: '/img/logo-white.png',
          media: '(prefers-color-scheme: dark)',
        },
        {
          rel: 'icon',
          href: '/img/logo-black.png',
          media: '(prefers-color-scheme: light)',
        },
      ],
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  colorMode: {
    preference: 'winter',
    dataValue: 'theme', // activate data-theme in <html> tag
    classSuffix: '',
  },
  experimental: { renderJsonPayloads: false },
  components: [
    {
      path: '~/components', // will get any components nested in let's say /components/test too
      pathPrefix: false,
    },
  ],
  build: {
    transpile: ['echarts', 'zrender', 'tslib'],
  },
});