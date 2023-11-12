<template>
  <p class="max-w-prose">
    The {{ chord.name }} is a {{ chord.type }} chord composed of
    {{ conjunctionFormatter.format(chord.intervals) }}
    intervals.
    <span v-if="chord.aliases.length">
      It can be written
      {{
        disjunctionFormatter.format(
          chord.aliases.map(
            (alias: string) => `${chord.tonic} ${alias}`
          )
        )
      }}.
    </span>
  </p>
  <p class="max-w-prose">It contains the notes :</p>
  <div class="flex justify-center gap-8 flex-row">
    <div
      v-for="(note, index) in getChordNotes(chord)"
      :key="'chord-information-note-' + note"
      class="grid h-20 card place-items-center"
    >
      <span
        class="px-3 py-1 text-lg rounded-lg"
        :class="getNoteClass(Note.get(note), classMap)"
      >
        {{ note.pc }}
      </span>
      <span>{{ chord.intervals[index] }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";
import {
  getClassMap,
  getNoteClass,
} from "@/modules/fretboard/services/noteClassMaps";
import { computed } from "vue";
import { Chord, Note } from "@tonaljs/tonal";
import { getChord, getChordNotes } from "@/commons/helpers/chords";
import type { NoteClassMap } from "@/modules/fretboard/types/fretboard";

const fretboardParametersStore = useFretboardParametersStore();

const conjunctionFormatter = new Intl.ListFormat("en-GB", {
  style: "long",
  type: "conjunction",
});
const disjunctionFormatter = new Intl.ListFormat("en-GB", {
  style: "long",
  type: "disjunction",
});

const chord = computed<Chord>(() => {
  return getChord(
    Note.get(fretboardParametersStore.note),
    fretboardParametersStore.chordType
  );
});

const classMap = computed<NoteClassMap[]>(() => {
  return getClassMap(chord.value, true, true);
});
</script>

<style scoped></style>
