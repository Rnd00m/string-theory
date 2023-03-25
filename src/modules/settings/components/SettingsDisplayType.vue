<template>
  <div class="settings-display-type flex gap-2 lg:gap-4 items-center justify-center">
    <div class="form-control">
      <label class="label cursor-pointer">
        <input
          type="radio"
          name="type"
          :value="DisplayTypeEnum.Chord"
          class="radio radio-xs lg:radio-md radio-primary checked:bg-primary"
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
          :value="DisplayTypeEnum.Scale"
          class="radio radio-xs lg:radio-md radio-primary checked:bg-primary"
          v-model="fretboardParametersStore.displayType"
        />
        <span class="label-text text-sm lg:text-base">&nbsp;&nbsp;Scale</span>
      </label>
    </div>
  </div>
</template>

<script>
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";
import {DisplayTypeEnum} from "@/scripts/enums/DisplayTypeEnum";

export default {
  name: "SettingsDisplayType",
  setup() {
    const fretboardParametersStore = useFretboardParametersStore();

    return { fretboardParametersStore, DisplayTypeEnum };
  },
};
</script>

<style scoped lang="scss"></style>