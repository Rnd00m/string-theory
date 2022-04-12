import {defineStore} from 'pinia'
import { Note } from "@tonaljs/tonal";

export const useTuningStore = defineStore('tuning', {
  state: () => {
    return {
      notes: [
        Note.get('E4').name,
        Note.get('B3').name,
        Note.get('G3').name,
        Note.get('D3').name,
        Note.get('A2').name,
        Note.get('E2').name
      ],
    }
  },
  actions: {
    changeStringTuning(noteIndex, direction) {
      let interval = direction > 0 ? '' : '-';
      interval = `${interval}2m`;

      let newNote = Note.simplify(Note.transpose(this.notes[noteIndex], interval));
      this.notes.splice(noteIndex, 1, newNote);
    },
    changeGuitarTuning(direction) {
      for (let i = 0; i < this.notes.length; i++) {
        this.changeStringTuning(i, direction);
      }
    }
  },
})