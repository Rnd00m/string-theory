declare type NotePosition = {
  key: string;
  string: number;
  fret: number;
};

declare type NoteRange = {
  lowerNote: Note; // Note should include its octave for example "E2", "G4", etc.
  higherNote: Note; // Note should include its octave for example "E2", "G4", etc.
};
