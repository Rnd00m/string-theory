<template>
  <TheHeader>
    <div class="h-full drawer drawer-end">
      <input id="app-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex items-center justify-center">
        <RouterView />
      </div>
      <TheRightDrawer></TheRightDrawer>
    </div>

    <MqResponsive target="lg+">
      <TheFooter></TheFooter>
    </MqResponsive>
  </TheHeader>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { MqResponsive } from "vue3-mq";
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import TheRightDrawer from "@/components/TheRightDrawer.vue";
import "./assets/css/base.css";
import "./assets/css/index.css";
import "./assets/css/note.css";

window.screen.orientation.lock("landscape");
</script>

<style></style>