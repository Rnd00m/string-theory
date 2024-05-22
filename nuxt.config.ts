// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "nuxt-headlessui",
    "nuxt-vercel-analytics",
    "@vite-pwa/nuxt",
    "@nuxtjs/sitemap",
  ],
  pwa: {
    manifest: {
      name: "String Theory",
      short_name: "String Theory",
      description:
        "A simple app to learn guitar and bass. Learn the notes, intervals, and chords on the fretboard. Use tools to help you practice and improve your skills.",
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
          purpose: "maskable",
        },
        {
          src: "/icons/maskable_icon_512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
      lang: "en",
      theme_color: "#2d69eb",
      background_color: "#2d69eb",
      display: "standalone",
      start_url: "/",
      categories: ["education", "music", "utilities"],
    },
    workbox: {
      navigateFallback: "/",
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
  routeRules: {
    "/exercises/ear-training/find-intervals": {ssr: false},
    "/tools/tuner": {ssr: false},
  },
  site: {
    name: "String Theory",
    hostname: "https://string-theory.app",
    url: "https://string-theory.app"
  },
  colorMode: {
    preference: "winter",
    dataValue: "theme", // activate data-theme in <html> tag
    classSuffix: "",
  },
  experimental: { renderJsonPayloads: false },
  components: [
    {
      path: "~/components", // will get any components nested in let's say /components/test too
      pathPrefix: false,
    },
  ],
  build: {
    transpile: ["echarts", "zrender", "tslib"],
  },
});
