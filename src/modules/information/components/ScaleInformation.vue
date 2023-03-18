<template>
  <p>
    The {{ fretboardParametersStore.note }}
    {{ fretboardParametersStore.scale.name }} scale contains the notes :
  </p>
  <div class="flex justify-center gap-8 w-full flex-row">
    <div
      v-for="(note, index) in scale.notes"
      :key="'scale-information-note-' + note"
      class="grid h-20 card place-items-center"
    >
      <span
        class="px-3 py-1 text-lg rounded-lg"
        :class="getNoteClass(Note.get(note), classMap)"
      >
        {{ note }}
      </span>
      <span>{{ fretboardParametersStore.scale.intervals[index] }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";
import {
  getClassMap,
  getNoteClass,
} from "@/modules/fretboard/services/noteClassMaps";
import { Scale, Note } from "@tonaljs/tonal";
import { computed, ref } from "vue";
import type { NoteClassMap } from "@/modules/fretboard/types/NoteClassMap";

const fretboardParametersStore = useFretboardParametersStore();

const scale = ref<typeof Scale>(Scale.get(`${fretboardParametersStore.note} ${fretboardParametersStore.scale.name}`));

const classMap = computed<NoteClassMap[]>(() => {
  return getClassMap(
    scale.value,
    true,
    true
  );
});
</script>

<style scoped></style>