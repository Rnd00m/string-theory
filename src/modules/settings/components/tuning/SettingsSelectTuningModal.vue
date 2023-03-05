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
        <h1 class="text-xl font-bold">Tuning</h1>

        <div class="grid h-20 lg:h-32 place-items-center mt-4">
          <SettingsTuningSelection />
        </div>

        <div class="divider">Settings</div>

        <div class="grid grid-flow-row gap-3 lg:gap-4 content-center">
          <div class="grid grid-flow-col lg:grid-flow-row">
            <div class="flex justify-center items-center">
              <h1 class="text-center text-lg font-bold">Guitar</h1>
            </div>
            <SettingsTuningGuitarType />
          </div>

          <div class="grid grid-flow-col lg:grid-flow-row">
            <div class="flex justify-center items-center">
              <h1 class="text-center text-lg font-bold">Bass</h1>
            </div>
            <SettingsTuningBassType />
          </div>

          <div class="grid grid-flow-col lg:grid-flow-row">
            <div class="flex justify-center items-center">
              <h1 class="text-center text-lg font-bold">Sound</h1>
            </div>
            <div class="grid grid-flow-col gap-2 lg:gap-3">
              <SettingsSound />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";

import SettingsTuningSelection from "@/modules/settings/components/tuning/SettingsTuningSelection.vue";
import SettingsTuningGuitarType from "@/modules/settings/components/tuning/SettingsTuningGuitarType.vue";
import SettingsTuningBassType from "@/modules/settings/components/tuning/SettingsTuningBassType.vue";
import SettingsSound from "@/modules/settings/components/SettingsSound.vue";

export default {
  name: "SettingsSelectTuningModal",
  components: {
    SettingsTuningSelection,
    SettingsTuningGuitarType,
    SettingsTuningBassType,
    SettingsSound,
  },
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