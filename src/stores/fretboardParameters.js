import { defineStore } from "pinia";
import { Chord, Note, Mode, Scale } from "@tonaljs/tonal";

export const useFretboardParametersStore = defineStore("fretboard-parameters", {
  state: () => {
    return {
      note: "C",
      displayType: "chord", // chord | scale
      chord: Chord.get("CM"),
      chordType: "M",
      scale: Mode.get("ionian"),
      showOctave: false,
      showTriads: false,
      chordTypeList: [
        {
          name: "Major",
          notation: "M",
        },
        {
          name: "Minor",
          notation: "m",
        },
        {
          name: "Major7",
          notation: "M7",
        },
        {
          name: "Minor7",
          notation: "m7",
        },
        {
          name: "7",
          notation: "7",
        },
      ],
      fretboard: {
        baseNotes: [
          Note.get("E4"),
          Note.get("B3"),
          Note.get("G3"),
          Note.get("D3"),
          Note.get("A2"),
          Note.get("E2"),
        ],
        stringLength: 12,
      },
    };
  },
  actions: {
    setNote(note) {
      this.note = note;
      this.chord = Chord.get(this.note + this.chordType);
    },
    setChord(chordType) {
      this.chordType = chordType;
      this.chord = Chord.get(this.note + chordType);
    },
    // Tuning
    changeStringTuning(noteIndex, direction) {
      let interval = direction > 0 ? "" : "-";
      interval = `${interval}2m`;

      let newNote = Note.get(
        Note.simplify(
          Note.transpose(this.fretboard.baseNotes[noteIndex], interval)
        )
      );
      this.fretboard.baseNotes.splice(noteIndex, 1, newNote);
    },
    changeGuitarTuning(direction) {
      for (let i = 0; i < this.fretboard.baseNotes.length; i++) {
        this.changeStringTuning(i, direction);
      }
    },
    // String
    getStringNotesFromStartNote(startNote) {
      let stringNotes = [];
      let currentNote = startNote;
      stringNotes.push(currentNote);

      for (let i = 0; i < this.fretboard.stringLength; i++) {
        let newNote = Note.get(
          Note.simplify(Note.transpose(currentNote, "2m"))
        );

        // Change fretboard display according to the chord or scale parameters selected
        newNote = this.getNoteToDisplayFromSelectedParameters(newNote);

        stringNotes.push(newNote);
        currentNote = newNote;
      }

      return stringNotes;
    },
    getNoteToDisplayFromSelectedParameters(note) {
      // Show flat note only if it presents in selected chord
      if (note.pc.includes("b") && !this.chord.notes.includes(note.pc))
        return Note.get(Note.enharmonic(note.name));

      // If chord notes contains double sharp notes, we need to change fretboard to display them
      if (this.chord.tonic.includes("#")) {
        for (let i = 0; i < this.chord.notes.length; i++) {
          let chordSimplifiedNote = Note.simplify(this.chord.notes[i]);

          // Return double sharped note to the same octave
          if (chordSimplifiedNote === note.pc)
            return Note.get(`${this.chord.notes[i]}${note.oct}`);
        }
      }

      return note;
    },
    // Notes
    getTriadNote(noteString) {
      if (noteString === undefined) return null;

      let note = Note.get(noteString);

      return note.name;
    },
  },
  getters: {
    chordNotes(state) {
      return {
        root: this.getTriadNote(state.chord.notes[0]),
        third: this.getTriadNote(state.chord.notes[1]),
        fifth: this.getTriadNote(state.chord.notes[2]),
        seventh: this.getTriadNote(state.chord.notes[3]),
      };
    },
    strings(state) {
      return state.fretboard.baseNotes.map((note) => {
        return this.getStringNotesFromStartNote(note);
      });
    },
  },
});
