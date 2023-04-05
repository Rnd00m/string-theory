<template>
  <BaseInputRadio
    label="-"
    name="variation"
    :value="NoteVariationEnum.None"
    v-model="fretboardParametersStore.noteVariation"
  ></BaseInputRadio>

  <BaseInputRadio
    label="#"
    name="variation"
    :value="NoteVariationEnum.Sharp"
    v-model="fretboardParametersStore.noteVariation"
  ></BaseInputRadio>

  <BaseInputRadio
    label="b"
    name="variation"
    :value="NoteVariationEnum.Flat"
    v-model="fretboardParametersStore.noteVariation"
  ></BaseInputRadio>
</template>

<script setup lang="ts">
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";
import BaseInputRadio from "@/components/base/inputs/BaseInputRadio.vue";
import { NoteVariationEnum } from "@/commons/enums/NoteVariationEnum";

const fretboardParametersStore = useFretboardParametersStore();
</script>

<style scoped lang="scss"></style>