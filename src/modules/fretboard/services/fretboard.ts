import {Note, Scale} from "@tonaljs/tonal";
import type { FretboardNote } from "@/modules/fretboard/types/FretboardNote";
import type { NoteClassMap } from "@/modules/fretboard/types/NoteClassMap";
import { getNoteClass } from "@/modules/fretboard/services/noteClassMaps";
import { DisplayVariationType } from "@/modules/fretboard/enums/DisplayVariationType";

function getFretboardNoteKey(string: number, fret: number): string {
  return `string-${string}-fret-${fret}`;
}

function getFretboardNotes(
  baseNotes: typeof Note[],
  stringLength: number,
  noteClassMap?: NoteClassMap[],
  displayVariationType?: DisplayVariationType | DisplayVariationType.Sharp
): FretboardNote[][] {
  const fretboardNote: FretboardNote[][] = [];

  if (noteClassMap === undefined) noteClassMap = [] as NoteClassMap[];

  baseNotes.forEach((baseNote: typeof Note, stringNumber: number) => {
    fretboardNote.push(getStringNotes(baseNote, stringLength, stringNumber, noteClassMap, displayVariationType));
  });

  return fretboardNote;
}

function getNoteClassesFromClassMap(note: typeof Note, classMap: NoteClassMap[]): string[] {
  const noteClasses: string[] = [];

  if (classMap !== undefined) {
    const noteClass: string | null = getNoteClass(note, classMap);

    if (noteClass !== null) noteClasses.push(noteClass);
  }

  return noteClasses;
}

function getStringNotes(
  baseNote: typeof Note,
  stringLength: number,
  stringNumber: number,
  noteClassMap: NoteClassMap[],
  displayVariationType?: DisplayVariationType | DisplayVariationType.Sharp
): FretboardNote[] {
  const stringNotes: FretboardNote[] = [];
  let currentNote: typeof Note = baseNote;
  stringNotes.push({
    key: getFretboardNoteKey(stringNumber, 0),
    string: stringNumber,
    fret: 0,
    note: getNoteToDisplay(currentNote, displayVariationType),
    isDisplayed: true,
    classes: getNoteClassesFromClassMap(currentNote, noteClassMap),
  });

  for (let fretNumber = 1; fretNumber <= stringLength; fretNumber++) {
    let newNote: typeof Note = Note.get(
      Note.simplify(
        Note.transpose(currentNote, "2m")
      )
    );

    // Change fretboard display according to the chord or scale parameters selected
    newNote = getNoteToDisplay(newNote, displayVariationType);

    stringNotes.push({
      key: getFretboardNoteKey(stringNumber, fretNumber),
      string: stringNumber,
      fret: fretNumber,
      note: newNote,
      isDisplayed: true,
      classes: getNoteClassesFromClassMap(newNote, noteClassMap),
    });
    currentNote = newNote;
  }

  return stringNotes;
}

function getNoteToDisplay(
  note: typeof Note,
  displayVariationType?: DisplayVariationType
): typeof Note {
  switch (displayVariationType) {
    case DisplayVariationType.Flat:
      return note;
    case DisplayVariationType.Sharp:
    default:
      return Note.get(Note.enharmonic(note));
  }
}

function getDisplayVariationTypeToUse(notes: typeof Note[]): DisplayVariationType | null {
  let displayVariationType: DisplayVariationType | null = null;

  notes.some((note) => {
    if (note.acc === "#") {
      displayVariationType = DisplayVariationType.Sharp;
      return true;
    } else if (note.acc === "b") {
      displayVariationType = DisplayVariationType.Flat;
      return true;
    }
    return false;
  });

  return displayVariationType;
}

export {
  getFretboardNotes,
  getFretboardNoteKey,
  getDisplayVariationTypeToUse,
};