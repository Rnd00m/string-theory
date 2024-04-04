<template>
  <div
    class="settings-display-type flex gap-2 lg:gap-4 items-center justify-center"
  >
    <BaseInputRadio
      name="type"
      :value="DisplayTypeEnum.Chord"
      label="Chord"
      v-model="fretboardParametersStore.displayType"
    />

    <BaseInputRadio
      name="type"
      :value="DisplayTypeEnum.Scale"
      label="Scale"
      v-model="fretboardParametersStore.displayType"
    />
  </div>
</template>

<script setup lang="ts">
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";
import { DisplayTypeEnum } from "@/commons/enums/DisplayTypeEnum";
import BaseInputRadio from "@/components/base/inputs/BaseInputRadio.vue";

const fretboardParametersStore = useFretboardParametersStore();
</script>

<style scoped lang="scss"></style>
