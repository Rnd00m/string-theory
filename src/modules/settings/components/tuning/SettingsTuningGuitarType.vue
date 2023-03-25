<template>
  <div class="flex justify-center gap-4 lg:gap-8">
    <div class="flex justify-center">
      <div class="form-control">
        <label class="label cursor-pointer">
          <input
            name="tuning-note"
            value="6strings-guitar"
            v-model="selectedInstrumentType"
            type="radio"
            class="radio radio-sm lg:radio-md radio-primary checked:bg-primary"
            @click="setBaseTuning"
          />
          <span class="label-text text-sm lg:text-base"
            >&nbsp;&nbsp;6 strings</span
          >
        </label>
      </div>
    </div>

    <div class="flex justify-center">
      <div class="form-control">
        <label class="label cursor-pointer">
          <input
            name="tuning-note"
            value="7strings-guitar"
            v-model="selectedInstrumentType"
            type="radio"
            class="radio radio-sm lg:radio-md radio-primary checked:bg-primary"
            @click="set7StringsBaseTuning"
          />
          <span class="label-text text-sm lg:text-base"
            >&nbsp;&nbsp;7 strings</span
          >
        </label>
      </div>
    </div>

    <div class="flex justify-center">
      <div class="form-control">
        <label class="label cursor-pointer">
          <input
            name="tuning-note"
            value="8strings-guitar"
            v-model="selectedInstrumentType"
            type="radio"
            class="radio radio-sm lg:radio-md radio-primary checked:bg-primary"
            @click="set8StringsBaseTuning"
          />
          <span class="label-text text-sm lg:text-base"
            >&nbsp;&nbsp;8 strings</span
          >
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { Note } from "@tonaljs/tonal";

import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";
import { ref } from "vue";
import {SoundSampleInstrumentTypeEnum} from "@/modules/settings/enums/SoundSampleInstrumentTypeEnum";

export default {
  name: "SettingsTuningGuitarType",
  setup() {
    const fretboardParametersStore = useFretboardParametersStore();
    const selectedInstrumentType = ref("6strings-guitar");

    const baseGuitarStrings = [
      Note.get("E4"),
      Note.get("B3"),
      Note.get("G3"),
      Note.get("D3"),
      Note.get("A2"),
      Note.get("E2"),
    ];

    return {
      fretboardParametersStore,
      baseGuitarStrings,
      selectedInstrumentType
    };
  },
  methods: {
    setBaseTuning() {
      this.fretboardParametersStore.fretboard.baseNotes = [
        ...this.baseGuitarStrings,
      ];
      this.fretboardParametersStore.changeInstrumentType(SoundSampleInstrumentTypeEnum.Guitar)
    },
    set7StringsBaseTuning() {
      let strings = [...this.baseGuitarStrings];

      strings.push(Note.get("B1"));

      this.fretboardParametersStore.fretboard.baseNotes = strings;
      this.fretboardParametersStore.changeInstrumentType(SoundSampleInstrumentTypeEnum.Guitar);
    },
    set8StringsBaseTuning() {
      let strings = [...this.baseGuitarStrings];

      strings.push(Note.get("B1"));
      strings.push(Note.get("F#1"));

      this.fretboardParametersStore.fretboard.baseNotes = strings;
      this.fretboardParametersStore.changeInstrumentType(SoundSampleInstrumentTypeEnum.Guitar)
    },
  },
};
</script>

<style scoped lang="scss">
</style>