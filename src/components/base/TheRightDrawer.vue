<template>
  <div class="drawer-side">
    <label for="app-drawer" class="drawer-overlay"></label>
    <div
      class="menu grid place-items-center p-4 gap-2 relative overflow-y-auto w-3/5 bg-base-100 text-base-content"
    >
      <label for="app-drawer" class="drawer-button btn btn-sm btn-circle absolute top-4 left-4">✕</label>
      <SettingsFretboardDrawer v-if="globalStore.selectedDrawer === 'settings'"></SettingsFretboardDrawer>
      <SettingsFretboardTuningDrawer v-if="globalStore.selectedDrawer === 'settings-tuning'"></SettingsFretboardTuningDrawer>
    </div>
  </div>
</template>

<script>
import SettingsFretboardDrawer from "@/modules/settings/components/layouts/SettingsFretboardDrawer.vue";
import SettingsFretboardTuningDrawer from "@/modules/settings/components/layouts/SettingsFretboardTuningDrawer.vue";
import { useGlobalStore } from "@/scripts/stores/globalStore";

export default {
  name: "TheRightDrawer",
  components: {
    SettingsFretboardDrawer,
    SettingsFretboardTuningDrawer
  },
  setup() {
    const globalStore = useGlobalStore();

    return { globalStore };
  },
};
</script>

<style scoped></style>