import { Note, Scale } from "@tonaljs/tonal";
import type {
  NotePosition,
  NoteRange
} from "@/modules/fretboardExercise/types/fretboardExercise";
import { getFretboardNoteKey } from "@/modules/fretboard/services/fretboard";
import type { FretboardNote } from "@/modules/fretboard/types/fretboard";

/**
 * Get a random note from chromatic scale if no range specified
 * Else get a random note between lower and higher note of the note range
 * Note from NoteRange should include their octave (for example: "E4", "G2", etc.)
 *
 * @param noteRange
 */
function getRandomNote(noteRange?: NoteRange): typeof Note {
  let notesArray: string[] = [];

  if (noteRange === undefined) {
    notesArray = Scale.get("C chromatic").notes;
  } else {
    notesArray = getNotesInRange(noteRange);
  }

  const randomNote = Math.floor(Math.random() * notesArray.length);

  return Note.get(notesArray[randomNote]);
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
  noteToFind: typeof Note
): NotePosition[] {
  const notePositions: NotePosition[] = [];

  fretboardNotes.forEach((string: FretboardNote[], stringNumber: number) => {
    string.forEach((fret: FretboardNote, fretNumber: number) => {
      if (noteToFind.pc === fret.note.pc) {
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

export { getRandomNote, getPositionOfNoteToFindOnFretboard };