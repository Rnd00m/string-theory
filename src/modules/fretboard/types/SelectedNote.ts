import type { Note } from "@tonaljs/tonal";

export type SelectedNote = {
  key: string;
  string: number;
  fret: number;
  note: typeof Note;
}