<template>
  <div class="fretboard-visualizer">
    <div class="absolute right-2 top-2 flex-1 gap-1 justify-end lg:hidden sm:inline-flex">
      <label class="p-2" for="information-modal">
        <IconInformation />
      </label>
      <label for="app-drawer" class="drawer-button p-2" @click="globalStore.selectedDrawer = 'settings-tuning'">
        <IconTune />
      </label>
      <label for="app-drawer" class="drawer-button p-2" @click="globalStore.selectedDrawer = 'settings'">
        <IconGear />
      </label>
    </div>
    <div class="grid lg:gap-8">
      <FretboardSettingsLayout></FretboardSettingsLayout>
      <FretboardVisualizer
        :fretboard-notes="fretboardNotes"
        :show-octave="fretboardParametersStore.showOctave"
        :is-sound-active="true"
        :selected-sound-sample="fretboardParametersStore.selectedSoundSample"
      ></FretboardVisualizer>
      <InformationComponent></InformationComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";
import { useGlobalStore } from "@/scripts/stores/globalStore";

import FretboardVisualizer from "@/modules/fretboard/components/FretboardVisualizer.vue";
import FretboardSettingsLayout from "@/components/layouts/FretboardSettingsViewLayout.vue";
import InformationComponent from "@/modules/information/components/InformationComponent.vue";
import IconInformation from "@/components/icons/IconInformation.vue";
import IconGear from "@/components/icons/IconGear.vue";
import IconTune from "@/components/icons/IconTune.vue";

import { computed } from "vue";
import type {
  FretboardNote,
  NoteClassMap,
} from "@/modules/fretboard/types/fretboard";
import { DisplayTypeEnum } from "@/scripts/enums/DisplayTypeEnum";
import { getClassMap } from "@/modules/fretboard/services/noteClassMaps";
import {
  getDisplayVariationTypeToUse,
  getFretboardNotes,
} from "@/modules/fretboard/services/fretboard";
import { Chord, Note, Scale } from "@tonaljs/tonal";
import { DisplayVariationType } from "@/modules/fretboard/enums/DisplayVariationType";
import {
  getChord,
  getChordNotes
} from "@/scripts/helpers/chords";
import {
  getScale,
  getScaleNotes,
} from "@/scripts/helpers/scales";

const globalStore = useGlobalStore();
const fretboardParametersStore = useFretboardParametersStore();

const fretboardNotes = computed<FretboardNote[][]>(() => {
  return getFretboardNotes(
    fretboardParametersStore.fretboard.baseNotes,
    fretboardParametersStore.fretboard.stringLength,
    noteClassMaps.value,
    displayVariationType.value
  );
});

// Selected chord in the store
const chord = computed<typeof Chord>(() => {
  return getChord(
    Note.get(fretboardParametersStore.note),
    fretboardParametersStore.chordType
  );
});

// Selected scale in the store
const scale = computed<typeof Scale>(() => {
  return getScale(
    Note.get(fretboardParametersStore.note),
    fretboardParametersStore.scaleName
  );
});

// The css class of each notes to highlight depending on whether the display type is chord or scale
const noteClassMaps = computed<NoteClassMap[]>(() => {
  switch (fretboardParametersStore.displayType) {
    case DisplayTypeEnum.Chord: {
      return getClassMap(
        chord.value,
        true,
        fretboardParametersStore.showNotes
      );
    }
    case DisplayTypeEnum.Scale: {
      return getClassMap(
        scale.value,
        true,
        fretboardParametersStore.showNotes
      );
    }
  }
});

// Whether the note on fretboard should be sharp or flat
const displayVariationType = computed<DisplayVariationType>(() => {
  switch (fretboardParametersStore.displayType) {
    case DisplayTypeEnum.Chord: {
      return getDisplayVariationTypeToUse(getChordNotes(chord.value));
    }
    case DisplayTypeEnum.Scale: {
      return getDisplayVariationTypeToUse(getScaleNotes(scale.value));
    }
  }
});
</script>

<style scoped lang="scss"></style>