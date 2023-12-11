<template>
  <div class="drawer-side overflow-x-hidden">
    <label for="app-drawer" class="drawer-overlay"></label>
    <div
      class="menu grid place-items-center p-4 gap-2 relative overflow-y-auto w-3/5 bg-base-100 text-base-content h-full"
    >
      <label
        for="app-drawer"
        class="drawer-button btn btn-sm btn-circle absolute top-4 left-4"
        >✕</label
      >
      <SettingsFretboardDrawer
        v-if="globalStore.selectedDrawer === 'settings'"
      ></SettingsFretboardDrawer>
      <SettingsFretboardTuningDrawer
        v-if="globalStore.selectedDrawer === 'settings-tuning'"
      ></SettingsFretboardTuningDrawer>
    </div>
  </div>
</template>

<script>
import SettingsFretboardDrawer from "@/modules/settings/layouts/SettingsFretboardDrawer.vue";
import SettingsFretboardTuningDrawer from "@/modules/settings/layouts/SettingsFretboardTuningDrawer.vue";
import { useGlobalStore } from "@/commons/stores/globalStore";

export default {
  name: "TheRightDrawer",
  components: {
    SettingsFretboardDrawer,
    SettingsFretboardTuningDrawer,
  },
  setup() {
    const globalStore = useGlobalStore();

    return { globalStore };
  },
};
</script>

<style scoped></style>
