import { defineStore } from "pinia";
import { Note } from "@tonaljs/tonal";
import { SoundSampleInstrumentTypeEnum } from "@/modules/settings/enums/SoundSampleInstrumentTypeEnum";
import { DisplayTypeEnum } from "@/commons/enums/DisplayTypeEnum";
import { NoteVariationEnum } from "@/commons/enums/NoteVariationEnum";
import { soundSampleList } from "@/modules/settings/services/SoundSampleList";

export const useFretboardParametersStore = defineStore("fretboard-parameters", {
  state: () => {
    return {
      noteLetter: "C" as string,
      noteVariation: NoteVariationEnum.None,
      displayType: DisplayTypeEnum.Chord,
      chordType: "M",
      scaleName: "ionian" as string,
      showOctave: false,
      showNotes: false,
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
    changeInstrumentType(instrumentType: SoundSampleInstrumentTypeEnum) {
      const filteredSoundSampleList = soundSampleList.filter(
        (soundSample) => soundSample.instrumentType === instrumentType
      );

      if (!filteredSoundSampleList.find(filteredSoundSample => filteredSoundSample.name  === this.selectedSoundSample.name)) {
        this.selectedSoundSample = filteredSoundSampleList[0];
      }

      this.instrumentType = instrumentType;
    },
  },
  getters: {
    note: (state) => state.noteLetter + state.noteVariation,
  },
});