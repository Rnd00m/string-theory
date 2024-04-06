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

<script setup lang="ts">
const globalStore = useGlobalStore();
</script>

<style scoped></style>
