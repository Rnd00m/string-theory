// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    '@nuxtjs/color-mode',
    "nuxt-headlessui",
    "nuxt-vercel-analytics",
    '@vite-pwa/nuxt'
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
  pwa: {
    manifest: {
      name: 'String Theory',
      short_name: 'String Theory',
      description: 'A simple app to learn guitar and bass',
      icons: [
        {
          src: "/icons/icon_192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/icons/icon_512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "/icons/maskable_icon_192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable"
        },
        {
          src: "/icons/maskable_icon_256.png",
          sizes: "256x256",
          type: "image/png",
          purpose: "maskable"
        },
        {
          src: "/icons/maskable_icon_384.png",
          sizes: "384x384",
          type: "image/png",
          purpose: "maskable"
        },
        {
          src: "/icons/maskable_icon_512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable"
        },
        {
          src: "/icons/maskable_icon_1024.png",
          sizes: "1024x1024",
          type: "image/png",
          purpose: "maskable"
        },
      ],
      lang: 'en',
      theme_color: '#2d69eb',
      background_color: '#2d69eb',
      display: 'standalone',
      start_url: '/',
      categories: ['education', 'music', 'utilities'],
    },
    workbox: {
      navigateFallback: '/',
    },
    devOptions: {
      enabled: true,
      type: 'module',
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