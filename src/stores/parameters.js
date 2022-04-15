import {defineStore} from 'pinia'
import { Chord } from "@tonaljs/tonal";

export const useParametersStore = defineStore('parameters', {
  state: () => {
    return {
      note: 'C',
      chord: Chord.get('CM'),
      chordType: 'M',
      showOctave: false,
      showTriads: false,
      chordTypeList: [
        {
          name: 'Major',
          notation: 'M'
        },
        {
          name: 'Minor',
          notation: 'm'
        },
        {
          name: 'Major7',
          notation: 'M7'
        },
        {
          name: 'Minor7',
          notation: 'm7'
        },
        {
          name: '7',
          notation: '7'
        },
      ]
    }
  },
  actions: {
    setNote(note) {
      this.note = note;
      this.chord = Chord.get(this.note + this.chordType);
    },
    setChord(chordType) {
      this.chord = Chord.get(this.note + chordType);
    }
  },
  getters: {
    chordNotes(state) {
      return {
        root: state.chord.notes[0] || null,
        third: state.chord.notes[1] || null,
        fifth: state.chord.notes[2] || null,
        seventh: state.chord.notes[3] || null,
      }
    },
  }
})