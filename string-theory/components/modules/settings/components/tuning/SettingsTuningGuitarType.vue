<template>
  <div class="flex justify-center gap-2 lg:gap-8">
    <BaseInputRadio
      name="tuning-note"
      value="6strings-guitar"
      label="6 strings"
      v-model="selectedInstrumentType"
      @click="setBaseTuning"
    />

    <BaseInputRadio
      name="tuning-note"
      value="7strings-guitar"
      label="7 strings"
      v-model="selectedInstrumentType"
      @click="set7StringsBaseTuning"
    />

    <BaseInputRadio
      name="tuning-note"
      value="8strings-guitar"
      label="8 strings"
      v-model="selectedInstrumentType"
      @click="set8StringsBaseTuning"
    />
  </div>
</template>

<script setup lang="ts">
import { Note } from "@tonaljs/tonal";

import { ref } from "vue";
import { SoundSampleInstrumentTypeEnum } from "@/components/modules/settings/enums/SoundSampleInstrumentTypeEnum";
import BaseInputRadio from "@/components/base/inputs/BaseInputRadio.vue";

const fretboardParametersStore = useFretboardParametersStore();
const selectedInstrumentType = ref<string>("6strings-guitar");

const baseGuitarStrings = [
  Note.get("E4"),
  Note.get("B3"),
  Note.get("G3"),
  Note.get("D3"),
  Note.get("A2"),
  Note.get("E2"),
];

function setBaseTuning(): void {
  fretboardParametersStore.fretboard.baseNotes = [...baseGuitarStrings];
  fretboardParametersStore.changeInstrumentType(
    SoundSampleInstrumentTypeEnum.Guitar
  );
}

function set7StringsBaseTuning(): void {
  let strings = [...baseGuitarStrings];

  strings.push(Note.get("B1"));

  fretboardParametersStore.fretboard.baseNotes = strings;
  fretboardParametersStore.changeInstrumentType(
    SoundSampleInstrumentTypeEnum.Guitar
  );
}
function set8StringsBaseTuning(): void {
  let strings = [...baseGuitarStrings];

  strings.push(Note.get("B1"));
  strings.push(Note.get("F#1"));

  fretboardParametersStore.fretboard.baseNotes = strings;
  fretboardParametersStore.changeInstrumentType(
    SoundSampleInstrumentTypeEnum.Guitar
  );
}
</script>

<style scoped lang="scss"></style>
