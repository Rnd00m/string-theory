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
        :base-notes="fretboardParametersStore.fretboard.baseNotes"
        :string-length="fretboardParametersStore.fretboard.stringLength"
        :note-class-map="noteClassMaps"
        :show-note-background="fretboardParametersStore.showTriads"
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
import {
  getChordClassMap,
  getScaleClassMap,
} from "@/modules/fretboard/services/noteClassMaps";

const globalStore = useGlobalStore();
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
</script>

<style scoped lang="scss"></style>