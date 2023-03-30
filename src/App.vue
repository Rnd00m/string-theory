<template>
  <div class="drawer drawer-end">
    <input id="app-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <TheHeader>
        <div class="flex items-center justify-center flex-1 lg:py-2">
          <div class="max-h-full mx-auto">
            <RouterView />
          </div>
        </div>
      </TheHeader>

      <MqResponsive target="lg+">
        <TheFooter></TheFooter>
      </MqResponsive>
    </div>
    <TheRightDrawer></TheRightDrawer>
  </div>
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