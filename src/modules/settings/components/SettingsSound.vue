<template>
  <div class="flex justify-center">
    <div class="form-control">
      <select
        v-model="fretboardParametersStore.selectedSoundSample"
        class="select select-primary select-sm lg:select-md select-bordered w-full max-w-xs"
      >
        <option
          v-for="soundSample in filteredSoundSampleList"
          :key="soundSample.name"
          :value="soundSample"
        >
          {{ soundSample.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { soundSampleList } from "@/modules/settings/services/soundSampleList";

import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";

export default {
  name: "SettingsSound",
  setup() {
    const fretboardParametersStore = useFretboardParametersStore();

    return {
      fretboardParametersStore,
      soundSampleList
    };
  },
  computed: {
    filteredSoundSampleList() {
      return this.soundSampleList.filter(
        (soundSample) =>
          soundSample.instrumentType === this.fretboardParametersStore.instrumentType
      );
    },
  }
};
</script>

<style scoped lang="scss">
.chord-name {
  text-transform: capitalize;
}
</style>