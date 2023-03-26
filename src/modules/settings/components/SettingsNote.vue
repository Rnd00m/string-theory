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
import { ref } from "vue";
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";
import BaseInputRadio from "@/components/base/Input/BaseInputRadio.vue";

const fretboardParametersStore = useFretboardParametersStore();

const notes = ref(["A", "B", "C", "D", "E", "F", "G"]);
</script>

<style scoped lang="scss"></style>