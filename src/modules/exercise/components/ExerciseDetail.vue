<template>
  <div class="exercise-wrapper grid grid-cols-6 gap-4">
    <div class="col-start-2 col-span-4 stats bg-base-200">
      <div class="stat">
        <div>Find all <span class="text-white p-1 font-bold text-lg rounded-lg note-to-find">{{ noteToFind.pc }}</span> on the fretboard</div>
        <div class="stat-value text-2xl">0 / {{ positionsOfNoteToFind.length }}</div>
      </div>

      <div class="stat">
        <div>Errors</div>
        <div class="stat-value text-2xl">{{ errorsNumber }}</div>
      </div>
    </div>

    <div class="col-start-1 col-end-7">
      <FretboardVisualizer
        :fretboard-notes="fretboardNotes"
        :is-note-selectable="true"
        :is-sound-active="false"
        :note-class-map="noteClassMaps"
        @note-selected="selectNote"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import FretboardVisualizer from "@/modules/fretboard/components/FretboardVisualizer.vue";
import { Note, Scale } from "@tonaljs/tonal";
import { onBeforeMount, ref } from "vue";
import { getFretboardNotes } from "@/modules/fretboard/services/fretboard";
import type { NoteClassMap } from "@/modules/fretboard/types/NoteClassMap";
import type { NotePosition } from "@/modules/exercise/types/NotePosition";
import { getPositionOfNoteOnFretboard, getRandomNote } from "@/modules/exercise/services/exercise";

const noteToFind = ref<typeof Note>();
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

const positionsOfNoteToFind = ref<NotePosition[]>([]);
const errorsNumber = ref<number>(0);

onBeforeMount(() => {
  noteToFind.value = getRandomNote();
  positionsOfNoteToFind.value = getPositionOfNoteOnFretboard(fretboardNotes.value, noteToFind.value);
});

function selectNote(eventData: NoteClassMap) {
  if (!noteClassMaps.value.some((noteClassMap) => noteClassMap.key === eventData.key)) {
    noteClassMaps.value.push(eventData);
  }
}
</script>

<style scoped lang="scss">
.note-to-find {
  background: hsl(var(--pf));
}
</style>