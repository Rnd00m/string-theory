<template>
  <div class="strings-wrapper">
    <div class="string" :class="'string-1'">
      <FretboardNote
        v-for="note in string"
        :key="note"
        :note="note"
        :selected-note="selectedNote"
        :show-octave="showOctave"
      ></FretboardNote>
    </div>
  </div>
</template>

<script>
import FretboardNote from "./FretboardNote.vue";
import { Scale, Note } from '@tonaljs/tonal';

export default {
  name: "FretboardString",
  components: {
    FretboardNote
  },
  data() {
    return {
      selectedNote: null,
      showOctave: false,
      stringLength: 12
    }
  },
  props: {
    startNote: {
      type: Object,
      required: true
    }
  },
  computed: {
    string() {
      let stringNotes = [];
      let currentNote = this.startNote;
      stringNotes.push(currentNote);

      for (let i = 0; i < this.stringLength; i++) {
        let newNote = Note.simplify(Note.transpose(currentNote, '2m'));
        stringNotes.push(newNote)
        currentNote = newNote;
      }

      return stringNotes;
    }
  },
  created() {
    this.emitter.on('selected-note-changed', note => {
      this.selectedNote = note;
    });

    this.emitter.on('show-octave-changed', showOctave => {
      this.showOctave = showOctave;
    });
  }
}
</script>

<style scoped lang="scss">
.strings-wrapper {
  .string {
    display: grid;
    grid-template-columns: repeat(13, 5em);

    &:before {
      position: absolute;
      content: " ";
      height: 50%;
      width: 100%;
      top: 0;
      z-index: 4;
    }
  }

  .string-1:before {
    border-bottom: 1px solid theme('colors.white');
  }

  .string-2:before {
    border-bottom: 2px solid theme('colors.white');
  }

  .string-3:before {
    border-bottom: 3px solid theme('colors.white');
  }

  .string-4:before {
    border-bottom: 4px solid theme('colors.white');
  }

  .string-5:before {
    border-bottom: 5px solid theme('colors.white');
  }

  .string-6:before {
    border-bottom: 6px solid theme('colors.white');
  }
}
</style>