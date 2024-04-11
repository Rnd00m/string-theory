<template>
  <div class="fretboard-viewer place-self-center">
    <div class="grid grid-flow-row gap-8">
      <div class="p-4 sm:p-0">
        <SettingsFretboard class="hidden portrait:block lg:block" />
      </div>
      <FretboardViewer
        :fretboard-notes="fretboardNotes"
        :show-octave="fretboardParametersStore.showOctave"
        :is-sound-active="true"
        :selected-sound-sample="fretboardParametersStore.selectedSoundSample"
      />
      <div class="p-4 sm:p-0">
        <InformationComponent />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DisplayVariationType } from "@/components/modules/fretboard/enums/DisplayVariationType";
import { getDisplayVariationTypeToUse, getFretboardNotes } from "@/components/modules/fretboard/services/fretboard";
import { getClassMap } from "@/components/modules/fretboard/services/noteClassMaps";
import type { FretboardNote, NoteClassMap } from "@/components/modules/fretboard/types/fretboard";
import { DisplayTypeEnum } from "@/utils/enums/DisplayTypeEnum";
import { getChord, getChordNotes } from "@/utils/helpers/chords";
import { getScale, getScaleNotes } from "@/utils/helpers/scales";
import { Note } from "@tonaljs/tonal";

definePageMeta({
  title: 'Fretboard Visualizer'
})

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
