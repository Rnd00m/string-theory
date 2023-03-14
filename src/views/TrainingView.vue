<template>
  <div class="training">
    <ExerciseDetail class="mb-4" />
    <FretboardVisualizer
      :fretboard-notes="fretboardNotes"
      :is-note-selectable="true"
      :is-sound-active="false"
      :note-class-map="noteClassMaps"
      @note-selected="selectNote"
    />
  </div>
</template>

<style></style>
<script setup lang="ts">
import FretboardVisualizer from "@/modules/fretboard/components/FretboardVisualizer.vue";
import ExerciseDetail from "@/modules/exercise/components/ExerciseDetail.vue";
import { ref } from "vue";
import { getFretboardNotes } from "@/modules/fretboard/services/fretboard";
import { Note } from "@tonaljs/tonal";
import type { NoteClassMap } from "@/modules/fretboard/types/NoteClassMap";

const baseNotes: typeof Note[] = [
  Note.get("E4"),
  Note.get("B3"),
  Note.get("G3"),
  Note.get("D3"),
  Note.get("A2"),
  Note.get("E2"),
];

const fretboardNotes = ref<typeof Note[][]>(getFretboardNotes(baseNotes, 12));
const noteClassMaps = ref<NoteClassMap[]>([]);

function selectNote(eventData: NoteClassMap) {
  if (!noteClassMaps.value.some((noteClassMap) => noteClassMap.key === eventData.key)) {
    noteClassMaps.value.push(eventData);
  }
}
</script>