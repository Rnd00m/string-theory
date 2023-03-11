<template>
  <div class="fretboard-visualizer">
    <div class="grid lg:gap-8 gap-4">
      <FretboardSettingsLayout></FretboardSettingsLayout>
      <FretboardVisualizer
        :fretboard-notes="fretboardNotes"
        :note-class-map="noteClassMaps"
        :show-note-background="fretboardParametersStore.showTriads"
        :is-sound-active="true"
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
import {computed, ref} from "vue";
import type { NoteClassMap } from "@/modules/fretboard/types/NoteClassMap";
import { DisplayTypeEnum } from "@/scripts/enums/DisplayTypeEnum";
import {
  getChordClassMap,
  getScaleClassMap,
} from "@/modules/fretboard/services/noteClassMaps";
import {getFretboardNotes} from "@/modules/fretboard/services/fretboard";

const fretboardParametersStore = useFretboardParametersStore();

const noteClassMaps = computed<NoteClassMap[]>(() => {
  switch (fretboardParametersStore.displayType) {
    case DisplayTypeEnum.Chord: {
      return getChordClassMap(fretboardParametersStore.chord);
    }
    case DisplayTypeEnum.Scale: {
      return getScaleClassMap(fretboardParametersStore.note, fretboardParametersStore.scale);
    }
  }
});

const fretboardNotes = computed(() => {
  return getFretboardNotes(
    fretboardParametersStore.fretboard.baseNotes,
    fretboardParametersStore.fretboard.stringLength
  );
});
</script>

<style scoped lang="scss"></style>