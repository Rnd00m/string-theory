<template>
  <p>
    The {{ fretboardParametersStore.note }}
    {{ fretboardParametersStore.scale.name }} scale contains the notes :
  </p>
  <div class="flex justify-center gap-8 w-full flex-row">
    <div
      v-for="(note, index) in fretboardParametersStore.scaleNotesArray"
      :key="'scale-information-note-' + note"
      class="grid h-20 card place-items-center"
    >
      <span
        class="px-3 py-1 text-lg rounded-lg"
        :class="getNoteClass(note)"
      >
        {{ note }}
      </span>
      <span>{{ fretboardParametersStore.scale.intervals[index] }}</span>
    </div>
  </div>
</template>

<script>
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";

export default {
  name: "ScaleInformation",
  setup() {
    const fretboardParametersStore = useFretboardParametersStore();

    return { fretboardParametersStore };
  },
  methods: {
    getNoteClass(note) {
      if (this.fretboardParametersStore.chordNotes.root === note)
        return "note-root";
      if (
        note === this.fretboardParametersStore.scalesNotes.third ||
        note === this.fretboardParametersStore.scalesNotes.fifth ||
        note === this.fretboardParametersStore.scalesNotes.seventh
      )
        return "note-scale-triad";
      return "note-scale";
    },
  },
};
</script>

<style scoped></style>