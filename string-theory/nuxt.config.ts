// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    '@nuxtjs/color-mode',
    "nuxt-headlessui",
  ],
  colorMode: {
    preference: undefined, // default theme
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