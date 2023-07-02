<template>
  <footer
    class="footer footer-center sticky top-[100vh] p-10 bg-primary text-primary-content"
  >
    <div>
      <img class="logo" src="/public/img/logo-black.png" width="50" height="50" alt="Logo white">
      <div class="logo"></div>
      <p class="font-bold">String Theory<br /></p>
      <p>Copyright © 2022 - All right reserved</p>
    </div>
    <div>
      <div class="grid grid-flow-col gap-4">
        <a href="https://github.com/Rnd00m" target="_blank">
          <svg-icon
              type="mdi"
              :path="mdiGithub"
              size="32"
          />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiGithub } from "@mdi/js";
</script>

<style scoped></style>