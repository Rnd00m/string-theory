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
import { Note } from '@tonaljs/tonal';

export default {
  name: "FretboardString",
  components: { FretboardNote },
  data() {
    return {
      selectedNote: null,
      showOctave: false
    }
  },
  props: {
    startNote: {
      type: String,
      required: true
    },
    stringLength: {
      type: Number,
      required: false,
      default: 12
    }
  },
  computed: {
    string() {
      let stringNotes = [];
      let currentNote = this.startNote;
      stringNotes.push(currentNote);

      for (let i = 0; i < this.stringLength; i++) {
        let newNote = Note.simplify(Note.transpose(currentNote, '2m'));
        stringNotes.push(newNote);
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
  }
}
</style>