<template>
  <div class="fretboard-wrapper">
    <FretboardString
      v-for="(note, index) in fretboardParametersStore.fretboard.baseNotes"
      :key="'string-' + index"
      :sampler="sampler"
      :base-note="note"
      :string-length="fretboardParametersStore.fretboard.stringLength"
      :note-class-map="noteClassMaps"
      :show-note-background="fretboardParametersStore.showTriads"
    ></FretboardString>
    <FretboardMarker></FretboardMarker>
  </div>
</template>

<script setup lang="ts">
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";

import FretboardString from "@/modules/fretboard/components/FretboardString.vue";
import FretboardMarker from "@/modules/fretboard/components/FretboardMarker.vue";
import * as Tone from "tone";
import { computed } from "vue";
import type { NoteClassMap } from "@/modules/fretboard/types/NoteClassMap";
import { DisplayTypeEnum } from "@/scripts/enums/DisplayTypeEnum";
import { getChordClassMaps, getScaleClassMap } from "@/modules/fretboard/services/noteClassMaps";

const fretboardParametersStore = useFretboardParametersStore();

const sampler = computed(() => {
  return new Tone.Sampler({
    urls: {
      A1: "A1.mp3",
      D1: "D1.mp3",
      A2: "A2.mp3",
      D2: "D2.mp3",
      A3: "A3.mp3",
      D3: "D3.mp3",
      A4: "A4.mp3",
      D4: "D4.mp3",
      A5: "A5.mp3",
      D5: "D5.mp3",
      A6: "A6.mp3",
      D6: "D6.mp3",
      A7: "A7.mp3",
      D7: "D7.mp3",
    },
    baseUrl: fretboardParametersStore.selectedSoundSample.url,
  }).toDestination();
});

const noteClassMaps = computed<NoteClassMap[]>(() => {
  switch (fretboardParametersStore.displayType) {
    case DisplayTypeEnum.Chord: {
      return getChordClassMaps(fretboardParametersStore.chord);
    }
    case DisplayTypeEnum.Scale: {
      return getScaleClassMap(fretboardParametersStore.note, fretboardParametersStore.scale);
    }
  }
});
</script>

<style scoped lang="scss"></style>