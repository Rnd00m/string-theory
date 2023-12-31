<template>
  <div class="fretboard-wrapper overflow-x-auto">
    <FretboardString
      v-for="(fretboardNote, index) in props.fretboardNotes"
      :key="`string-${index}`"
      :string-notes="fretboardNote"
      :string="index"
      :show-octave="props.showOctave"
      :sampler="sampler"
      :is-note-selectable="props.isNoteSelectable"
      :is-sound-active="props.isSoundActive"
      v-bind="$attrs"
    />
    <FretboardMarker :string-length="props.fretboardNotes[0].length" />
  </div>
</template>

<script setup lang="ts">
import FretboardString from "@/modules/fretboard/components/FretboardString.vue";
import FretboardMarker from "@/modules/fretboard/components/FretboardMarker.vue";
import { SoundSample } from "@/modules/settings/services/classes/SoundSample";
import { soundSampleList } from "@/modules/settings/services/SoundSampleList";
import type { FretboardNote } from "@/modules/fretboard/types/fretboard";
import { getSampler } from "@/commons/helpers/utils";
import { computedAsync } from '@vueuse/core'

interface Props {
  fretboardNotes: FretboardNote[][];
  showOctave?: boolean;
  isNoteSelectable?: boolean;
  isSoundActive?: boolean;
  selectedSoundSample?: SoundSample;
}
const props = withDefaults(defineProps<Props>(), {
  selectedSoundSample: soundSampleList[0],
});

const sampler = computedAsync(
  async () => {
    return await getSampler(props.selectedSoundSample?.url);
  },
  null // initial state
);
</script>

<style scoped lang="scss"></style>
