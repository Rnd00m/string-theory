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
        :sampler="sampler"
        :note-class-map="props.noteClassMap"
        :show-note-background="props.showNoteBackground"
        :selected-note-class="
          shouldNoteBeSelected(
            props.selectedNotes,
            `string-${props.string}-fret-${index}`
          ) ? 'fretboard-note-selected' : ''
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
import type { SelectedNote } from "@/modules/fretboard/types/SelectedNote";

interface Props {
  stringNotes: typeof Note[];
  string: number;
  sampler: Tone.Sampler;
  noteClassMap?: NoteClassMap[];
  showNoteBackground?: boolean;
  isNoteSelectable?: boolean;
  selectedNotes?: SelectedNote[];
  isSoundActive?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  selectedNotes: [] as SelectedNote[],
});

function shouldNoteBeSelected(selectedNotes: SelectedNote[], key: string): boolean {
  if (!props.isNoteSelectable) return false;
  return selectedNotes.some((selectedNote) => selectedNote.key === key);
}
</script>

<style scoped lang="scss"></style>