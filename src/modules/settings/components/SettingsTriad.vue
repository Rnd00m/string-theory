<template>
  <BaseInputCheckbox
    name="show-notes"
    label="Show notes"
    v-model="fretboardParametersStore.showNotes"
  />
</template>

<script setup lang="ts">
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";
import BaseInputCheckbox from "@/components/base/Input/BaseInputCheckbox.vue";

const fretboardParametersStore = useFretboardParametersStore();
</script>

<style scoped lang="scss"></style>