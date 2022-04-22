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
      // If chord notes contains double sharp notes, we need to change fretboard to display them
      if (this.displayType === "chord") {
        if (this.chord.tonic.includes("#")) {
          for (let i = 0; i < this.chord.notes.length; i++) {
            let chordSimplifiedNote = Note.simplify(this.chord.notes[i]);

            // Return double sharped note to the same octave
            if (chordSimplifiedNote === note.pc) {
              return Note.get(`${this.chord.notes[i]}${note.oct}`);
            }
          }
        }

        // Show flat note only if it presents in selected chord
        if (note.pc.includes("b") && !this.chord.notes.includes(note.pc)) {
          return Note.get(Note.enharmonic(note.name));
        }
      } else {
        // If scale contains flat or sharp we display this note instead
        let scaleNotes = Scale.get(`${this.note} ${this.scale.name}`).notes;
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
    scalesNotes(state) {
      let scaleNotes = Scale.get(`${state.note} ${state.scale.name}`).notes;

      return {
        root: this.getTriadNote(scaleNotes[0]),
        second: this.getTriadNote(scaleNotes[1]),
        third: this.getTriadNote(scaleNotes[2]),
        fourth: this.getTriadNote(scaleNotes[3]),
        fifth: this.getTriadNote(scaleNotes[4]),
        sixth: this.getTriadNote(scaleNotes[5]),
        seventh: this.getTriadNote(scaleNotes[6]),
      };
    },
    strings(state) {
      return state.fretboard.baseNotes.map((note) => {
        return this.getStringNotesFromStartNote(note);
      });
    },
  },
});
