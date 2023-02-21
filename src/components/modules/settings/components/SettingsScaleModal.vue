<template>
  <div class="select-scale-modal">
    <label
      for="select-scale-modal"
      class="btn btn-outline btn-primary btn-sm lg:btn-md modal-button"
    >
      {{ fretboardParametersStore.scale.name }}
    </label>

    <input type="checkbox" id="select-scale-modal" class="modal-toggle" />
    <label for="select-scale-modal" class="modal cursor-pointer">
      <label class="modal-box relative w-10/12 lg:w-3/5 max-w-5xl" for="">
        <label
          for="select-scale-modal"
          class="btn btn-sm btn-circle absolute right-2 top-2"
          >✕</label
        >
        <h1 class="text-xl font-bold">Scales</h1>

        <SettingsScale />
      </label>
    </label>
  </div>
</template>

<script>
import { useFretboardParametersStore } from "@/stores/fretboardParameters";

import SettingsScale from "@/components/modules/settings/components/SettingsScale.vue";

export default {
  name: "SettingsScaleModal",
  components: { SettingsScale },
  setup() {
    const fretboardParametersStore = useFretboardParametersStore();

    return { fretboardParametersStore };
  },
};
</script>

<style scoped lang="scss">
.chord-name {
  text-transform: capitalize;
}
</style>