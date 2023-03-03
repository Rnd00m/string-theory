<template>
  <div class="strings-wrapper">
    <div
      class="grid lg:grid-cols-[repeat(13,_4.5rem)] grid-cols-[repeat(13,_3.5rem)]"
    >
      <FretboardNote
        v-for="note in stringNotes"
        :key="note"
        :note="note"
        :sampler="sampler"
      ></FretboardNote>
    </div>
  </div>
</template>

<script>
import FretboardNote from "./FretboardNote.vue";
import { ref } from "vue";
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";
import * as Tone from "tone";
import { Note, Scale } from "@tonaljs/tonal";
import { DisplayTypeEnum } from "@/scripts/enums/DisplayTypeEnum";

export default {
  name: "FretboardString",
  components: { FretboardNote },
  setup() {
    const fretboardParametersStore = useFretboardParametersStore();

    const selectedNote = ref(null);

    return { fretboardParametersStore, selectedNote };
  },
  props: {
    sampler: {
      type: Tone.Sampler,
      required: true,
    },
    baseNote: {
      type: Object,
      required: true,
    },
    stringLength: {
      type: Number,
      required: true,
    },
  },
  computed: {
    stringNotes() {
      let stringNotes = [];
      let currentNote = this.baseNote;
      stringNotes.push(currentNote);

      for (let i = 0; i < this.stringLength; i++) {
        let newNote = Note.get(
          Note.simplify(
            Note.transpose(currentNote, "2m")
          )
        );

        // Change fretboard display according to the chord or scale parameters selected
        newNote = this.getNoteToDisplayFromSelectedParameters(newNote);

        stringNotes.push(newNote);
        currentNote = newNote;
      }

      return stringNotes;
    },
  },
  methods: {
    getNoteToDisplayFromSelectedParameters(note) {
      // If chord notes contains double sharp notes, we need to change fretboard to display them
      if (this.fretboardParametersStore.displayType === DisplayTypeEnum.Chord) {
        if (this.fretboardParametersStore.chord.tonic.includes("#")) {
          for (let i = 0; i < this.fretboardParametersStore.chord.notes.length; i++) {
            let chordSimplifiedNote = Note.simplify(this.fretboardParametersStore.chord.notes[i]);

            // Return double sharped note to the same octave
            if (chordSimplifiedNote === note.pc) {
              return Note.get(`${this.fretboardParametersStore.chord.notes[i]}${note.oct}`);
            }
          }
        }

        // Show flat note only if it presents in selected chord
        if (note.pc.includes("b") && !this.fretboardParametersStore.chord.notes.includes(note.pc)) {
          return Note.get(Note.enharmonic(note.name));
        }
      } else {
        // If scale contains flat or sharp we display this note instead
        let scaleNotes = Scale.get(`${this.fretboardParametersStore.note} ${this.fretboardParametersStore.scale.name}`).notes;
        let noteEnharmonic = Note.enharmonic(note.pc);

        if (scaleNotes.includes(note.pc)) {
          return note;
        }

        if (scaleNotes.includes(noteEnharmonic)) {
          return Note.get(`${noteEnharmonic}${note.oct}`);
        }
      }

      return note;
    },
  }
};
</script>

<style scoped lang="scss"></style>