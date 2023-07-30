<template>
  <div class="select-tuning-modal">
    <label
      for="select-tuning-modal"
      class="btn btn-outline btn-sm lg:btn-md btn-primary modal-button"
    >
      Select tuning
    </label>

    <input type="checkbox" id="select-tuning-modal" class="modal-toggle" />
    <div for="select-tuning-modal" class="modal cursor-pointer">
      <div class="modal-box relative w-10/12 lg:w-3/5 max-w-5xl">
        <label
          for="select-tuning-modal"
          class="btn btn-sm btn-circle absolute right-2 top-2"
          >✕</label
        >
        <SettingsSelectTuning />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SettingsSelectTuning from "@/modules/settings/components/tuning/SettingsSelectTuning.vue";
</script>

<style scoped lang="scss">
.chord-name {
  text-transform: capitalize;
}
</style>
