export as namespace fretboardExercise;

export type NotePosition = {
  key: string;
  string: number;
  fret: number;
};

export type NoteRange = {
  lowerNote: typeof Note; // Note should include its octave for example "E2", "G4", etc.
  higherNote: typeof Note; // Note should include its octave for example "E2", "G4", etc.
};