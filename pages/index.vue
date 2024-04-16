<template>
  <div class="grid grid-flow-row mt-4 portrait:gap-6 portrait:mt-0 lg:gap-8 lg:mt-0">
    <div class="px-4 sm:p-0">
      <SettingsFretboard class="hidden portrait:block lg:block" />
    </div>
    <FretboardViewer
      :fretboard-notes="fretboardNotes"
      :show-octave="fretboardParametersStore.showOctave"
      :is-sound-active="true"
      :selected-sound-sample="fretboardParametersStore.selectedSoundSample"
    />
    <div class="px-4 pb-4 sm:p-0">
      <InformationComponent />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DisplayVariationType } from "@/components/modules/fretboard/enums/DisplayVariationType";
import {
  getDisplayVariationTypeToUse,
  getFretboardNotes,
} from "@/components/modules/fretboard/services/fretboard";
import { getClassMap } from "@/components/modules/fretboard/services/noteClassMaps";
import type {
  FretboardNote,
  NoteClassMap,
} from "@/components/modules/fretboard/types/fretboard";
import { DisplayTypeEnum } from "@/utils/enums/DisplayTypeEnum";
import { getChord, getChordNotes } from "@/utils/helpers/chords";
import { getScale, getScaleNotes } from "@/utils/helpers/scales";
import { Note } from "@tonaljs/tonal";

definePageMeta({
  title: "Fretboard Visualizer",
});

useSEODescription("Explore an interactive guitar fretboard tool for visualizing notes, chords, and scales in any tuning. Perfect for independent guitarists and bassists, this tool offers a practical experience to work on and explore music. Try it now to enhance your playing and understanding of music theory!")

const fretboardParametersStore = useFretboardParametersStore();

const fretboardNotes = computed<FretboardNote[][]>(() => {
  return getFretboardNotes(
    fretboardParametersStore.fretboard.baseNotes,
    fretboardParametersStore.fretboard.stringLength,
    noteClassMaps.value,
    displayVariationType.value,
    true
  );
});

// Selected chord in the store
const chord = computed<Chord>(() => {
  return getChord(
    Note.get(fretboardParametersStore.note),
    fretboardParametersStore.chordType
  );
});

// Selected scale in the store
const scale = computed<Scale>(() => {
  return getScale(
    Note.get(fretboardParametersStore.note),
    fretboardParametersStore.scaleName
  );
});

// The css class of each notes to highlight depending on whether the display type is chord or scale
const noteClassMaps = computed<NoteClassMap[]>(() => {
  switch (fretboardParametersStore.displayType) {
    case DisplayTypeEnum.Chord: {
      return getClassMap(chord.value, true, fretboardParametersStore.showNotes);
    }
    case DisplayTypeEnum.Scale: {
      return getClassMap(scale.value, true, fretboardParametersStore.showNotes);
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
