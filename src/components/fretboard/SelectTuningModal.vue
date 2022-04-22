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

        <div class="grid h-20 place-items-center">
          <div class="flex flex-row-reverse mt-4 gap-2">
            <div
              class="form-control"
              v-for="(note, index) in fretboardParametersStore.fretboard
                .baseNotes"
              :key="'note-' + index"
            >
              <div class="input-group input-group-sm">
                <button
                  class="btn btn-square btn-sm btn-primary"
                  @click="
                    fretboardParametersStore.changeStringTuning(index, -1)
                  "
                >
                  -
                </button>
                <input
                  type="text"
                  class="input input-sm input-bordered text-center tuning-note-input w-full"
                  readonly
                  :value="note.name"
                />
                <button
                  class="btn btn-square btn-sm btn-primary"
                  @click="fretboardParametersStore.changeStringTuning(index, 1)"
                >
                  +
                </button>
              </div>
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

        <div class="grid h-20 place-items-center">
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
        </div>
      </label>
    </label>
  </div>
</template>

<script>
import { Note } from "@tonaljs/tonal";

import { useFretboardParametersStore } from "@/stores/fretboardParameters";

export default {
  name: "SelectTuningModal",
  setup() {
    const fretboardParametersStore = useFretboardParametersStore();

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
    };
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
    },
    set7StringsBaseTuning() {
      let strings = [...this.baseGuitarStrings];

      strings.push(Note.get("B1"));

      this.fretboardParametersStore.fretboard.baseNotes = strings;
    },
    set8StringsBaseTuning() {
      let strings = [...this.baseGuitarStrings];

      strings.push(Note.get("B1"));
      strings.push(Note.get("F#1"));

      this.fretboardParametersStore.fretboard.baseNotes = strings;
    },
    setBaseBassTuning() {
      this.fretboardParametersStore.fretboard.baseNotes = [
        ...this.baseBassStrings,
      ];
    },
    set5StringsBassTuning() {
      let strings = [...this.baseBassStrings];

      strings.push(Note.get("B0"));

      this.fretboardParametersStore.fretboard.baseNotes = strings;
    },
    set6StringsBassTuning() {
      let strings = [...this.baseBassStrings];

      strings.unshift(Note.get("C3"));
      strings.push(Note.get("B0"));

      this.fretboardParametersStore.fretboard.baseNotes = strings;
    },
  },
};
</script>

<style scoped lang="scss">
.chord-name {
  text-transform: capitalize;
}
</style>
