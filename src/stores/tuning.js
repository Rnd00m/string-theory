import {defineStore} from 'pinia'
import { Note } from "@tonaljs/tonal";

export const useTuningStore = defineStore('tuning', {
  state: () => {
    return {
      notes: [
        Note.get('E4'),
        Note.get('B3'),
        Note.get('G3'),
        Note.get('D3'),
        Note.get('A2'),
        Note.get('E2')
      ],
    }
  },
  actions: {
    changeStringTuning(noteIndex, direction) {
      let interval = direction > 0 ? '' : '-';
      interval = `${interval}2m`;

      let newNote = Note.get(Note.simplify(Note.transpose(this.notes[noteIndex], interval)));
      this.notes.splice(noteIndex, 1, newNote);
    },
    changeGuitarTuning(direction) {
      for (let i = 0; i < this.notes.length; i++) {
        this.changeStringTuning(i, direction);
      }
    }
  },
})