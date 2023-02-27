<template>
  <div
    class="fretboard-settings-wrapper flex flex-col mx-auto lg:space-y-5 space-y-2"
  >
    <div class="card bg-base-200 shadow-xl">
      <div
        class="card-body lg:p-5 p-2 flex flex-col w-full lg:flex-row justify-center"
      >
        <div class="flex gap-3 justify-center">
          <SettingsNote />
        </div>

        <div class="divider lg:divider-horizontal -my-2 lg:my-0"></div>

        <div class="flex gap-3 justify-center">
          <SettingsNoteVariation />
        </div>
      </div>
    </div>

    <div class="card bg-base-200 shadow-xl">
      <div class="card-body lg:p-4 p-2">
        <div class="flex flex-wrap items-center justify-evenly">
          <SettingsTriad />

          <div class="divider lg:divider-horizontal"></div>

          <SettingsOctave />
        </div>
      </div>
    </div>

    <div class="card bg-base-200 shadow-xl">
      <div class="card-body lg:p-4 p-2">
        <div class="flex gap-2 lg:gap-4 items-center justify-center">
          <SettingsChordType
            v-if="fretboardParametersStore.displayType === 'chord'"
          />

          <SettingsScaleModal v-else />

          <div class="divider lg:divider-horizontal"></div>

          <SettingsDisplayType />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useFretboardParametersStore } from "@/stores/fretboardParameters";

import SettingsNote from "@/components/modules/settings/components/SettingsNote.vue";
import SettingsNoteVariation from "@/components/modules/settings/components/SettingsNoteVariation.vue";
import SettingsOctave from "@/components/modules/settings/components/SettingsOctave.vue";
import SettingsChordType from "@/components/modules/settings/components/SettingsChordType.vue";
import SettingsDisplayType from "@/components/modules/settings/components/SettingsDisplayType.vue";
import SettingsTriad from "@/components/modules/settings/components/SettingsTriad.vue";
import SettingsScaleModal from "@/components/modules/settings/components/SettingsScaleModal.vue";
import SettingsSelectTuningModal from "@/components/modules/settings/components/tuning/SettingsSelectTuningModal.vue";

export default {
  name: "FretboardSettings",
  components: {
    SettingsNote,
    SettingsNoteVariation,
    SettingsOctave,
    SettingsChordType,
    SettingsDisplayType,
    SettingsTriad,
    SettingsScaleModal,
    SettingsSelectTuningModal,
  },
  setup() {
    const fretboardParametersStore = useFretboardParametersStore();

    return { fretboardParametersStore };
  },
};
</script>

<style scoped lang="scss"></style>