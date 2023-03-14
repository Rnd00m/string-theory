import { Note, Scale } from "@tonaljs/tonal";
import type { NotePosition } from "@/modules/exercise/types/NotePosition";
import { getNoteClassKey } from "@/modules/fretboard/services/noteClassMaps";

function getRandomNote(): typeof Note {
  const chromaticScale: string[] = Scale.get("C chromatic").notes;
  const randomNote = Math.floor(Math.random() * chromaticScale.length);

  return Note.get(chromaticScale[randomNote]);
}

function getPositionOfNoteOnFretboard(
  fretboardNotes: typeof Note[][],
  noteToFind: typeof Note
): NotePosition[] {
  const notePositions: NotePosition[] = [];

  fretboardNotes.forEach((string: typeof Note[], stringNumber: number) => {
    string.forEach((fret: typeof Note, fretNumber: number) => {
      if (noteToFind.pc === fret.pc) {
        notePositions.push({
          key: getNoteClassKey(stringNumber, fretNumber),
          string: stringNumber,
          fret: fretNumber
        });
      }
    })
  });

  return notePositions;
}

export { getRandomNote, getPositionOfNoteOnFretboard };