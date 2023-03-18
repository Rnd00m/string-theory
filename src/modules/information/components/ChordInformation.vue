<template>
  <p>
    The {{ fretboardParametersStore.chord.name }} is a
    {{ fretboardParametersStore.chord.type }} chord composed of
    {{
      conjunctionFormatter.format(
        fretboardParametersStore.chord.intervals
      )
    }}
    intervals.
    <span v-if="fretboardParametersStore.chord.aliases.length">
      It can be written
      {{
        disjunctionFormatter.format(
          fretboardParametersStore.chord.aliases.map(
            (alias) => `${fretboardParametersStore.chord.tonic} ${alias}`
          )
        )
      }}.
    </span>
  </p>
  <p>It contains the notes :</p>
  <div class="flex justify-center gap-8 w-full flex-row">
    <div
      v-for="(note, index) in fretboardParametersStore.chord.notes"
      :key="'chord-information-note-' + note"
      class="grid h-20 card place-items-center"
    >
      <span
        class="px-3 py-1 text-lg rounded-lg"
        :class="getNoteClass(Note.get(note), classMap)"
      >
        {{ note }}
      </span>
      <span>{{ fretboardParametersStore.chord.intervals[index] }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";
import {
  getClassMap,
  getNoteClass,
} from "@/modules/fretboard/services/noteClassMaps";
import { Note } from "@tonaljs/tonal";
import { computed } from "vue";
import type { NoteClassMap } from "@/modules/fretboard/types/NoteClassMap";

const fretboardParametersStore = useFretboardParametersStore();

const conjunctionFormatter = new Intl.ListFormat("en-GB", {
  style: "long",
  type: "conjunction",
});
const disjunctionFormatter = new Intl.ListFormat("en-GB", {
  style: "long",
  type: "disjunction",
});

const classMap = computed<NoteClassMap[]>(() => {
  return getClassMap(
    fretboardParametersStore.chord,
    true,
    true
  );
});
</script>

<style scoped></style>