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
import { SpeedInsights } from "@vercel/speed-insights/vue";
import "./assets/css/base.css";
import "./assets/css/index.css";
import "./assets/css/note.css";

const route = useRoute();

useHead(() => ({
  title: () => `${route.meta.title} · String Theory`,
  ogTitle: () => `${route.meta.title} · String Theory`,
  link: [
    {
      rel: "icon",
      href: "/img/logo-white.png",
      media: "(prefers-color-scheme: dark)",
    },
    {
      rel: "icon",
      href: "/img/logo-black.png",
      media: "(prefers-color-scheme: light)",
    },
    {
      rel: "canonical",
      href: "https://string-theory.app" + route.path,
    },
  ],
  charset: "utf-8",
  viewport: "width=device-width, initial-scale=1, minimum-scale=1",
  htmlAttrs: {
    lang: "en",
  },
}));

useSeoMeta({
  ogImage: "https://string-theory.app/icons/og_image.png",
  ogImageUrl: "https://string-theory.app/icons/og_image.png",
  ogImageType: "image/png",
  twitterCard: "summary_large_image",
  twitterTitle: "String Theory",
  twitterImage: "https://string-theory.app/icons/og_image.png",
  keywords: "guitar, fretboard, trainer, learn, notes, intervals, chords",
  themeColor: "#2d69eb",
});

useServerSeoMeta({
  ogImage: "https://string-theory.app/icons/og_image.png",
  ogImageUrl: "https://string-theory.app/icons/og_image.png",
  ogImageType: "image/png",
  twitterCard: "summary_large_image",
  twitterTitle: "String Theory",
  twitterImage: "https://string-theory.app/icons/og_image.png",
  keywords: "guitar, fretboard, trainer, learn, notes, intervals, chords",
  themeColor: "#2d69eb",
});

// window.screen.orientation.lock("landscape");
</script>

<style></style>
