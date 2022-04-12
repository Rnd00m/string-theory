<template>
  <div class="fret-wrapper">
    <div class="note-wrapper text-center py-2 px-4">
      <div
        class="note rounded-lg text-center text-lg"
        :class="noteClass">
        <span>{{ noteFullName }}</span><span class="note-octave" v-if="parametersStore.showOctave">{{ noteObject.oct }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Note } from '@tonaljs/tonal'
import { useParametersStore } from "@/stores/parameters";

export default {
  name: "FretboardNote",
  data() {
    return {
      selectedChord: null,
      showTriads: false,
    }
  },
  props: {
    note: {
      type: String,
      required: true
    }
  },
  computed: {
    noteObject() {
      return Note.get(this.note)
    },
    noteFullName() {
      return this.noteObject.letter + this.beautifyAccidentalValue(this.noteObject.acc)
    },
    noteClass() {
      if (this.parametersStore.note === this.noteFullName) return 'note-root';
      if (this.parametersStore.showTriads) {
        if (this.parametersStore.chordNotes.third === this.noteFullName) return 'note-third';
        if (this.parametersStore.chordNotes.fifth === this.noteFullName) return 'note-fifth';
      }
      return '';
    },
  },
  methods: {
    beautifyAccidentalValue(accidental) {
      if (accidental === 'b') return '♭';
      if (accidental === 'bb') return '♭♭';
      if (accidental === undefined) return '';
      return accidental;
    },
  },
  setup() {
    const parametersStore = useParametersStore();

    return { parametersStore }
  }
}
</script>

<style scoped lang="scss">
.fret-wrapper {
  border-right: 2px theme('colors.white-light') solid;

  &:not(:first-child):before {
    position: absolute;
    content: " ";
    height: 50%;
    width: 100%;
    top: 0;
    z-index: 4;
    border-bottom: 1px solid theme('colors.white');
  }

  .note-wrapper {
    .note {
      color: theme('colors.white-light');
      background: theme('colors.black');
      z-index: 5;

      &-root {
        background: theme('colors.blue');
      }

      &-third {
        background: theme('colors.persian-orange');
      }

      &-fifth {
        background: theme('colors.orange');
      }

      &-octave {
        font-size: 0.75rem;
      }
    }
  }
}
</style>