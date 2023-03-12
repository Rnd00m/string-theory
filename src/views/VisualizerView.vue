<template>
  <div class="fretboard-visualizer">
    <div class="grid lg:gap-8 gap-4">
      <FretboardSettingsLayout></FretboardSettingsLayout>
      <FretboardVisualizer
        :fretboard-notes="fretboardNotes"
        :show-octave="fretboardParametersStore.showOctave"
        :note-class-map="noteClassMaps"
        :is-sound-active="true"
        :selected-sound-sample="fretboardParametersStore.selectedSoundSample"
      ></FretboardVisualizer>
      <InformationComponent></InformationComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";

import FretboardVisualizer from "@/modules/fretboard/components/FretboardVisualizer.vue";
import FretboardSettingsLayout from "@/components/layouts/FretboardSettingsViewLayout.vue";
import InformationComponent from "@/modules/information/components/InformationComponent.vue";
import { computed } from "vue";
import type { NoteClassMap } from "@/modules/fretboard/types/NoteClassMap";
import { DisplayTypeEnum } from "@/scripts/enums/DisplayTypeEnum";
import {
  getChordClassMap,
  getScaleClassMap,
} from "@/modules/fretboard/services/noteClassMaps";
import { getFretboardNotes } from "@/modules/fretboard/services/fretboard";

const fretboardParametersStore = useFretboardParametersStore();

const fretboardNotes = computed(() => {
  return getFretboardNotes(
    fretboardParametersStore.fretboard.baseNotes,
    fretboardParametersStore.fretboard.stringLength
  );
});

const noteClassMaps = computed<NoteClassMap[]>(() => {
  switch (fretboardParametersStore.displayType) {
    case DisplayTypeEnum.Chord: {
      return getChordClassMap(
        fretboardNotes.value,
        fretboardParametersStore.chord,
        true,
        fretboardParametersStore.showNotes
      );
    }
    case DisplayTypeEnum.Scale: {
      return getScaleClassMap(
        fretboardNotes.value,
        fretboardParametersStore.scale,
        fretboardParametersStore.note,
        true,
        fretboardParametersStore.showNotes
      );
    }
  }
});
</script>

<style scoped lang="scss"></style>