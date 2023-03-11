<template>
  <div class="training">
    <FretboardVisualizer
      :fretboard-notes="fretboardNotes"
      :is-note-selectable="true"
      :is-sound-active="false"
      :selected-notes="selectedNotes"
      @note-selected="selectNote"
    ></FretboardVisualizer>
  </div>
</template>

<style></style>
<script setup lang="ts">
import FretboardVisualizer from "@/modules/fretboard/components/FretboardVisualizer.vue";
import type { SelectedNote } from "@/modules/fretboard/types/SelectedNote";
import { ref } from "vue";
import { getFretboardNotes } from "@/modules/fretboard/services/fretboard";
import { Note } from "@tonaljs/tonal";

const baseNotes = [
  Note.get("E4"),
  Note.get("B3"),
  Note.get("G3"),
  Note.get("D3"),
  Note.get("A2"),
  Note.get("E2"),
];

const fretboardNotes = ref(getFretboardNotes(baseNotes, 12));

const selectedNotes = ref([] as SelectedNote[]);

function selectNote(eventData: SelectedNote) {
  if (!selectedNotes.value.some((selectedNote) => selectedNote.key === eventData.key)) {
    selectedNotes.value.push(eventData)
  }
}
</script>