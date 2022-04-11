import {defineStore} from 'pinia'
import { Note, Chord } from "@tonaljs/tonal";

export const useParametersStore = defineStore('parameters', {
  state: () => {
    return {
      note: 'C',
      chord: Chord.get('Cmaj7'),
      showOctave: false,
      showTriads: false,
    }
  },
  actions: {
    setNote(note) {
      this.note = note;
      this.chord = Chord.get(`${this.note}maj7`);
    },
  },
  getters: {
    chordNotes(state) {
      return {
        root: state.chord.notes[0],
        third: state.chord.notes[1],
        fifth: state.chord.notes[2],
        seventh: state.chord.notes[3],
      }
    },
  }
})