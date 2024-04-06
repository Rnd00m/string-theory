<template>
  <BaseSelect
    name="chord-type"
    :items="stringLength"
    v-model="fretboardParametersStore.fretboard.stringLength"
    value="string-length"
  />
</template>

<script setup lang="ts">
const fretboardParametersStore = useFretboardParametersStore();

const stringLength = ref<number[]>([12, 24]);
</script>

<style scoped lang="scss"></style>
