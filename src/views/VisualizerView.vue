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
import { useGlobalStore } from "@/stores/globalStore";

import FretboardVisualizer from "@/modules/fretboard/components/FretboardVisualizer.vue";
import FretboardSettingsLayout from "@/components/layouts/FretboardSettingsViewLayout.vue";
import InformationComponent from "@/modules/information/components/InformationComponent.vue";
import IconInformation from "@/components/icons/IconInformation.vue";
import IconGear from "@/components/icons/IconGear.vue";
import IconTune from "@/components/icons/IconTune.vue";

import { computed } from "vue";
import type { NoteClassMap } from "@/modules/fretboard/types/NoteClassMap";
import { DisplayTypeEnum } from "@/scripts/enums/DisplayTypeEnum";
import { getClassMap } from "@/modules/fretboard/services/noteClassMaps";
import { getFretboardNotes } from "@/modules/fretboard/services/fretboard";
import {Scale} from "@tonaljs/tonal";

const globalStore = useGlobalStore();
const fretboardParametersStore = useFretboardParametersStore();

const fretboardNotes = computed(() => {
  return getFretboardNotes(
    fretboardParametersStore.fretboard.baseNotes,
    fretboardParametersStore.fretboard.stringLength,
    noteClassMaps.value
  );
});

const noteClassMaps = computed<NoteClassMap[]>(() => {
  switch (fretboardParametersStore.displayType) {
    case DisplayTypeEnum.Chord: {
      return getClassMap(
        fretboardParametersStore.chord,
        true,
        fretboardParametersStore.showNotes
      );
    }
    case DisplayTypeEnum.Scale: {
      return getClassMap(
        Scale.get(`${fretboardParametersStore.note} ${fretboardParametersStore.scale.name}`),
        true,
        fretboardParametersStore.showNotes
      );
    }
  }
});
</script>

<style scoped lang="scss"></style>