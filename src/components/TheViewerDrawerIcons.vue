<template>
  <div class="absolute right-2 top-2 flex-1 gap-1 justify-end inline-flex">
    <ul class="menu menu-horizontal bg-base-200 rounded-box">
      <li>
        <label class="p-2" for="information-modal">
          <svg-icon type="mdi" :path="mdiInformationOutline" width="20" height="20" />
        </label>
      </li>
      <li>
        <label for="app-drawer" class="drawer-button p-2" @click="globalStore.selectedDrawer = 'settings-tuning'">
          <svg-icon type="mdi" :path="mdiTune" width="20" height="20" />
        </label>
      </li>
      <li>
        <label for="app-drawer" class="drawer-button p-2" @click="globalStore.selectedDrawer = 'settings'">
          <svg-icon type="mdi" :path="mdiCogOutline" width="20" height="20" />
        </label>
      </li>
    </ul>
  </div>

  <InformationModalComponent />
</template>

<script setup lang="ts">
import InformationModalComponent from "@/modules/information/components/InformationModalComponent.vue";

import { useGlobalStore } from "@/commons/stores/globalStore";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCogOutline, mdiInformationOutline, mdiTune } from "@mdi/js";

const globalStore = useGlobalStore();
</script>

<style scoped></style>