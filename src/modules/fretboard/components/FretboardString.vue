<template>
  <div class="strings-wrapper">
    <div
      class="grid lg:grid-cols-[repeat(13,_4.5rem)] grid-cols-[repeat(13,_3.5rem)]"
    >
      <FretboardNote
        v-for="(note, index) in props.stringNotes"
        :key="`string-${props.string}-fret-${index}`"
        :fret="index"
        :string="props.string"
        :note="note"
        :show-octave="props.showOctave"
        :sampler="sampler"
        :note-class="
          getNoteClass(
            props.noteClassMap,
            `string-${props.string}-fret-${index}`
          )
        "
        :is-sound-active="props.isSoundActive"
        v-bind="$attrs"
      ></FretboardNote>
    </div>
  </div>
</template>

<script setup lang="ts">
import FretboardNote from "./FretboardNote.vue";
import * as Tone from "tone";
import { Note } from "@tonaljs/tonal";
import type { NoteClassMap } from "@/modules/fretboard/types/NoteClassMap";

interface Props {
  stringNotes: typeof Note[];
  string: number;
  showOctave?: boolean;
  sampler: Tone.Sampler;
  noteClassMap?: NoteClassMap[];
  isNoteSelectable?: boolean;
  isSoundActive?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  noteClassMap: [],
  isNoteSelectable: false,
  isSoundActive: false,
});

function getNoteClass(noteClassMap: NoteClassMap[], key: string): string {
  return noteClassMap.find((map) => map.key === key)?.class || "";
}
</script>

<style scoped lang="scss"></style>