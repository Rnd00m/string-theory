<template>
  <div
    class="fretboard-settings-wrapper w-4xl max-w-4xl flex flex-col mx-auto lg:space-y-5 space-y-2"
  >
    <BaseCard :body-classes="['md:p-4', 'p-2']">
      <div class="flex flex-col w-full sm:flex-row justify-center">
        <div class="flex gap-1 md:gap-3 justify-center">
          <SettingsNote />
        </div>

        <div class="divider sm:divider-horizontal -my-2 md:my-0" />

        <div class="flex gap-1 md:gap-3 justify-center">
          <SettingsNoteVariation />
        </div>
      </div>

      <div class="divider -my-2 md:my-0.5" />

      <div class="flex flex-wrap items-center justify-evenly">
        <SettingsTuningModal />

        <div class="divider sm:divider-horizontal"></div>

        <SettingsStringLength />

        <div class="divider sm:divider-horizontal"></div>

        <SettingsOctave />
      </div>

      <div class="divider -my-2 md:my-0.5" />

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
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";

import BaseCard from "@/components/base/cards/BaseCard.vue";

import SettingsNote from "@/modules/settings/components/SettingsNote.vue";
import SettingsNoteVariation from "@/modules/settings/components/SettingsNoteVariation.vue";
import SettingsOctave from "@/modules/settings/components/SettingsOctave.vue";
import SettingsChordType from "@/modules/settings/components/SettingsChordType.vue";
import SettingsDisplayType from "@/modules/settings/components/SettingsDisplayType.vue";
import SettingsTriad from "@/modules/settings/components/SettingsTriad.vue";
import SettingsScaleModal from "@/modules/settings/components/SettingsScaleModal.vue";
import { DisplayTypeEnum } from "@/commons/enums/DisplayTypeEnum";
import SettingsStringLength from "@/modules/settings/components/SettingsStringLength.vue";
import SettingsTuningModal from "@/modules/settings/components/tuning/SettingsTuningModal.vue";

const fretboardParametersStore = useFretboardParametersStore();
</script>

<style scoped lang="scss"></style>
