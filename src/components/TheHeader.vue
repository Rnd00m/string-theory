<template>
  <div class="drawer">
    <input id="header-menu-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex lg:flex-col">
      <div class="absolute lg:relative lg:flex-none lg:w-full lg:navbar bg-base-100">
        <div class="lg:hidden">
          <label for="header-menu-drawer" class="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </label>
        </div>
        <div class="flex-1 px-2 mx-2 hidden lg:block">String Theory</div>
        <div class="flex-none hidden lg:block">
          <ul class="menu menu-horizontal place-items-center">
            <li><RouterLink :to="{name: 'home'}">Home</RouterLink></li>
            <li><RouterLink :to="{name: 'exercise'}">Exercise</RouterLink></li>
            <li><RouterLink :to="{name: 'about'}">About</RouterLink></li>
            <BaseThemeSelector :show-label="false"/>
          </ul>
        </div>
      </div>
      <div class="flex flex-1">
        <slot></slot>
      </div>
    </div>
    <div class="drawer-side">
      <label for="header-menu-drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 bg-base-100 relative">
        <li><RouterLink :to="{name: 'home'}">Home</RouterLink></li>
        <li><RouterLink :to="{name: 'exercise'}">Exercise</RouterLink></li>
        <li><RouterLink :to="{name: 'about'}">About</RouterLink></li>
        <BaseThemeSelector class="absolute bottom-4 w-36 place-self-center"/>
      </ul>
    </div>
  </div>
</template>

<script>
import BaseThemeSelector from "@/components/base/BaseThemeSelector.vue";
import { RouterLink } from "vue-router";

export default {
  name: "HeaderComponent",
  components: {
    BaseThemeSelector,
    RouterLink,
  },
};
</script>

<style scoped></style>