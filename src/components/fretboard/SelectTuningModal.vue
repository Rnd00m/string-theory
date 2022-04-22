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

        <div class="flex flex-row-reverse mt-4 gap-2">
          <div
            class="form-control"
            v-for="(note, index) in fretboardParametersStore.fretboard.baseNotes"
            :key="'note-' + index"
          >
            <div class="input-group input-group-sm">
              <button
                class="btn btn-square btn-sm btn-primary"
                @click="fretboardParametersStore.changeStringTuning(index, -1)"
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
      </label>
    </label>
  </div>
</template>

<script>
import { useFretboardParametersStore } from "@/stores/fretboardParameters";

export default {
  name: "SelectTuningModal",
  setup() {
    const fretboardParametersStore = useFretboardParametersStore();

    return {
      fretboardParametersStore,
    };
  },
};
</script>

<style scoped lang="scss">
.chord-name {
  text-transform: capitalize;
}
</style>