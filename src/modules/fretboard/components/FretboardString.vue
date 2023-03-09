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
        :note-class-map="props.noteClassMap"
        :show-note-background="props.showNoteBackground"
        :is-note-selected="true"
      ></FretboardNote>
    </div>
  </div>
</template>

<script setup lang="ts">
import FretboardNote from "./FretboardNote.vue";
import { computed, ref } from "vue";
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";
import * as Tone from "tone";
import { Note, Scale } from "@tonaljs/tonal";
import { DisplayTypeEnum } from "@/scripts/enums/DisplayTypeEnum";
import type { NoteClassMap } from "@/modules/fretboard/types/NoteClassMap";

interface Props {
  sampler: Tone.Sampler;
  baseNote: typeof Note;
  stringLength: number;
  noteClassMap?: NoteClassMap[];
  showNoteBackground?: boolean;
}
const props = defineProps<Props>();

const fretboardParametersStore = useFretboardParametersStore();

const stringNotes = computed(() => {
  let stringNotes = [];
  let currentNote = props.baseNote;
  stringNotes.push(currentNote);

  for (let i = 0; i < props.stringLength; i++) {
    let newNote = Note.get(
        Note.simplify(
            Note.transpose(currentNote, "2m")
        )
    );

    // Change fretboard display according to the chord or scale parameters selected
    newNote = getNoteToDisplayFromSelectedParameters(newNote);

    stringNotes.push(newNote);
    currentNote = newNote;
  }

  return stringNotes;
});

function getNoteToDisplayFromSelectedParameters(note) {
  // If chord notes contains double sharp notes, we need to change fretboard to display them
  if (fretboardParametersStore.displayType === DisplayTypeEnum.Chord) {
    if (fretboardParametersStore.chord.tonic.includes("#")) {
      for (let i = 0; i < fretboardParametersStore.chord.notes.length; i++) {
        let chordSimplifiedNote = Note.simplify(fretboardParametersStore.chord.notes[i]);

        // Return double sharped note to the same octave
        if (chordSimplifiedNote === note.pc) {
          return Note.get(`${fretboardParametersStore.chord.notes[i]}${note.oct}`);
        }
      }
    }

    // Show flat note only if it presents in selected chord
    if (note.pc.includes("b") && !fretboardParametersStore.chord.notes.includes(note.pc)) {
      return Note.get(Note.enharmonic(note.name));
    }
  } else {
    // If scale contains flat or sharp we display this note instead
    let scaleNotes = Scale.get(`${fretboardParametersStore.note} ${fretboardParametersStore.scale.name}`).notes;
    let noteEnharmonic = Note.enharmonic(note.pc);

    if (scaleNotes.includes(note.pc)) {
      return note;
    }

    if (scaleNotes.includes(noteEnharmonic)) {
      return Note.get(`${noteEnharmonic}${note.oct}`);
    }
  }

  return note;
}
</script>

<style scoped lang="scss"></style>