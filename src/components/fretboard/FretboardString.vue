<template>
  <div class="strings-wrapper">
    <div class="string">
      <FretboardNote
        v-for="note in string"
        :key="note"
        :note="note"
      ></FretboardNote>
    </div>
  </div>
</template>

<script>
import { useTuningStore } from "@/stores/tuning";
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

        // if note contains a ♭ get the enharmonic with # instead
        if (newNote.includes('b')) newNote = Note.enharmonic(newNote);

        stringNotes.push(newNote);
        currentNote = newNote;
      }

      return stringNotes;
    }
  },
  setup() {
    const tuningStore = useTuningStore();

    return { tuningStore }
  },
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