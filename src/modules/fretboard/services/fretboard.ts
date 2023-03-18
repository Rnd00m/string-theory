import { Note, Scale } from "@tonaljs/tonal";
import { DisplayTypeEnum } from "@/scripts/enums/DisplayTypeEnum";
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";
import type { FretboardNote } from "@/modules/fretboard/types/FretboardNote";
import type { NoteClassMap } from "@/modules/fretboard/types/NoteClassMap";
import { getNoteClass } from "@/modules/fretboard/services/noteClassMaps";

const fretboardParametersStore = useFretboardParametersStore();

function getFretboardNoteKey(string: number, fret: number): string {
  return `string-${string}-fret-${fret}`;
}
function getFretboardNotes(
  baseNotes: typeof Note[],
  stringLength: number,
  noteClassMap?: NoteClassMap[]
): FretboardNote[][] {
  const fretboardNote: FretboardNote[][] = [];

  baseNotes.forEach((baseNote: typeof Note, stringNumber: number) => {
    fretboardNote.push(getStringNotes(baseNote, stringLength, stringNumber, noteClassMap));
  });

  return fretboardNote;
}

function getStringNotes(
  baseNote: typeof Note,
  stringLength: number,
  stringNumber: number,
  noteClassMap?: NoteClassMap[]
): FretboardNote[] {
  const stringNotes: FretboardNote[] = [];
  let currentNote: typeof Note = baseNote;
  stringNotes.push({
    key: getFretboardNoteKey(stringNumber, 0),
    string: stringNumber,
    fret: 0,
    note: currentNote,
    isDisplayed: true,
  });

  for (let fretNumber = 1; fretNumber <= stringLength; fretNumber++) {
    let newNote: typeof Note = Note.get(
      Note.simplify(
        Note.transpose(currentNote, "2m")
      )
    );

    // Change fretboard display according to the chord or scale parameters selected
    newNote = getNoteToDisplayFromSelectedParameters(newNote);

    const noteClasses: string[] = [];

    if (noteClassMap !== undefined) {
      const noteClass: string | null = getNoteClass(newNote, noteClassMap);

      if (noteClass !== null) noteClasses.push(noteClass);
    }

    stringNotes.push({
      key: getFretboardNoteKey(stringNumber, fretNumber),
      string: stringNumber,
      fret: fretNumber,
      note: newNote,
      isDisplayed: true,
      classes: noteClasses
    });
    currentNote = newNote;
  }

  return stringNotes;
}

function getNoteToDisplayFromSelectedParameters(note: typeof Note): typeof Note {
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

export {
  getFretboardNotes,
  getNoteToDisplayFromSelectedParameters,
  getFretboardNoteKey,
};