<template>
  <div class="drawer drawer-end">
    <input id="settings-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <Navbar></Navbar>

      <div class="flex items-center justify-center flex-1 overflow-auto py-2">
        <div class="max-h-full mx-auto">
          <RouterView />
        </div>
      </div>

      <Footer></Footer>
    </div>
    <div class="drawer-side">
      <label for="settings-drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 overflow-y-auto w-3/5 bg-base-100 text-base-content">
        <FretboardSettingsDrawerLayout></FretboardSettingsDrawerLayout>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "@/components/nav/HeaderComponent.vue";
import Footer from "@/components/nav/FooterComponent.vue";
import FretboardSettingsDrawerLayout from "@/components/layouts/FretboardSettingsDrawerLayout.vue";
import "./assets/css/base.css";
import "./assets/css/index.css";
import "./assets/css/note.css";
</script>

<style></style>
