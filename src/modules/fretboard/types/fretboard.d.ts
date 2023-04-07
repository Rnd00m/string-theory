declare type FretboardNote = {
  key: string; // Key of fret find on fretboard example : "string-N-fret-N"
  string: number; // Position of the string on the fretboard
  fret: number; // Position of the fret on the string
  note: Note; // The note to display on the fretboard
  isDisplayed: boolean; // Whether the note if displayed on the fretboard or not
  classes: string[]; // Class associated to the note to display on the fretboard
  intervals?: string | null; // In case of Scale or Chord usage we may want to specify interval with root note
};

declare type FretboardNoteSelectedEvent = {
  key: string; // Key of fret on fretboard example : "string-N-fret-N"
  string: number; // Position of the string on the fretboard
  fret: number; // Position of the fret on the string
  note: Note; // The selected note on the fretboard
};

declare type NoteClassMap = {
  note: Note; // The note concerned by the class mapping
  class: string; // Class associated to the note to display on the fretboard
  interval?: Interval | null; // In case of Scale or Chord usage we may want to specify interval with root note
};