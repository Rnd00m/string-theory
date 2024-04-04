<template>
  <div class="fretboard-settings-wrapper w-4xl max-w-4xl flex flex-col mx-auto">
    <BaseCard :body-classes="['md:p-4', 'p-2']">
      <div class="flex flex-col w-full sm:flex-row justify-center">
        <div class="flex gap-1 md:gap-3 justify-center">
          <SettingsNote />
        </div>

        <div class="divider sm:divider-horizontal -my-2 sm:my-0" />

        <div class="flex gap-1 md:gap-3 justify-center">
          <SettingsNoteVariation />
        </div>
      </div>

      <div class="divider -my-2 sm:my-0.5" />

      <div class="flex flex-wrap items-center justify-evenly">
        <SettingsTuningModal />

        <div class="divider sm:divider-horizontal"></div>

        <SettingsStringLength />

        <div class="divider sm:divider-horizontal"></div>

        <SettingsOctave />
      </div>

      <div class="divider -my-2 sm:my-0.5" />

      <div class="flex gap-2 lg:gap-4 items-center justify-center">
        <SettingsDisplayType />

        <div class="divider sm:divider-horizontal"></div>

        <SettingsChordType
          v-if="fretboardParametersStore.displayType === DisplayTypeEnum.Chord"
        />

        <SettingsScaleModal v-else />

        <div class="divider sm:divider-horizontal"></div>

        <SettingsTriad />
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { DisplayTypeEnum } from "@/utils/enums/DisplayTypeEnum";

const fretboardParametersStore = useFretboardParametersStore();
</script>

<style scoped lang="scss"></style>
