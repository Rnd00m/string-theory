<template>
  <div class="fretboard-visualizer">
    <MqResponsive target="sm-">
      <div class="absolute right-2 top-2 flex-1 gap-1 justify-end inline-flex">
        <label class="p-2" for="information-modal">
          <svg-icon type="mdi" :path="mdiInformationOutline" />
        </label>
        <label for="app-drawer" class="drawer-button p-2" @click="globalStore.selectedDrawer = 'settings-tuning'">
          <svg-icon type="mdi" :path="mdiTune" />
        </label>
        <label for="app-drawer" class="drawer-button p-2" @click="globalStore.selectedDrawer = 'settings'">
          <svg-icon type="mdi" :path="mdiCogOutline" />
        </label>
      </div>
    </MqResponsive>

    <div class="grid gap-4">
      <MqResponsive group>
        <template #lg+><SettingsFretboard /></template>
        <template #md:landscape><SettingsFretboard /></template>
        <template #md-lg:portrait><SettingsFretboard /></template>
      </MqResponsive>
      <FretboardVisualizer
        :fretboard-notes="fretboardNotes"
        :show-octave="fretboardParametersStore.showOctave"
        :is-sound-active="true"
        :selected-sound-sample="fretboardParametersStore.selectedSoundSample"
      />
      <MqResponsive group>
        <template #lg+><InformationCardComponent /></template>
        <template #md:landscape><InformationCardComponent /></template>
        <template #md-lg:portrait><InformationCardComponent /></template>
        <template #md-><InformationModalComponent /></template>
      </MqResponsive>
    </div>
  </div>
</template>

<script setup lang="ts">
import FretboardVisualizer from "@/modules/fretboard/components/FretboardVisualizer.vue";
import InformationCardComponent from "@/modules/information/components/InformationCardComponent.vue";
import InformationModalComponent from "@/modules/information/components/InformationModalComponent.vue";
import SettingsFretboard from "@/modules/settings/layouts/SettingsFretboard.vue";

import { useGlobalStore } from "@/commons/stores/globalStore";
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";

import SvgIcon from "@jamescoyle/vue-icon";
import { mdiInformationOutline } from "@mdi/js";
import { mdiCogOutline } from "@mdi/js";
import { mdiTune } from "@mdi/js";

import { computed } from "vue";
import { DisplayTypeEnum } from "@/commons/enums/DisplayTypeEnum";
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
} from "@/commons/helpers/chords";
import {
  getScale,
  getScaleNotes,
} from "@/commons/helpers/scales";
import { MqResponsive } from "vue3-mq";

const globalStore = useGlobalStore();
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