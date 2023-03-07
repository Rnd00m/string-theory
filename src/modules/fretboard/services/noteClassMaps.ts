import { Chord, Scale } from "@tonaljs/tonal";
import type { NoteClassMap } from "@/modules/fretboard/types/NoteClassMap";
import { ChordIntervalsEnum } from "@/scripts/enums/ChordIntervalsEnum";
import { ScaleIntervalsEnum } from "@/scripts/enums/ScaleIntervalsEnum";

function getChordClassMap(chord: typeof Chord): NoteClassMap[] {
  const classMap: NoteClassMap[] = [];
  const chordIntervals = Object.values(ChordIntervalsEnum);

  chordIntervals.forEach((chordInterval: string, index: number) => {
    const chordNote = chord.notes[index];

    if (chordNote !== undefined) {
      classMap.push({
        note: chordNote,
        intervals: chordInterval,
        class: `note-chord-${chordInterval}`,
      });
    }
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