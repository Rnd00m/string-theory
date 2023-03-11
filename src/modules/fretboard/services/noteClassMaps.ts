import { Chord, Note, Scale } from "@tonaljs/tonal";
import type { NoteClassMap } from "@/modules/fretboard/types/NoteClassMap";
import { ChordIntervalsEnum } from "@/scripts/enums/ChordIntervalsEnum";
import { ScaleIntervalsEnum } from "@/scripts/enums/ScaleIntervalsEnum";

function getChordClassMap(
  fretboardNotes: typeof Note[][],
  chord: typeof Chord
): NoteClassMap[] {
  const classMap: NoteClassMap[] = [];
  const chordIntervals: string[] = Object.values(ChordIntervalsEnum);
  const chordNotes: string[] = chord.notes;

  fretboardNotes.forEach((fretboardNote, stringNumber) => {
    fretboardNote.forEach((stringNote, fretNumber) => {
      const foundIndex = chordNotes.findIndex(chordNote => chordNote === stringNote.pc)
      if (foundIndex > -1) {
        const foundChordInterval: string = chordIntervals[foundIndex]
        classMap.push({
          key: `string-${stringNumber}-fret-${fretNumber}`,
          string: stringNumber,
          fret: fretNumber,
          note: stringNote,
          intervals: foundChordInterval,
          class: `note-chord-${foundChordInterval}`,
        });
      }
    });
  });

  return classMap;
}

function getScaleClassMap(rootNote: string, scale: typeof Scale): NoteClassMap[] {
  const classMap: NoteClassMap[] = [];
  const scaleNotes = Scale.get(`${rootNote} ${scale.name}`).notes;

  classMap.push({
    note: scaleNotes[0],
    intervals: ScaleIntervalsEnum.Root,
    class: "note-scale-root"
  });
  scaleNotes.shift();
  for (let i = 0; i < scaleNotes.length; i++) {
    classMap.push({
      note: scaleNotes[i],
      intervals: null,
      class: 'note-scale-' + (i % 2 === 0 ? 'tertiary' : 'secondary')
    });
  }

  return classMap;
}

export { getChordClassMap, getScaleClassMap }