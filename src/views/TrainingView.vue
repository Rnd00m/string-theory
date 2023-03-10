<template>
  <div class="training">
    <FretboardVisualizer
      :base-notes="fretboardParametersStore.fretboard.baseNotes"
      :string-length="fretboardParametersStore.fretboard.stringLength"
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
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";
import type {SelectedNote} from "@/modules/fretboard/types/SelectedNote";
import {ref} from "vue";

const fretboardParametersStore = useFretboardParametersStore();

const selectedNotes = ref([] as SelectedNote[]);

function selectNote(eventData: SelectedNote) {
  if (!selectedNotes.value.some((selectedNote) => selectedNote.key === eventData.key)) {
    selectedNotes.value.push(eventData)
  }
}
</script>