<template>
  <div class="select-tuning-modal">
    <label
      for="select-tuning-modal"
      class="btn btn-outline btn-primary modal-button"
    >
      Select tuning
    </label>

    <input type="checkbox" id="select-tuning-modal" class="modal-toggle" />
    <label for="select-tuning-modal" class="modal cursor-pointer">
      <label class="modal-box relative w-10/12 max-w-5xl" for="">
        <label
          for="select-tuning-modal"
          class="btn btn-sm btn-circle absolute right-2 top-2"
          >✕</label
        >
        <h1 class="text-xl font-bold">Tuning</h1>

        <div class="grid h-32 place-items-center mt-4">
          <div class="flex flex-row-reverse gap-8">
            <div
              class="flex flex-col gap-2"
              v-for="(note, index) in fretboardParametersStore.fretboard
                .baseNotes"
              :key="'note-' + index"
            >
              <button
                class="btn btn-square btn-sm btn-primary"
                @click="fretboardParametersStore.changeStringTuning(index, -1)"
              >
                -
              </button>
              <div class="text-center text-lg">
                {{ note.name }}
              </div>
              <button
                class="btn btn-square btn-sm btn-primary"
                @click="fretboardParametersStore.changeStringTuning(index, 1)"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div class="divider">Settings</div>

        <div
          class="grid grid-flow-col h-20 place-items-stretch gap-4 content-center"
        >
          <button class="btn btn-outline btn-primary" @click="setBaseTuning">
            6 strings
          </button>
          <button
            class="btn btn-outline btn-primary"
            @click="set7StringsBaseTuning"
          >
            7 strings
          </button>
          <button
            class="btn btn-outline btn-primary"
            @click="set8StringsBaseTuning"
          >
            8 strings
          </button>
          <button
            class="btn btn-outline btn-primary"
            @click="setBaseBassTuning"
          >
            4 strings Bass
          </button>
          <button
            class="btn btn-outline btn-primary"
            @click="set5StringsBassTuning"
          >
            5 strings Bass
          </button>
          <button
            class="btn btn-outline btn-primary"
            @click="set6StringsBassTuning"
          >
            6 strings Bass
          </button>
        </div>

        <div
          class="grid grid-flow-col h-20 justify-center place-items-center gap-4 content-center"
        >
          <div>
            <div class="form-control">
              <div class="input-group input-group-md">
                <span>Tuning</span>
                <button
                  class="btn btn-square btn-primary btn-md"
                  @click="tuneUp"
                >
                  +
                </button>
                <button
                  class="btn btn-square btn-primary btn-md"
                  @click="tuneDown"
                >
                  -
                </button>
              </div>
            </div>
          </div>

          <div class="form-control">
            <select
              v-model="selectedSoundSample"
              class="select select-primary select-bordered w-full max-w-xs"
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
      </label>
    </label>
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
    setBaseBassTuning() {
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
