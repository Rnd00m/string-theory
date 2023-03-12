import { Chord, Note, Scale } from "@tonaljs/tonal";
import type { NoteClassMap } from "@/modules/fretboard/types/NoteClassMap";
import { ChordIntervalsEnum } from "@/scripts/enums/ChordIntervalsEnum";
import { ScaleIntervalsEnum } from "@/scripts/enums/ScaleIntervalsEnum";

function getKey(string: number, fret: number): string {
  return `string-${string}-fret-${fret}`;
}

function getChordClassMap(
  fretboardNotes: typeof Note[][],
  chord: typeof Chord,
  showRootNoteBackground: boolean,
  showOtherNotesBackground: boolean
): NoteClassMap[] {
  const classMap: NoteClassMap[] = [];

  if (!showRootNoteBackground && !showOtherNotesBackground) return classMap;

  const chordIntervals: string[] = Object.values(ChordIntervalsEnum);
  const chordNotes: string[] = chord.notes;

  fretboardNotes.forEach((fretboardNote, stringNumber) => {
    fretboardNote.forEach((stringNote, fretNumber) => {
      const foundIndex = chordNotes.findIndex(chordNote => chordNote === stringNote.pc)
      if (foundIndex > -1) {
        const foundChordInterval: string = chordIntervals[foundIndex];

        if ((showRootNoteBackground && chordIntervals[foundIndex] === ChordIntervalsEnum.Root) || (showOtherNotesBackground && foundIndex > 0)) {
          classMap.push({
            key: getKey(stringNumber, fretNumber),
            string: stringNumber,
            fret: fretNumber,
            note: stringNote,
            intervals: foundChordInterval,
            class: `note-chord-${foundChordInterval}`,
          });
        }
      }
    });
  });

  return classMap;
}

function getScaleClassMap(
  fretboardNotes: typeof Note[][],
  scale: typeof Scale,
  rootNote: typeof Note,
  showRootNoteBackground: boolean,
  showOtherNotesBackground: boolean
): NoteClassMap[] {
  const classMap: NoteClassMap[] = [];

  if (!showRootNoteBackground && !showOtherNotesBackground) return classMap;

  const scaleIntervals: string[] = Object.values(ScaleIntervalsEnum);
  const scaleNotes = Scale.get(`${rootNote} ${scale.name}`).notes;

  fretboardNotes.forEach((fretboardNote, stringNumber) => {
    fretboardNote.forEach((stringNote, fretNumber) => {
      const foundIndex = scaleNotes.findIndex(scaleNote => scaleNote === stringNote.pc)
      // console.log(foundIndex)
      if (foundIndex > -1) {
        if ((showRootNoteBackground && scaleIntervals[foundIndex] === ScaleIntervalsEnum.Root) || (showOtherNotesBackground && foundIndex > 0)) {
          const foundScaleInterval: string = scaleIntervals[foundIndex];
          const scaleClass: string = foundIndex === 0 ? `note-scale-${foundScaleInterval}` : ('note-scale-' + (foundIndex % 2 === 0 ? 'secondary' : 'tertiary'))

          classMap.push({
            key: getKey(stringNumber, fretNumber),
            string: stringNumber,
            fret: fretNumber,
            note: stringNote,
            intervals: foundScaleInterval,
            class: scaleClass,
          });
        }
      }
    });
  });

  return classMap;
}

export { getChordClassMap, getScaleClassMap }