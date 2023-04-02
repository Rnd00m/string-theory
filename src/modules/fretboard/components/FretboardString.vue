<template>
  <div class="strings-wrapper">
    <div class="grid grid-flow-col auto-cols-[3.5rem] lg:auto-cols-[4.5rem]">
      <FretboardNote
        v-for="(fretboardNote, index) in props.stringNotes"
        :key="`string-${props.string}-fret-${index}`"
        :fret="index"
        :string="props.string"
        :fretboard-note="fretboardNote"
        :show-octave="props.showOctave"
        :sampler="sampler"
        :is-sound-active="props.isSoundActive"
        v-bind="$attrs"
      ></FretboardNote>
    </div>
  </div>
</template>

<script setup lang="ts">
import FretboardNote from "./FretboardNote.vue";
import * as Tone from "tone";
import type { FretboardNote as FretboardNoteType } from "@/modules/fretboard/types/fretboard";

interface Props {
  stringNotes: FretboardNoteType[];
  string: number;
  showOctave?: boolean;
  sampler: Tone.Sampler;
  isNoteSelectable?: boolean;
  isSoundActive?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  isNoteSelectable: false,
  isSoundActive: false,
});
</script>

<style scoped lang="scss"></style>