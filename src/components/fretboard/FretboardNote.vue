<template>
  <div class="fret-wrapper">
    <div class="note-wrapper text-center py-2 px-4">
      <div class="note rounded-lg text-center text-lg" :class="noteClass">
        <span>{{ noteFullName }}</span
        ><span class="note-octave" v-if="fretboardParametersStore.showOctave">{{
          note.oct
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { useFretboardParametersStore } from "@/stores/fretboardParameters";

export default {
  name: "FretboardNote",
  data() {
    return {
      selectedChord: null,
      showTriads: false,
    };
  },
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
  computed: {
    noteFullName() {
      return this.note.letter + this.beautifyAccidentalValue(this.note.acc);
    },
    noteClass() {
      if (this.fretboardParametersStore.note === this.note.pc)
        return "note-root";
      if (this.fretboardParametersStore.showTriads) {
        if (this.fretboardParametersStore.displayType === "chord") {
          if (this.fretboardParametersStore.chordNotes.third === this.note.pc)
            return "note-third";
          if (this.fretboardParametersStore.chordNotes.fifth === this.note.pc)
            return "note-fifth";
          if (this.fretboardParametersStore.chordNotes.seventh === this.note.pc)
            return "note-seventh";
        }

        if (this.fretboardParametersStore.displayType === "scale") {
          if (
            this.note.pc === this.fretboardParametersStore.scalesNotes.third ||
            this.note.pc === this.fretboardParametersStore.scalesNotes.fifth ||
            this.note.pc === this.fretboardParametersStore.scalesNotes.seventh
          )
            return "note-scale-triad";

          if (
            Object.values(this.fretboardParametersStore.scalesNotes).includes(
              this.note.pc
            )
          )
            return "note-scale";
        }
      }
      return "";
    },
  },
  methods: {
    beautifyAccidentalValue(accidental) {
      if (accidental === "b") return "♭";
      if (accidental === "bb") return "𝄫";
      if (accidental === "##") return "𝄪";
      if (accidental === undefined) return "";
      return accidental;
    },
  },
  setup() {
    const fretboardParametersStore = useFretboardParametersStore();

    return { fretboardParametersStore };
  },
};
</script>

<style scoped lang="scss">
.fret-wrapper {
  border-right: 2px hsl(var(--bc)) solid;

  &:not(:first-child):before {
    position: absolute;
    content: " ";
    height: 50%;
    width: 100%;
    top: 0;
    z-index: 4;
    border-bottom: 1px solid hsl(var(--nc));
  }
}
</style>
