import { Note } from "@tonaljs/tonal";
import { getNoteClass } from "@/modules/fretboard/services/noteClassMaps";
import { DisplayVariationType } from "@/modules/fretboard/enums/DisplayVariationType";
import type {
  FretboardNote,
  NoteClassMap,
} from "@/modules/fretboard/types/fretboard";

/**
 * Generate the unique key for a note on the fretboard
 */
function getFretboardNoteKey(string: number, fret: number): string {
  return `string-${string}-fret-${fret}`;
}

/**
 * Generate a two-dimensional array containing all the FretboardNote to build the fretboard
 */
function getFretboardNotes(
  baseNotes: Note[],
  stringLength: number,
  noteClassMap: NoteClassMap[] = [],
  displayVariationType: DisplayVariationType = DisplayVariationType.Sharp,
  displayNote: boolean
): FretboardNote[][] {
  const fretboardNote: FretboardNote[][] = [];

  baseNotes.forEach((baseNote: Note, stringNumber: number) => {
    fretboardNote.push(
      getStringNotes(
        baseNote,
        stringLength,
        stringNumber,
        noteClassMap,
        displayVariationType,
        displayNote
      )
    );
  });

  return fretboardNote;
}

/**
 * Generate an array containing all the FretboardNote to build a string on the fretboard
 */
function getStringNotes(
  baseNote: Note,
  stringLength: number,
  stringNumber: number,
  noteClassMap: NoteClassMap[],
  displayVariationType: DisplayVariationType,
  displayNote: boolean
): FretboardNote[] {
  const stringNotes: FretboardNote[] = [];
  let currentNote: Note = baseNote;
  stringNotes.push({
    key: getFretboardNoteKey(stringNumber, 0),
    string: stringNumber,
    fret: 0,
    note: getNoteToDisplay(currentNote, displayVariationType),
    isDisplayed: displayNote,
    classes: getNoteClassesFromClassMap(currentNote, noteClassMap),
  });

  for (let fretNumber = 1; fretNumber <= stringLength; fretNumber++) {
    let newNote: Note = Note.get(
      Note.simplify(Note.transpose(currentNote, "2m"))
    );

    // Change fretboard display according to the chord or scale parameters selected
    newNote = getNoteToDisplay(newNote, displayVariationType);

    stringNotes.push({
      key: getFretboardNoteKey(stringNumber, fretNumber),
      string: stringNumber,
      fret: fretNumber,
      note: newNote,
      isDisplayed: displayNote,
      classes: getNoteClassesFromClassMap(newNote, noteClassMap),
    });
    currentNote = newNote;
  }

  return stringNotes;
}

/**
 * Bind all classes associated to a note from class map
 */
function getNoteClassesFromClassMap(
  note: Note,
  classMap: NoteClassMap[]
): string[] {
  const noteClasses: string[] = [];

  if (classMap !== undefined) {
    const noteClass: string | null = getNoteClass(note, classMap);

    if (noteClass !== null) noteClasses.push(noteClass);
  }

  return noteClasses;
}

/**
 * Get note to display on the fretboard depending on whether the display type is sharp or flat
 * The returned note is cleaned-up from "##"
 * It allows fretboard to contain only # or only b notes
 */
function getNoteToDisplay(
  note: Note,
  displayVariationType?: DisplayVariationType
): Note {
  switch (displayVariationType) {
    case DisplayVariationType.Flat:
      return note;
    case DisplayVariationType.Sharp:
    default:
      return Note.get(Note.enharmonic(note));
  }
}

/**
 * Determine whether the fretboard should contain only # notes or only b notes
 * By default return sharp display
 */
function getDisplayVariationTypeToUse(
  notes: Note[] | Note
): DisplayVariationType {
  if (!Array.isArray(notes)) {
    return getNoteVariation(notes) === DisplayVariationType.Flat
      ? DisplayVariationType.Flat
      : DisplayVariationType.Sharp;
  }

  let currentNoteVariation: DisplayVariationType = DisplayVariationType.Sharp;

  notes.some((note) => {
    currentNoteVariation = getNoteVariation(note);

    // If a note is sharp or flat just break the iteration to return variation
    if (
      currentNoteVariation === DisplayVariationType.Sharp ||
      currentNoteVariation === DisplayVariationType.Flat
    ) {
      return true;
    }
  });

  return currentNoteVariation;
}

function getNoteVariation(note: Note): DisplayVariationType {
  if (note.alt === 1) {
    return DisplayVariationType.Sharp;
  } else if (note.alt === -1) {
    return DisplayVariationType.Flat;
  }
  return DisplayVariationType.None;
}

export { getFretboardNotes, getFretboardNoteKey, getDisplayVariationTypeToUse };
