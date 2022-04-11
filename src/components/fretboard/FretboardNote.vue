<template>
  <div class="fret-wrapper">
    <div class="note-wrapper text-center py-2 px-4">
      <div
        class="note rounded-lg text-center text-lg"
        :class="noteClass">
        <span>{{ noteFullName }}</span><span class="note-octave" v-if="showOctave">{{ noteObject.oct }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Note, Chord } from '@tonaljs/tonal'
import { mapState } from 'pinia'
import { useParametersStore } from "@/stores/parameters";

export default {
  name: "FretboardNote",
  data() {
    return {
      selectedNote: null,
      selectedChord: null,
      showOctave: false,
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
      if (this.selectedNote === this.noteFullName) return 'note-root';
      if (this.showTriads) {
        if (this.store.chordNotes.third === this.noteFullName) return 'note-third';
        if (this.store.chordNotes.fifth === this.noteFullName) return 'note-fifth';
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
    const store = useParametersStore();

    return { store }
  },
  created() {
    this.emitter.on('selected-note-changed', note => {
      this.selectedNote = note;
      // TODO : add chord as a FretboardSetting
      this.selectedChord = Chord.get(`${this.selectedNote}maj7`);
    });

    this.emitter.on('show-octave-changed', showOctave => {
      this.showOctave = showOctave;
    });

    this.emitter.on('show-triads-changed', showTriads => {
      this.showTriads = showTriads;
    });
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