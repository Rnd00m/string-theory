import {Note} from "@tonaljs/tonal";
import {getNoteClass} from "@/modules/fretboard/services/noteClassMaps";
import {DisplayVariationType} from "@/modules/fretboard/enums/DisplayVariationType";
import type {FretboardNote, NoteClassMap} from "../types/fretboard";

/**
 * Generate the unique key for a note on the fretboard
 *
 * @param string
 * @param fret
 */
function getFretboardNoteKey(string: number, fret: number): string {
  return `string-${string}-fret-${fret}`;
}

/**
 * Generate a two-dimensional array containing all the FretboardNote to build the fretboard
 *
 * @param baseNotes
 * @param stringLength
 * @param noteClassMap
 * @param displayVariationType
 */
function getFretboardNotes(
  baseNotes: typeof Note[],
  stringLength: number,
  noteClassMap?: NoteClassMap[],
  displayVariationType?: DisplayVariationType
): FretboardNote[][] {
  const fretboardNote: FretboardNote[][] = [];

  if (noteClassMap === undefined) noteClassMap = [] as NoteClassMap[];

  if (displayVariationType === undefined) displayVariationType = DisplayVariationType.Sharp

  baseNotes.forEach((baseNote: typeof Note, stringNumber: number) => {
    fretboardNote.push(getStringNotes(baseNote, stringLength, stringNumber, noteClassMap, displayVariationType));
  });

  return fretboardNote;
}

/**
 * Generate an array containing all the FretboardNote to build a string on the fretboard
 *
 * @param baseNote
 * @param stringLength
 * @param stringNumber
 * @param noteClassMap
 * @param displayVariationType
 */
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

/**
 * Bind all classes associated to a note from class map
 *
 * @param note
 * @param classMap
 */
function getNoteClassesFromClassMap(note: typeof Note, classMap: NoteClassMap[]): string[] {
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
 *
 * @param note
 * @param displayVariationType
 */
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

/**
 * Determine whether the fretboard should contain only # notes or only b notes
 * By default return sharp display
 *
 * @param notes
 */
function getDisplayVariationTypeToUse(
  notes: typeof Note[] | typeof Note
): DisplayVariationType {
  if (!Array.isArray(notes)) {
    return getNoteVariation(notes) === DisplayVariationType.Flat ? DisplayVariationType.Flat : DisplayVariationType.Sharp;
  }

  let currentNoteVariation: DisplayVariationType = DisplayVariationType.Sharp;

  notes.some((note) => {
    currentNoteVariation = getNoteVariation(note);

    if (
      currentNoteVariation === DisplayVariationType.Sharp ||
      currentNoteVariation === DisplayVariationType.Flat
    )
      return false;
  });

  return currentNoteVariation;
}

function getNoteVariation(note: typeof Note): DisplayVariationType {
  if (note.alt === 1) {
    return DisplayVariationType.Sharp;
  } else if (note.alt === -1) {
    return DisplayVariationType.Flat;
  }
  return DisplayVariationType.None;
}

export {
  getFretboardNotes,
  getFretboardNoteKey,
  getDisplayVariationTypeToUse,
};