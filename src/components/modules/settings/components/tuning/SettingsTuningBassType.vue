<template>
  <div class="flex justify-center gap-4 lg:gap-8">
    <div class="flex justify-center">
      <div class="form-control">
        <label class="label cursor-pointer">
          <input
            name="tuning-note"
            value="4strings-bass"
            v-model="selectedInstrumentType"
            type="radio"
            class="radio radio-sm lg:radio-md radio-primary checked:bg-red-500"
            @click="setBassBaseTuning"
          />
          <span class="label-text text-sm lg:text-base"
            >&nbsp;&nbsp;4 strings</span
          >
        </label>
      </div>
    </div>

    <div class="flex justify-center">
      <div class="form-control">
        <label class="label cursor-pointer">
          <input
            name="tuning-note"
            value="5strings-bass"
            v-model="selectedInstrumentType"
            type="radio"
            class="radio radio-sm lg:radio-md radio-primary checked:bg-red-500"
            @click="set5StringsBassTuning"
          />
          <span class="label-text text-sm lg:text-base"
            >&nbsp;&nbsp;5 strings</span
          >
        </label>
      </div>
    </div>

    <div class="flex justify-center">
      <div class="form-control">
        <label class="label cursor-pointer">
          <input
            name="tuning-note"
            value="6strings-bass"
            v-model="selectedInstrumentType"
            type="radio"
            class="radio radio-sm lg:radio-md radio-primary checked:bg-red-500"
            @click="set6StringsBassTuning"
          />
          <span class="label-text text-sm lg:text-base"
            >&nbsp;&nbsp;6 strings</span
          >
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { Note } from "@tonaljs/tonal";

import { useFretboardParametersStore } from "@/stores/fretboardParameters";
import {SoundSampleInstrumentTypeEnum} from "@/scripts/classes/SoundSampleInstrumentTypeEnum";

export default {
  name: "SettingsTuningBassType",
  setup() {
    const fretboardParametersStore = useFretboardParametersStore();
    const selectedInstrumentType = ref("6strings-guitar");

    const baseBassStrings = [
      Note.get("G2"),
      Note.get("D2"),
      Note.get("A1"),
      Note.get("E1"),
    ];

    return {
      fretboardParametersStore,
      baseBassStrings,
      selectedInstrumentType,
    };
  },
  methods: {
    setBassBaseTuning() {
      this.fretboardParametersStore.fretboard.baseNotes = [
        ...this.baseBassStrings,
      ];
      this.fretboardParametersStore.changeInstrumentType(SoundSampleInstrumentTypeEnum.Bass)
    },
    set5StringsBassTuning() {
      let strings = [...this.baseBassStrings];

      strings.push(Note.get("B0"));

      this.fretboardParametersStore.fretboard.baseNotes = strings;
      this.fretboardParametersStore.changeInstrumentType(SoundSampleInstrumentTypeEnum.Bass)
    },
    set6StringsBassTuning() {
      let strings = [...this.baseBassStrings];

      strings.unshift(Note.get("C3"));
      strings.push(Note.get("B0"));

      this.fretboardParametersStore.fretboard.baseNotes = strings;
      this.fretboardParametersStore.changeInstrumentType(SoundSampleInstrumentTypeEnum.Bass)
    },
  },
};
</script>

<style scoped lang="scss">
</style>