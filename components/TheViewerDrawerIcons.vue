<template>
  <ul class="menu menu-horizontal bg-base-300 rounded-box">
    <li>
      <label class="p-2" for="information-modal">
        <SvgIcon
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
        <SvgIcon type="mdi" :path="mdiTune" width="20" height="20" />
      </label>
    </li>
    <li>
      <label
        for="app-drawer"
        class="drawer-button p-2"
        @click="globalStore.selectedDrawer = 'settings'"
      >
        <SvgIcon type="mdi" :path="mdiCogOutline" width="20" height="20" />
      </label>
    </li>
  </ul>
</template>

<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";

import { mdiCogOutline, mdiInformationOutline, mdiTune } from '@mdi/js';

const globalStore = useGlobalStore();
</script>

<style scoped></style>
