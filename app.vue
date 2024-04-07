<template>
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

// window.screen.orientation.lock("landscape");
</script>

<style></style>
