<template>
  <BaseInputCheckbox
    name="show-octave"
    label="Show octave"
    v-model="fretboardParametersStore.showOctave"
  />
</template>

<script setup lang="ts">
const fretboardParametersStore = useFretboardParametersStore();
</script>

<style scoped lang="scss"></style>
