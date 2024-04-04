<template>
  <ul class="menu menu-horizontal bg-base-300 rounded-box">
    <li>
      <label class="p-2" for="information-modal">
        <svg-icon
          type="mdi"
          :path="mdiInformationOutline"
          width="20"
          height="20"
        />
      </label>
    </li>
    <li>
      <label
        for="app-drawer"
        class="drawer-button p-2"
        @click="globalStore.selectedDrawer = 'settings-tuning'"
      >
        <svg-icon type="mdi" :path="mdiTune" width="20" height="20" />
      </label>
    </li>
    <li>
      <label
        for="app-drawer"
        class="drawer-button p-2"
        @click="globalStore.selectedDrawer = 'settings'"
      >
        <svg-icon type="mdi" :path="mdiCogOutline" width="20" height="20" />
      </label>
    </li>
  </ul>
</template>

<script setup lang="ts"></script>

<style scoped></style>
