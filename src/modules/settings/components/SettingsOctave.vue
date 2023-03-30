<template>
  <BaseInputCheckbox
    name="show-octave"
    label="Show octave"
    v-model="fretboardParametersStore.showOctave"
  />
</template>

<script setup lang="ts">
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";
import BaseInputCheckbox from "@/components/base/inputs/BaseInputCheckbox.vue";

const fretboardParametersStore = useFretboardParametersStore();
</script>

<style scoped lang="scss"></style>