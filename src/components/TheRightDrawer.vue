<template>
  <div class="drawer-side overflow-x-hidden z-20">
    <label for="app-drawer" class="drawer-overlay"></label>
    <div
      class="menu grid place-items-center p-4 gap-2 relative overflow-y-auto w-3/5 bg-base-100 text-base-content h-full"
    >
      <label
        for="app-drawer"
        class="drawer-button btn btn-sm btn-circle absolute top-4 left-4"
        >✕</label
      >
      <div class="flex flex-col mx-auto">
        <SettingsFretboardDrawer
          v-if="globalStore.selectedDrawer === 'settings'"
        ></SettingsFretboardDrawer>
        <SettingsTuning
          v-if="globalStore.selectedDrawer === 'settings-tuning'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SettingsFretboardDrawer from "@/modules/settings/layouts/SettingsFretboardDrawer.vue";
import { useGlobalStore } from "@/commons/stores/globalStore";
import SettingsTuning from "@/modules/settings/components/tuning/SettingsTuning.vue";

export default {
  name: "TheRightDrawer",
  components: {
    SettingsTuning,
    SettingsFretboardDrawer,
  },
  setup() {
    const globalStore = useGlobalStore();

    return { globalStore };
  },
};
</script>

<style scoped></style>
