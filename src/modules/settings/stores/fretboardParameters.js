import { defineStore } from "pinia";
import { Chord, Note, Mode, Scale } from "@tonaljs/tonal";
import { SoundSampleInstrumentTypeEnum } from "@/modules/settings/services/enums/SoundSampleInstrumentTypeEnum";
import { soundSampleList } from "@/modules/settings/services/soundSampleList";
import { DisplayTypeEnum } from "@/scripts/enums/DisplayTypeEnum";

export const useFretboardParametersStore = defineStore("fretboard-parameters", {
  state: () => {
    return {
      note: "C",
      variation: "",
      displayType: DisplayTypeEnum.Chord,
      chord: Chord.get("CM"),
      chordType: "M",
      scale: Mode.get("ionian"),
      showOctave: false,
      showTriads: false,
      fretboard: {
        baseNotes: [
          Note.get("E4"),
          Note.get("B3"),
          Note.get("G3"),
          Note.get("D3"),
          Note.get("A2"),
          Note.get("E2"),
        ],
        stringLength: 12,
      },
      instrumentType: SoundSampleInstrumentTypeEnum.Guitar,
      selectedSoundSample: soundSampleList[0],
      selectedDrawer: null,
    };
  },
  actions: {
    changeInstrumentType(instrumentType) {
      let filteredSoundSampleList = soundSampleList.filter(
        (soundSample) => soundSample.instrumentType === instrumentType
      );

      if (!filteredSoundSampleList.find(filteredSoundSample => filteredSoundSample.name  === this.selectedSoundSample.name)) {
        this.selectedSoundSample = filteredSoundSampleList[0];
      }

      this.instrumentType = instrumentType;
    },
    setNote(note) {
      this.note = note;
      this.chord = Chord.get(this.note + this.variation + this.chordType);
    },
    setVariation(variation) {
      this.variation = variation;
      this.chord = Chord.get(this.note + this.variation + this.chordType);
    },
    setChord(chordType) {
      this.chordType = chordType;
      this.chord = Chord.get(this.note + chordType);
    },
    // Notes
    getTriadNote(noteString) {
      if (noteString === undefined) return null;

      let note = Note.get(noteString);

      return note.name;
    },
  },
  getters: {
    chordNotes(state) {
      return {
        root: this.getTriadNote(state.chord.notes[0]),
        third: this.getTriadNote(state.chord.notes[1]),
        fifth: this.getTriadNote(state.chord.notes[2]),
        seventh: this.getTriadNote(state.chord.notes[3]),
      };
    },
    scalesNotes(state) {
      let scaleNotes = Scale.get(`${state.note} ${state.scale.name}`).notes;

      return {
        root: this.getTriadNote(scaleNotes[0]),
        second: this.getTriadNote(scaleNotes[1]),
        third: this.getTriadNote(scaleNotes[2]),
        fourth: this.getTriadNote(scaleNotes[3]),
        fifth: this.getTriadNote(scaleNotes[4]),
        sixth: this.getTriadNote(scaleNotes[5]),
        seventh: this.getTriadNote(scaleNotes[6]),
      };
    },
    scaleNotesArray(state) {
      return Scale.get(`${state.note} ${state.scale.name}`).notes;
    },
    strings(state) {
      return state.fretboard.baseNotes.map((note) => {
        return this.getStringNotesFromStartNote(note);
      });
    },
  },
});