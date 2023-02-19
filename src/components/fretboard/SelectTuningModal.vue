<template>
  <div class="select-tuning-modal">
    <label
      for="select-tuning-modal"
      class="btn btn-outline btn-sm lg:btn-md btn-primary modal-button"
    >
      Select tuning
    </label>

    <input type="checkbox" id="select-tuning-modal" class="modal-toggle" />
    <div for="select-tuning-modal" class="modal cursor-pointer">
      <div class="modal-box relative w-10/12 lg:w-3/5 max-w-5xl">
        <label
          for="select-tuning-modal"
          class="btn btn-sm btn-circle absolute right-2 top-2"
          >✕</label
        >
        <h1 class="text-xl font-bold">Tuning</h1>

        <div class="grid h-20 lg:h-32 place-items-center mt-4">
          <div class="flex flex-row-reverse gap-5 lg:gap-8">
            <div
              class="flex flex-col gap-1"
              v-for="(note, index) in fretboardParametersStore.fretboard
                .baseNotes"
              :key="'note-' + index"
            >
              <button
                class="btn btn-square btn-xs lg:btn-sm btn-primary"
                @click="fretboardParametersStore.changeStringTuning(index, 1)"
              >
                +
              </button>
              <div class="text-center text-base lg:text-lg">
                {{ note.name }}
              </div>
              <button
                class="btn btn-square btn-xs lg:btn-sm btn-primary"
                @click="fretboardParametersStore.changeStringTuning(index, -1)"
              >
                -
              </button>
            </div>
            <div class="flex flex-col gap-1">
              <button class="btn btn-square btn-xs lg:btn-sm" @click="tuneUp">
                +
              </button>
              <div class="text-center text-base lg:text-lg">All</div>
              <button class="btn btn-square btn-xs lg:btn-sm" @click="tuneDown">
                -
              </button>
            </div>
          </div>
        </div>

        <div class="divider">Settings</div>

        <div class="grid grid-flow-row gap-3 lg:gap-4 content-center">
          <div class="grid grid-flow-col lg:grid-flow-row">
            <div class="flex justify-center items-center">
              <h1 class="text-center text-lg font-bold">Guitar</h1>
            </div>
            <div class="flex justify-center gap-4 lg:gap-8">
              <div class="flex justify-center">
                <div class="form-control">
                  <label class="label cursor-pointer">
                    <input
                      name="note"
                      value="6strings-guitar"
                      v-model="selectedInstrumentType"
                      type="radio"
                      class="radio radio-sm lg:radio-md radio-primary checked:bg-red-500"
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
                      name="note"
                      value="7strings-guitar"
                      v-model="selectedInstrumentType"
                      type="radio"
                      class="radio radio-sm lg:radio-md radio-primary checked:bg-red-500"
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
                      name="note"
                      value="8strings-guitar"
                      v-model="selectedInstrumentType"
                      type="radio"
                      class="radio radio-sm lg:radio-md radio-primary checked:bg-red-500"
                      @click="set8StringsBaseTuning"
                    />
                    <span class="label-text text-sm lg:text-base"
                      >&nbsp;&nbsp;8 strings</span
                    >
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-flow-col lg:grid-flow-row">
            <div class="flex justify-center items-center">
              <h1 class="text-center text-lg font-bold">Bass</h1>
            </div>
            <div class="flex justify-center gap-4 lg:gap-8">
              <div class="flex justify-center">
                <div class="form-control">
                  <label class="label cursor-pointer">
                    <input
                      name="note"
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
                      name="note"
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
                      name="note"
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
          </div>

          <div class="grid grid-flow-col lg:grid-flow-row">
            <div class="flex justify-center items-center">
              <h1 class="text-center text-lg font-bold">Sound</h1>
            </div>
            <div class="grid grid-flow-col gap-2 lg:gap-3">
              <div class="flex justify-center">
                <div class="form-control">
                  <select
                    v-model="selectedSoundSample"
                    class="select select-primary select-sm lg:select-md select-bordered w-full max-w-xs"
                  >
                    <option
                      v-for="soundSample in soundSampleList"
                      :key="soundSample.name"
                      :value="soundSample"
                    >
                      {{ soundSample.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { Note } from "@tonaljs/tonal";

import { useFretboardParametersStore } from "@/stores/fretboardParameters";

export default {
  name: "SelectTuningModal",
  setup() {
    const fretboardParametersStore = useFretboardParametersStore();

    const selectedInstrumentType = ref("6strings-guitar");

    const selectedSoundSample = ref(
      fretboardParametersStore.selectedSoundSample
    );

    const baseGuitarStrings = [
      Note.get("E4"),
      Note.get("B3"),
      Note.get("G3"),
      Note.get("D3"),
      Note.get("A2"),
      Note.get("E2"),
    ];

    const baseBassStrings = [
      Note.get("G2"),
      Note.get("D2"),
      Note.get("A1"),
      Note.get("E1"),
    ];

    return {
      fretboardParametersStore,
      baseGuitarStrings,
      baseBassStrings,
      selectedSoundSample,
      selectedInstrumentType,
    };
  },
  computed: {
    soundSampleList() {
      return this.fretboardParametersStore.soundSampleList.filter(
        (soundSample) =>
          soundSample.type === this.fretboardParametersStore.instrument
      );
    },
  },
  watch: {
    selectedSoundSample() {
      this.fretboardParametersStore.selectedSoundSample =
        this.selectedSoundSample;
    },
  },
  methods: {
    tuneUp() {
      this.fretboardParametersStore.changeGuitarTuning(1);
    },
    tuneDown() {
      this.fretboardParametersStore.changeGuitarTuning(-1);
    },
    setBaseTuning() {
      this.fretboardParametersStore.fretboard.baseNotes = [
        ...this.baseGuitarStrings,
      ];
      this.setInstrument("guitar");
    },
    set7StringsBaseTuning() {
      let strings = [...this.baseGuitarStrings];

      strings.push(Note.get("B1"));

      this.fretboardParametersStore.fretboard.baseNotes = strings;
      this.setInstrument("guitar");
    },
    set8StringsBaseTuning() {
      let strings = [...this.baseGuitarStrings];

      strings.push(Note.get("B1"));
      strings.push(Note.get("F#1"));

      this.fretboardParametersStore.fretboard.baseNotes = strings;
      this.setInstrument("guitar");
    },
    setBassBaseTuning() {
      this.fretboardParametersStore.fretboard.baseNotes = [
        ...this.baseBassStrings,
      ];
      this.setInstrument("bass");
    },
    set5StringsBassTuning() {
      let strings = [...this.baseBassStrings];

      strings.push(Note.get("B0"));

      this.fretboardParametersStore.fretboard.baseNotes = strings;
      this.setInstrument("bass");
    },
    set6StringsBassTuning() {
      let strings = [...this.baseBassStrings];

      strings.unshift(Note.get("C3"));
      strings.push(Note.get("B0"));

      this.fretboardParametersStore.fretboard.baseNotes = strings;
      this.setInstrument("bass");
    },
    setInstrument(instrument) {
      this.fretboardParametersStore.instrument = instrument;

      if (
        this.soundSampleList.filter(
          (soundSample) => soundSample.name === this.selectedSoundSample.name
        ).length === 0
      ) {
        this.fretboardParametersStore.selectedSoundSample =
          this.soundSampleList[0];
        this.selectedSoundSample =
          this.fretboardParametersStore.selectedSoundSample;
      } else {
        this.fretboardParametersStore.selectedSoundSample =
          this.selectedSoundSample;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.chord-name {
  text-transform: capitalize;
}
</style>
