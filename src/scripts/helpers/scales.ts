import { Note, Scale} from "@tonaljs/tonal";

/**
 * Return a Scale from a rootNote and a scale name
 *
 * @param rootNote
 * @param scaleName
 */
function getScale(
  rootNote: typeof Note,
  scaleName: string
): typeof Scale {
  return Scale.get(`${rootNote.pc} ${scaleName}`);
}

/**
 * Use this method to get the array of note of the scale
 * Do not use Scale.notes method to avoid "##" or "bb" notes
 *
 * @param scale
 */
function getScaleNotes(scale: typeof Scale): typeof Note[] {
  return scale.notes.map((note: string) => Note.get(Note.simplify(note)));
}

export { getScale, getScaleNotes };