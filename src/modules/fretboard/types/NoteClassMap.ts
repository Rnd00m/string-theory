import type { Note } from "@tonaljs/tonal";
import type { Interval } from "@tonaljs/tonal";

export type NoteClassMap = {
  note: typeof Note; // The note concerned by the class mapping
  class: string; // Class associated to the note to display on the fretboard
  interval?: typeof Interval | null; // In case of Scale or Chord usage we may want to specify interval with root note
}