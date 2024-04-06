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
import { DisplayTypeEnum } from '@/utils/enums/DisplayTypeEnum';

const fretboardParametersStore = useFretboardParametersStore();
</script>

<style scoped lang="scss"></style>
