<template>
  <div class="fret-wrapper">
    <div class="note-wrapper text-center py-2 px-4">
      <div
        class="note rounded-lg text-center text-lg"
        :class="[selectedNote === noteFullName ? 'note-selected text-white' : '']">
        <span>{{ noteFullName }}</span><span class="note-octave" v-if="showOctave">{{ noteObject.oct }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Note } from '@tonaljs/tonal'

export default {
  name: "FretboardNote",
  props: {
    note: {
      type: String,
      required: true
    },
    selectedNote: {
      type: String
    },
    showOctave: {
      type: Boolean
    }
  },
  computed: {
    noteObject() {
      return Note.get(this.note)
    },
    noteFullName() {
      return this.noteObject.letter + this.beautifyAccidentalValue(this.noteObject.acc)
    }
  },
  methods: {
    beautifyAccidentalValue(accidental) {
      if (accidental === 'b') return '♭';
      if (accidental === 'bb') return '♭♭';
      if (accidental === undefined) return '';
      return accidental;
    }
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
      background: theme('colors.black');
      z-index: 5;

      &-selected {
        background: theme('colors.blue');
      }

      &-octave {
        font-size: 0.75rem;
      }
    }
  }
}
</style>