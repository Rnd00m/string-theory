import { Interval, Note } from "@tonaljs/tonal";

function getTransposedNote(
  note: typeof Note,
  interval: typeof Interval
): typeof Note {
  return Note.get(Note.simplify(Note.transpose(note, interval)));
}

export { getTransposedNote };