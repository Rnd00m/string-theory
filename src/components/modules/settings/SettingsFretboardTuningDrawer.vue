<template>
  <div
    class="fretboard-settings-wrapper flex flex-col mx-auto space-y-2"
  >
    <div class="card bg-base-200 shadow-xl">
      <div class="card-body p-4">
        <SettingsTuningSelection />
      </div>
    </div>

    <div class="card bg-base-200 shadow-xl">
      <div class="card-body p-4">
        <div class="grid grid-flow-row gap-3 content-center">
          <div class="grid grid-flow-col">
            <div class="flex justify-center items-center">
              <h1 class="text-center text-lg font-bold">Guitar</h1>
            </div>
            <SettingsTuningGuitarType />
          </div>

          <div class="grid grid-flow-col">
            <div class="flex justify-center items-center">
              <h1 class="text-center text-lg font-bold">Bass</h1>
            </div>
            <SettingsTuningBassType />
          </div>

          <div class="grid grid-flow-col">
            <div class="flex justify-center items-center">
              <h1 class="text-center text-lg font-bold">Sound</h1>
            </div>
            <div class="grid grid-flow-col gap-2">
              <SettingsSound />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useFretboardParametersStore } from "@/stores/fretboardParameters";

import SettingsTuningSelection from "@/components/modules/settings/components/tuning/SettingsTuningSelection.vue";
import SettingsTuningGuitarType from "@/components/modules/settings/components/tuning/SettingsTuningGuitarType.vue";
import SettingsTuningBassType from "@/components/modules/settings/components/tuning/SettingsTuningBassType.vue";
import SettingsSound from "@/components/modules/settings/components/SettingsSound.vue";

export default {
  name: "FretboardSettings",
  components: {
    SettingsTuningSelection,
    SettingsTuningGuitarType,
    SettingsTuningBassType,
    SettingsSound
  },
  setup() {
    const fretboardParametersStore = useFretboardParametersStore();

    return { fretboardParametersStore };
  },
};
</script>

<style scoped lang="scss"></style>