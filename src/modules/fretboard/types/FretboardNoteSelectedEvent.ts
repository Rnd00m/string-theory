import type { Note } from "@tonaljs/tonal";

export type FretboardNoteSelectedEvent = {
  key: string; // Key of fret on fretboard example : "string-N-fret-N"
  string: number; // Position of the string on the fretboard
  fret: number; // Position of the fret on the string
  note: typeof Note; // The selected note on the fretboard
}