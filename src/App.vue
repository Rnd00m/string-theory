<template>
  <div class="drawer drawer-end">
    <input id="settings-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <Navbar>
        <div class="flex items-center justify-center flex-1 overflow-hidden lg:py-2">
          <div class="max-h-full mx-auto">
            <RouterView />
          </div>
        </div>
      </Navbar>

      <MqResponsive target="lg+">
        <Footer></Footer>
      </MqResponsive>
    </div>
    <div class="drawer-side">
      <label for="settings-drawer" class="drawer-overlay"></label>
      <div
        class="menu grid place-items-center p-4 gap-2 relative overflow-y-auto w-3/5 bg-base-100 text-base-content"
      >
        <label for="settings-drawer" class="drawer-button btn btn-sm btn-circle absolute top-4 left-4">✕</label>
        <FretboardSettingsDrawerLayout></FretboardSettingsDrawerLayout>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { MqResponsive } from "vue3-mq";
import Navbar from "@/components/nav/HeaderComponent.vue";
import Footer from "@/components/nav/FooterComponent.vue";
import FretboardSettingsDrawerLayout from "@/components/layouts/FretboardSettingsDrawerLayout.vue";
import "./assets/css/base.css";
import "./assets/css/index.css";
import "./assets/css/note.css";

window.screen.orientation.lock("landscape");
</script>

<style></style>