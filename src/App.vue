<template>
  <TheHeader>
    <div class="h-full drawer drawer-end">
      <input id="app-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex justify-center items-center">
        <RouterView />
      </div>
      <TheRightDrawer></TheRightDrawer>
    </div>
  </TheHeader>

  <TheFooter></TheFooter>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import TheRightDrawer from "@/components/TheRightDrawer.vue";
import "./assets/css/base.css";
import "./assets/css/index.css";
import "./assets/css/note.css";

window.screen.orientation.lock("landscape");
</script>

<style></style>
