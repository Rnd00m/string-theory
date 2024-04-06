<template>
  <p class="max-w-prose">
    The {{ chord.name }} is a {{ chord.type }} chord composed of
    {{ conjunctionFormatter.format(chord.intervals) }}
    intervals.
    <span v-if="chord.aliases.length">
      It can be written
      {{
        disjunctionFormatter.format(
          chord.aliases.map((alias: string) => `${chord.tonic} ${alias}`)
        )
      }}.
    </span>
  </p>
</template>

<script setup lang="ts">
import {
getClassMap
} from "@/components/modules/fretboard/services/noteClassMaps";
import type { NoteClassMap } from "@/components/modules/fretboard/types/fretboard";
import { getChord } from "@/utils/helpers/chords";
import { Note } from "@tonaljs/tonal";

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
