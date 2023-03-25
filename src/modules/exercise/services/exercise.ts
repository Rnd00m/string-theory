import { Note, Scale } from "@tonaljs/tonal";
import type { NotePosition } from "@/modules/exercise/types/NotePosition";
import { getFretboardNoteKey } from "@/modules/fretboard/services/fretboard";
import type { FretboardNote } from "@/modules/fretboard/types/fretboard";

function getRandomNote(): typeof Note {
  const chromaticScale: string[] = Scale.get("C chromatic").notes;
  const randomNote = Math.floor(Math.random() * chromaticScale.length);

  return Note.get(chromaticScale[randomNote]);
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