<template>
  <div class="fret-wrapper py-2 px-4">
    <div class="note-wrapper text-center p-1">
      <div class="note rounded-lg text-center text-lg px-1 py-0"
       :class="[selectedNote === noteFullName ? 'note-selected text-white' : '']">
        <span>{{ noteFullName }}</span><span class="note-octave" v-if="showOctave">{{ note.octave() }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FretboardNote",
  props: {
    note: {
      type: Object,
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
    noteFullName() {
      return this.note.name().toString().toUpperCase()
        + this.beautifyAccidentalValue(this.note.accidental());
    }
  },
  methods: {
    beautifyAccidentalValue(accidental) {
      if (accidental === 'b') return '♭';
      if (accidental === 'bb') return '♭♭';
      return accidental;
    }
  }
}
</script>

<style scoped lang="scss">
.fret-wrapper {
  border-right: 2px theme('colors.white-light') solid;

  .note-wrapper {
    z-index: 5;
    background: theme('colors.black');

    .note {
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