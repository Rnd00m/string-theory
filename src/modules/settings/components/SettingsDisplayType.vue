<template>
  <div class="settings-display-type flex gap-2 lg:gap-4 items-center justify-center">
    <div class="form-control">
      <label class="label cursor-pointer">
        <input
          type="radio"
          name="type"
          value="chord"
          class="radio radio-sm lg:radio-md radio-primary checked:bg-red-500"
          v-model="fretboardParametersStore.displayType"
        />
        <span class="label-text text-sm lg:text-base">&nbsp;&nbsp;Chord</span>
      </label>
    </div>

    <div class="form-control">
      <label class="label cursor-pointer">
        <input
          type="radio"
          name="type"
          value="scale"
          class="radio radio-sm lg:radio-md radio-primary checked:bg-red-500"
          v-model="fretboardParametersStore.displayType"
        />
        <span class="label-text text-sm lg:text-base">&nbsp;&nbsp;Scale</span>
      </label>
    </div>
  </div>
</template>

<script>
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";

export default {
  name: "SettingsDisplayType",
  setup() {
    const fretboardParametersStore = useFretboardParametersStore();

    return { fretboardParametersStore };
  },
};
</script>

<style scoped lang="scss"></style>