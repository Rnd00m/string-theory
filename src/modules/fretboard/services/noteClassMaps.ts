import { Chord, Interval, Note, Scale } from "@tonaljs/tonal";
import { getIntervalStringName } from "@/commons/helpers/intervals";
import { getChordNotes } from "@/commons/helpers/chords";
import { getScaleNotes } from "@/commons/helpers/scales";

const chordNoteClassPrefix = "note-chord-";
const scaleNoteClassPrefix = "note-scale-";

/**
 * Retrieve the class for a note in the class map
 *
 * @param note
 * @param noteClassMap
 */
function getNoteClass(note: Note, noteClassMap: NoteClassMap[]): string | null{
  const mappedClass = noteClassMap.find((map) => map.note.pc === note.pc);

  if (mappedClass === undefined) {
    return null;
  }

  return mappedClass.class;
}

/**
 * Determine whether the object passed in parameter is type Chord or other (Scale)
 *
 * @param object
 */
function isChordType(object: any): boolean {
  return object.quality !== undefined;
}

/**
 * Build the class map for a chord or a scale
 *
 * @param subject
 * @param showRootNoteBackground
 * @param showOtherNotesBackground
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