<template>
  <Navbar></Navbar>

  <div class="flex items-center justify-center flex-1 overflow-auto py-10">
    <div class="max-h-full mx-auto">
      <RouterView />
    </div>
  </div>

  <Footer></Footer>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "@/components/nav/HeaderComponent.vue";
import Footer from "@/components/nav/FooterComponent.vue";
import "./assets/css/index.css";
import "./assets/css/note.css";
</script>

<style>
@import "@/assets/base.css";
</style>