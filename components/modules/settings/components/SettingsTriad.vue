<template>
  <BaseInputCheckbox
    name="show-notes"
    label="Show notes"
    v-model="fretboardParametersStore.showNotes"
  />
</template>

<script setup lang="ts">
const fretboardParametersStore = useFretboardParametersStore();
</script>

<style scoped lang="scss"></style>
