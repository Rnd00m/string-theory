import { Interval, Note } from "@tonaljs/tonal";

function getTransposedNote(
  note: Note,
  interval: Interval
): Note {
  return Note.get(Note.simplify(Note.transpose(note, interval)));
}

export { getTransposedNote };