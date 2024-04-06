import { getChordNotes } from "@/utils/helpers/chords";
import { getIntervalStringName } from "@/utils/helpers/intervals";
import { getScaleNotes } from "@/utils/helpers/scales";
import { Interval, Note, type NoNote } from "@tonaljs/tonal";
import type { NoteClassMap } from "../types/fretboard";

const chordNoteClassPrefix = "note-chord-";
const scaleNoteClassPrefix = "note-scale-";

/**
 * Retrieve the class for a note in the class map
 */
function getNoteClass(
  note: Note | NoNote,
  noteClassMap: NoteClassMap[]
): string | null {
  const mappedClass = noteClassMap.find((map) => map.note.pc === note.pc);

  if (mappedClass === undefined) {
    return null;
  }

  return mappedClass.class;
}

/**
 * Determine whether the object passed in parameter is type Chord or other (Scale)
 */
function isChordType(object: any): boolean {
  return object.quality !== undefined;
}

/**
 * Build the class map for a chord or a scale
 */
function getClassMap(
  subject: Chord | Scale,
  showRootNoteBackground: boolean,
  showOtherNotesBackground: boolean
): NoteClassMap[] {
  const classMap: NoteClassMap[] = [];

  if (!showRootNoteBackground && !showOtherNotesBackground) return classMap;

  let subjectNotes: string[] = [];
  if (isChordType(subject)) {
    subjectNotes = getChordNotes(subject);
  } else {
    subjectNotes = getScaleNotes(subject);
  }
  const subjectIntervals: string[] = subject.intervals;

  subjectIntervals.forEach((interval: string, index: number) => {
    const intervalNumber: number | undefined = Interval.num(interval);

    if (
      (showRootNoteBackground && intervalNumber === 1) ||
      (showOtherNotesBackground && intervalNumber !== 1)
    ) {
      const classPrefix: string = isChordType(subject)
        ? chordNoteClassPrefix
        : scaleNoteClassPrefix;

      classMap.push({
        note: Note.get(subjectNotes[index]),
        class: classPrefix + getIntervalStringName(interval),
        interval: Interval.get(interval),
      });
    }
  });
  return classMap;
}

export { getClassMap, getNoteClass };
