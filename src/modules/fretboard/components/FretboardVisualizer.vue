<template>
  <div class="fretboard-wrapper">
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
import * as Tone from "tone";
import { computed } from "vue";
import { SoundSample } from "@/modules/settings/services/classes/SoundSample";
import { soundSampleList } from "@/modules/settings/services/soundSampleList";
import type { FretboardNote } from "@/modules/fretboard/types/fretboard";

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

const sampler = computed(() => {
  return new Tone.Sampler({
    urls: {
      A1: "A1.mp3",
      D1: "D1.mp3",
      A2: "A2.mp3",
      D2: "D2.mp3",
      A3: "A3.mp3",
      D3: "D3.mp3",
      A4: "A4.mp3",
      D4: "D4.mp3",
      A5: "A5.mp3",
      D5: "D5.mp3",
      A6: "A6.mp3",
      D6: "D6.mp3",
      A7: "A7.mp3",
      D7: "D7.mp3",
    },
    baseUrl: props.selectedSoundSample.url,
  }).toDestination();
});
</script>

<style scoped lang="scss"></style>