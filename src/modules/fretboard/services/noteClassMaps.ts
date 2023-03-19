import { Chord, Interval, Note, Scale } from "@tonaljs/tonal";
import type { NoteClassMap } from "@/modules/fretboard/types/NoteClassMap";
import { getIntervalStringName } from "@/scripts/helpers/intervals";
import { getChordNotes } from "@/scripts/helpers/chords";
import { getScaleNotes } from "@/scripts/helpers/scales";

const chordNoteClassPrefix: string = "note-chord-";
const scaleNoteClassPrefix: string = "note-scale-";

function getNoteClass(note: typeof Note, noteClassMap: NoteClassMap[]): string | null{
  const mappedClass = noteClassMap.find((map) => map.note.pc === note.pc);

  if (mappedClass === undefined) {
    return null;
  }

  return mappedClass.class;
}

function isChordType(object: any): boolean {
  return object.quality !== undefined;
}

function getClassMap(
  subject: typeof Chord | typeof Scale,
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
    const intervalNumber: number = Interval.num(interval);

    if ((showRootNoteBackground && intervalNumber === 1)
      || (showOtherNotesBackground && intervalNumber !== 1)
    ) {
      const classPrefix: string = isChordType(subject) ? chordNoteClassPrefix : scaleNoteClassPrefix;

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