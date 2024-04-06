<template>
  <p>
    The {{ fretboardParametersStore.noteLetter }}
    {{ fretboardParametersStore.scaleName }} scale contains the notes :
  </p>
  <div class="flex justify-center gap-2 md:gap-4 lg:gap-8 w-full flex-row">
    <div
      v-for="(note, index) in getScaleNotes(scale)"
      :key="'scale-information-note-' + note"
      class="grid h-20 card place-items-center"
    >
      <span
        class="px-3 py-1 text-sm md:text-lg rounded-lg"
        :class="getNoteClass(Note.get(note), classMap)"
      >
        {{ note.pc }}
      </span>
      <span>{{ scale.intervals[index] }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
getClassMap,
getNoteClass,
} from "@/components/modules/fretboard/services/noteClassMaps";
import type { NoteClassMap } from "@/components/modules/fretboard/types/fretboard";
import { getScale, getScaleNotes } from "@/utils/helpers/scales";
import { Note } from "@tonaljs/tonal";

const fretboardParametersStore = useFretboardParametersStore();

const scale = computed<Scale>(() => {
  return getScale(
    Note.get(fretboardParametersStore.note),
    fretboardParametersStore.scaleName
  );
});

const classMap = computed<NoteClassMap[]>(() => {
  return getClassMap(scale.value, true, true);
});
</script>

<style scoped></style>
