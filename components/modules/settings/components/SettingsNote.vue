<template>
  <BaseInputRadio
    name="note"
    :value="note"
    :label="note"
    v-for="note in notes"
    :key="note"
    v-model="fretboardParametersStore.noteLetter"
  />
</template>

<script setup lang="ts">
const fretboardParametersStore = useFretboardParametersStore();

const notes = ref(["A", "B", "C", "D", "E", "F", "G"]);
</script>

<style scoped lang="scss"></style>
