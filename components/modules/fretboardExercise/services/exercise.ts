import { Interval, Note, Scale } from "@tonaljs/tonal";
import { getFretboardNoteKey } from "@/components/modules/fretboard/services/fretboard";
import { getRandomInt } from "@/utils/helpers/utils";
import type {
  NotePosition,
  NoteRange,
} from "@/components/modules/fretboardExercise/types/fretboardExercise";
import type { FretboardNote } from "@/components/modules/fretboard/types/fretboard";

/**
 * Get a random note from chromatic scale if no range specified
 * Else get a random note between lower and higher note of the note range
 * Note from NoteRange should include their octave (for example: "E4", "G2", etc.)
 */
function getRandomNote(noteRange?: NoteRange): Note {
  let notesArray: string[] = [];

  if (noteRange === undefined) {
    notesArray = Scale.get("C chromatic").notes;
  } else {
    notesArray = getNotesInRange(noteRange);
  }

  const randomNoteIndex = getRandomInt(0, notesArray.length);

  return Note.get(notesArray[randomNoteIndex]);
}

function getRandomInterval(): Interval {
  return Interval.get(Interval.fromSemitones(getRandomInt(0, 24)));
}

function getNotesInRange(noteRange: NoteRange): string[] {
  const notesArray: string[] = [];
  let currentNote: string = noteRange.lowerNote.name;
  notesArray.push(currentNote);

  do {
    currentNote = Note.enharmonic(Note.transpose(Note.get(currentNote), "2m"));
    notesArray.push(currentNote);
  } while (currentNote !== noteRange.higherNote.name);

  return notesArray;
}

function getPositionOfNoteToFindOnFretboard(
  fretboardNotes: FretboardNote[][],
  notesToFind: Note[],
  isRestrictedToOctave: boolean
): NotePosition[] {
  const notePositions: NotePosition[] = [];

  fretboardNotes.forEach((string: FretboardNote[], stringNumber: number) => {
    string.forEach((fret: FretboardNote, fretNumber: number) => {
      if (
        areNotesMatchingFretboardNote(notesToFind, fret, isRestrictedToOctave)
      ) {
        notePositions.push({
          key: getFretboardNoteKey(stringNumber, fretNumber),
          string: stringNumber,
          fret: fretNumber,
        });
      }
    });
  });

  return notePositions;
}

function areNotesMatchingFretboardNote(
  notesToFind: Note[],
  fretboardNote: FretboardNote,
  isRestrictedToOctave: boolean
): boolean {
  if (isRestrictedToOctave) {
    if (
      notesToFind.findIndex(
        (noteToFind) => noteToFind.name === fretboardNote.note.name
      ) > -1
    ) {
      return true;
    }
    return false;
  }

  if (
    notesToFind.findIndex(
      (noteToFind) => noteToFind.pc === fretboardNote.note.pc
    ) > -1
  ) {
    return true;
  }
  return false;
}

export { getRandomNote, getRandomInterval, getPositionOfNoteToFindOnFretboard };
