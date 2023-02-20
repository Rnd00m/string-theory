<template>
  <div class="drawer">
    <input id="header-menu-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <div class="w-full navbar bg-base-100">
        <div class="flex-none lg:hidden">
          <label for="header-menu-drawer" class="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </label>
        </div>
        <div class="flex-1 px-2 mx-2">String Theory</div>
        <div class="flex-none hidden lg:block">
          <ul class="menu menu-horizontal">
            <li><RouterLink to="/">Home</RouterLink></li>
            <li><RouterLink to="/visualizer">Visualizer</RouterLink></li>
            <li><RouterLink to="/training">Training</RouterLink></li>
            <li><RouterLink to="/about">About</RouterLink></li>
          </ul>
        </div>
      </div>
      <slot></slot>
    </div>
    <div class="drawer-side">
      <label for="header-menu-drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 bg-base-100">
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/visualizer">Visualizer</RouterLink></li>
        <li><RouterLink to="/training">Training</RouterLink></li>
        <li><RouterLink to="/about">About</RouterLink></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  name: "HeaderComponent",
  components: {
    RouterLink,
  },
};
</script>

<style scoped></style>