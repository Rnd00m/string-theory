import type { Note } from "@tonaljs/tonal";

export type NoteClassMap = {
  key: string; // Key of fret to find on fretboard example : "string-N-fret-N"
  string: number; // Position of the string on the fretboard
  fret: number; // Position of the fret on the string
  note: typeof Note; // The note concerned by the class mapping
  class: string; // Class associated to the note to display on the fretboard
  intervals?: string | null; // In case of Scale or Chord usage we may want to specify interval with root note
}