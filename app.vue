<template>
  <VitePwaManifest />

  <TheHeader>
    <div class="h-full drawer drawer-end">
      <input id="app-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex justify-center items-center">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </div>
      <TheRightDrawer />
    </div>
  </TheHeader>

  <TheFooter />

  <SpeedInsights />
</template>

<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue';
import "./assets/css/base.css";
import "./assets/css/index.css";
import "./assets/css/note.css";

const route = useRoute()

useHead(() => ({
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
    {
      rel: 'canonical',
      href: "https://www.string-theory.app" + route.path,
    }
  ],
  charset: 'utf-8',
  viewport: 'width=device-width, initial-scale=1',
  htmlAttrs: {
    lang: 'en',
  },
}))

useSeoMeta({
  title: () => `String Theory · ${route.meta.title}`,
  ogTitle: () => `String Theory · ${route.meta.title}`,
  description: "A simple app to learn guitar and bass. Learn the notes, intervals, and chords on the fretboard. Use tools to help you practice and improve your skills.",
  ogDescription: "A simple app to learn guitar and bass. Learn the notes, intervals, and chords on the fretboard. Use tools to help you practice and improve your skills.",
  ogImage: "https://www.string-theory.app/icons/icon_512.svg",
  ogImageUrl: "https://www.string-theory.app/icons/icon_512.svg",
  twitterCard: "summary_large_image",
  twitterTitle: "String Theory",
  twitterDescription: "A simple app to learn guitar and bass. Learn the notes, intervals, and chords on the fretboard. Use tools to help you practice and improve your skills.",
  twitterImage: "https://www.string-theory.app/icons/icon_512.svg",
  keywords: "guitar, fretboard, trainer, learn, notes, intervals, chords",
  themeColor: "#2d69eb",
})

// window.screen.orientation.lock("landscape");
</script>

<style></style>
