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
        :class="getNoteClass(note)"
      >
        {{ note }}
      </span>
      <span>{{ fretboardParametersStore.chord.intervals[index] }}</span>
    </div>
  </div>
</template>

<script>
import { useFretboardParametersStore } from "@/stores/fretboardParameters";

export default {
  name: "ChordInformation",
  setup() {
    const fretboardParametersStore = useFretboardParametersStore();

    const conjunctionFormatter = new Intl.ListFormat("en-GB", {
      style: "long",
      type: "conjunction",
    });
    const disjunctionFormatter = new Intl.ListFormat("en-GB", {
      style: "long",
      type: "disjunction",
    });

    return {
      fretboardParametersStore,
      conjunctionFormatter,
      disjunctionFormatter,
    };
  },
  methods: {
    getNoteClass(note) {
      if (this.fretboardParametersStore.chordNotes.root === note)
        return "note-root";
      if (this.fretboardParametersStore.chordNotes.third === note)
        return "note-third";
      if (this.fretboardParametersStore.chordNotes.fifth === note)
        return "note-fifth";
      if (this.fretboardParametersStore.chordNotes.seventh === note)
        return "note-seventh";
      return "";
    },
  },
};
</script>

<style scoped></style>