<template>
  <div class="flex justify-center">
    <div class="form-control">
      <select
        v-model="fretboardParametersStore.selectedSoundSample"
        class="select select-sm lg:select-md select-bordered w-full max-w-xs"
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
import { soundSampleList } from "@/components/modules/settings/services/SoundSampleList.ts";

export default {
  name: "SettingsSound",
  setup() {
    const fretboardParametersStore = useFretboardParametersStore();

    return {
      fretboardParametersStore,
      soundSampleList,
    };
  },
  computed: {
    filteredSoundSampleList() {
      return this.soundSampleList.filter(
        (soundSample) =>
          soundSample.instrumentType ===
          this.fretboardParametersStore.instrumentType
      );
    },
  },
};
</script>

<style scoped lang="scss"></style>
