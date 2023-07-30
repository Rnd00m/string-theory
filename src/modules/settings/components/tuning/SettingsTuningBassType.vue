<template>
  <div class="flex justify-center gap-2 lg:gap-8">
    <BaseInputRadio
      name="tuning-note"
      value="4strings-bass"
      label="4 strings"
      v-model="selectedInstrumentType"
      @click="setBassBaseTuning"
    />

    <BaseInputRadio
      name="tuning-note"
      value="5strings-bass"
      label="5 strings"
      v-model="selectedInstrumentType"
      @click="set5StringsBassTuning"
    />

    <BaseInputRadio
      name="tuning-note"
      value="6strings-bass"
      label="6 strings"
      v-model="selectedInstrumentType"
      @click="set6StringsBassTuning"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Note } from "@tonaljs/tonal";

import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";
import { SoundSampleInstrumentTypeEnum } from "@/modules/settings/enums/SoundSampleInstrumentTypeEnum";
import BaseInputRadio from "@/components/base/inputs/BaseInputRadio.vue";

const fretboardParametersStore = useFretboardParametersStore();
const selectedInstrumentType = ref<string>("6strings-guitar");

const baseBassStrings = [
  Note.get("G2"),
  Note.get("D2"),
  Note.get("A1"),
  Note.get("E1"),
];

function setBassBaseTuning(): void {
  fretboardParametersStore.fretboard.baseNotes = [...baseBassStrings];
  fretboardParametersStore.changeInstrumentType(
    SoundSampleInstrumentTypeEnum.Bass
  );
}

function set5StringsBassTuning(): void {
  let strings = [...baseBassStrings];

  strings.push(Note.get("B0"));

  fretboardParametersStore.fretboard.baseNotes = strings;
  fretboardParametersStore.changeInstrumentType(
    SoundSampleInstrumentTypeEnum.Bass
  );
}

function set6StringsBassTuning(): void {
  let strings = [...baseBassStrings];

  strings.unshift(Note.get("C3"));
  strings.push(Note.get("B0"));

  fretboardParametersStore.fretboard.baseNotes = strings;
  fretboardParametersStore.changeInstrumentType(
    SoundSampleInstrumentTypeEnum.Bass
  );
}
</script>

<style scoped lang="scss"></style>
