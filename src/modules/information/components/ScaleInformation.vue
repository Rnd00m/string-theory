<template>
  <p>
    The {{ fretboardParametersStore.noteLetter }}
    {{ fretboardParametersStore.scaleName }} scale contains the notes :
  </p>
  <div class="flex justify-center gap-8 w-full flex-row">
    <div
      v-for="(note, index) in getScaleNotes(scale)"
      :key="'scale-information-note-' + note"
      class="grid h-20 card place-items-center"
    >
      <span
        class="px-3 py-1 text-lg rounded-lg"
        :class="getNoteClass(Note.get(note), classMap)"
      >
        {{ note.pc }}
      </span>
      <span>{{ scale.intervals[index] }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";
import {
  getClassMap,
  getNoteClass,
} from "@/modules/fretboard/services/noteClassMaps";
import { Note, Scale } from "@tonaljs/tonal";
import { computed } from "vue";
import type { NoteClassMap } from "@/modules/fretboard/types/fretboard";
import {
  getScale,
  getScaleNotes
} from "@/scripts/helpers/scales";

const fretboardParametersStore = useFretboardParametersStore();

const scale = computed<typeof Scale>(() => {
  return getScale(
    Note.get(fretboardParametersStore.note),
    fretboardParametersStore.scaleName
  );
});

const classMap = computed<NoteClassMap[]>(() => {
  return getClassMap(
    scale.value,
    true,
    true
  );
});
</script>

<style scoped></style>