import { Chord, Note } from "@tonaljs/tonal";
import type { ChordType } from "@/scripts/types/ChordType";

/**
 * Return a Chord from a rootNote and a ChordType
 *
 * @param rootNote
 * @param chordType
 */
function getChord(
  rootNote: typeof Note,
  chordType: ChordType
): typeof Chord {
  return Chord.get(`${rootNote.pc}${chordType}`);
}

/**
 * Use this method to get the array of note of the chord
 * Do not use Chord.notes method to avoid "##" or "bb" notes
 *
 * @param chord
 */
function getChordNotes(chord: typeof Chord): typeof Note[] {
  return chord.notes.map((note: string) => Note.get(Note.simplify(note)));
}

export { getChord, getChordNotes };