<template>
  <div class="flex gap-3 justify-center">
    <SettingsNote />
  </div>

  <div class="divider my-0 mx-12">Note</div>

  <div class="flex gap-3 justify-center">
    <SettingsNoteVariation />
  </div>

  <div class="divider my-1.5 mx-1"></div>

  <div class="flex flex-wrap items-center justify-evenly">
    <SettingsTriad />

    <SettingsOctave />

    <SettingsStringLength />
  </div>

  <div class="divider my-1.5 mx-1"></div>

  <div class="flex gap-2 lg:gap-4 items-center justify-center">
    <SettingsChordType
      v-if="fretboardParametersStore.displayType === DisplayTypeEnum.Chord"
    />

    <SettingsScaleModal v-else />

    <SettingsDisplayType />
  </div>
</template>

<script setup lang="ts">
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";

import SettingsNote from "@/modules/settings/components/SettingsNote.vue";
import SettingsNoteVariation from "@/modules/settings/components/SettingsNoteVariation.vue";
import SettingsOctave from "@/modules/settings/components/SettingsOctave.vue";
import SettingsChordType from "@/modules/settings/components/SettingsChordType.vue";
import SettingsDisplayType from "@/modules/settings/components/SettingsDisplayType.vue";
import SettingsTriad from "@/modules/settings/components/SettingsTriad.vue";
import SettingsScaleModal from "@/modules/settings/components/SettingsScaleModal.vue";
import { DisplayTypeEnum } from "@/commons/enums/DisplayTypeEnum";
import BaseCard from "@/components/base/cards/BaseCard.vue";
import SettingsStringLength from "@/modules/settings/components/SettingsStringLength.vue";

const fretboardParametersStore = useFretboardParametersStore();
</script>

<style scoped lang="scss"></style>
