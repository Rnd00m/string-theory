import { Note, Scale } from "@tonaljs/tonal";
import { DisplayTypeEnum } from "@/scripts/enums/DisplayTypeEnum";
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";

const fretboardParametersStore = useFretboardParametersStore();

function getFretboardNotes(
  baseNotes: typeof Note[],
  stringLength: number
): typeof Note[][] {
  const fretboardNote = [];

  baseNotes.forEach((baseNote) => {
    const stringNotes = [];
    let currentNote: typeof Note = baseNote;
    stringNotes.push(currentNote);

    for (let i = 0; i < stringLength; i++) {
      let newNote: typeof Note = Note.get(
        Note.simplify(
          Note.transpose(currentNote, "2m")
        )
      );

      // Change fretboard display according to the chord or scale parameters selected
      newNote = getNoteToDisplayFromSelectedParameters(newNote);

      stringNotes.push(newNote);
      currentNote = newNote;
    }

    fretboardNote.push(stringNotes);
  });

  return fretboardNote;
}

function getNoteToDisplayFromSelectedParameters(note: typeof Note): string {
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

export { getFretboardNotes, getNoteToDisplayFromSelectedParameters };