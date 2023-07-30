<template>
  <div class="fretboard-viewer place-self-end md:place-self-center">
    <MqResponsive group>
      <template #md-:landscape>
        <TheViewerDrawerIcons />
      </template>
    </MqResponsive>

    <div class="grid grid-flow-row gap-4">
      <MqResponsive group class="p-4 sm:p-0">
        <template #lg+><SettingsFretboard /></template>
        <template #lg-:portrait><SettingsFretboard /></template>
      </MqResponsive>
      <FretboardViewer
        :fretboard-notes="fretboardNotes"
        :show-octave="fretboardParametersStore.showOctave"
        :is-sound-active="true"
        :selected-sound-sample="fretboardParametersStore.selectedSoundSample"
      />
      <MqResponsive group class="p-4 sm:p-0">
        <template #lg+><InformationCardComponent /></template>
        <template #lg-:portrait><InformationCardComponent /></template>
      </MqResponsive>
    </div>
  </div>
</template>

<script setup lang="ts">
import FretboardViewer from "@/modules/fretboard/components/FretboardViewer.vue";
import InformationCardComponent from "@/modules/information/components/InformationCardComponent.vue";
import SettingsFretboard from "@/modules/settings/layouts/SettingsFretboard.vue";
import TheViewerDrawerIcons from "@/components/TheViewerDrawerIcons.vue";

import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";

import { computed } from "vue";
import { DisplayTypeEnum } from "@/commons/enums/DisplayTypeEnum";
import { getClassMap } from "@/modules/fretboard/services/noteClassMaps";
import {
  getDisplayVariationTypeToUse,
  getFretboardNotes,
} from "@/modules/fretboard/services/fretboard";
import { Chord, Note, Scale } from "@tonaljs/tonal";
import { DisplayVariationType } from "@/modules/fretboard/enums/DisplayVariationType";
import { getChord, getChordNotes } from "@/commons/helpers/chords";
import { getScale, getScaleNotes } from "@/commons/helpers/scales";
import { MqResponsive } from "vue3-mq";

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
