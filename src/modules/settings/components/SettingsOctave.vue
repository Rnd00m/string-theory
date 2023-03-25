<template>
  <div class="form-control">
    <label class="label cursor-pointer">
      <input
        type="checkbox"
        class="checkbox checkbox-xs lg:checkbox-md checkbox-primary"
        v-model="showOctave"
      />
      <span class="label-text text-sm lg:text-base"
        >&nbsp;&nbsp;Show octave</span
      >
    </label>
  </div>
</template>

<script>
import { ref } from "vue";
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";

export default {
  name: "SettingsOctave",
  setup() {
    const fretboardParametersStore = useFretboardParametersStore();

    const showOctave = ref(false);

    return {
      fretboardParametersStore,
      showOctave,
    };
  },
  watch: {
    showOctave() {
      this.fretboardParametersStore.showOctave = this.showOctave;
    },
  },
};
</script>

<style scoped lang="scss"></style>