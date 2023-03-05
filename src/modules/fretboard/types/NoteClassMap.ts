import type { Note } from "@tonaljs/tonal";

export type NoteClassMap = {
  note: typeof Note;
  intervals: string | null;
  class: string;
}