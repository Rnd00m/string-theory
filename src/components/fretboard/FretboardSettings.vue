<template>
  <div
    class="fretboard-settings-wrapper flex flex-col mx-auto lg:space-y-5 space-y-2"
  >
    <div class="card bg-base-200 shadow-xl">
      <div
        class="card-body lg:p-5 p-2 flex flex-col w-full lg:flex-row justify-center"
      >
        <div class="flex gap-3 justify-center">
          <div class="form-control" v-for="note in notes" :key="note">
            <label class="label cursor-pointer">
              <input
                :id="note"
                name="note"
                :value="note"
                v-model="selectedNote"
                type="radio"
                class="radio radio-sm lg:radio-md radio-primary checked:bg-red-500"
              />
              <span class="label-text text-sm lg:text-base"
                >&nbsp;&nbsp;{{ note }}</span
              >
            </label>
          </div>
        </div>

        <div class="divider lg:divider-horizontal -my-2 lg:my-0"></div>

        <div class="flex gap-3 justify-center">
          <div class="form-control">
            <label class="label cursor-pointer">
              <input
                type="radio"
                name="variation"
                value=""
                class="radio radio-sm lg:radio-md radio-primary checked:bg-red-500"
                v-model="selectedVariation"
              />
              <span class="label-text text-sm lg:text-base">&nbsp;&nbsp;-</span>
            </label>
          </div>

          <div class="form-control">
            <label class="label cursor-pointer">
              <input
                type="radio"
                name="variation"
                value="#"
                class="radio radio-sm lg:radio-md radio-primary checked:bg-red-500"
                v-model="selectedVariation"
              />
              <span class="label-text text-sm lg:text-base">&nbsp;&nbsp;#</span>
            </label>
          </div>

          <div class="form-control">
            <label class="label cursor-pointer">
              <input
                type="radio"
                name="variation"
                value="♭"
                class="radio radio-sm lg:text-base radio-primary checked:bg-red-500"
                v-model="selectedVariation"
              />
              <span class="label-text text-sm lg:text-base">&nbsp;&nbsp;b</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-200 shadow-xl">
      <div class="card-body lg:p-4 p-2">
        <div class="flex flex-wrap items-center justify-evenly">
          <SelectTuningModal></SelectTuningModal>

          <div class="divider lg:divider-horizontal"></div>

          <div class="form-control">
            <label class="label cursor-pointer">
              <input
                type="checkbox"
                class="checkbox checkbox-sm lg:checkbox-md checkbox-primary"
                v-model="showOctave"
              />
              <span class="label-text text-sm lg:text-base"
                >&nbsp;&nbsp;Show octave</span
              >
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-200 shadow-xl">
      <div class="card-body lg:p-4 p-2">
        <div class="flex gap-2 lg:gap-4 items-center justify-center">
          <div v-if="fretboardParametersStore.displayType === 'chord'">
            <select
              v-model="selectedChordType"
              class="select select-sm lg:select-md select-primary select-bordered w-full max-w-xs"
            >
              <option
                v-for="chord in fretboardParametersStore.chordTypeList"
                :key="chord.notation"
                :value="chord.notation"
              >
                {{ chord.name }}
              </option>
            </select>
          </div>

          <SelectScaleModal v-else></SelectScaleModal>

          <div class="divider lg:divider-horizontal"></div>

          <div class="form-control">
            <label class="label cursor-pointer">
              <input
                type="radio"
                name="type"
                value="chord"
                class="radio radio-sm lg:radio-md radio-primary checked:bg-red-500"
                v-model="fretboardParametersStore.displayType"
              />
              <span class="label-text text-sm lg:text-base"
                >&nbsp;&nbsp;Chord</span
              >
            </label>
          </div>

          <div class="form-control">
            <label class="label cursor-pointer">
              <input
                type="radio"
                name="type"
                value="scale"
                class="radio radio-sm lg:radio-md radio-primary checked:bg-red-500"
                v-model="fretboardParametersStore.displayType"
              />
              <span class="label-text text-sm lg:text-base"
                >&nbsp;&nbsp;Scale</span
              >
            </label>
          </div>

          <div class="divider lg:divider-horizontal"></div>

          <div class="form-control">
            <label class="label cursor-pointer">
              <input
                type="checkbox"
                class="checkbox checkbox-sm lg:checkbox-md checkbox-primary"
                v-model="showTriads"
              />
              <span class="label-text text-sm lg:text-base"
                >&nbsp;&nbsp;Show notes</span
              >
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useFretboardParametersStore } from "@/stores/fretboardParameters";

import SelectScaleModal from "./SelectScaleModal.vue";
import SelectTuningModal from "./SelectTuningModal.vue";

export default {
  name: "FretboardSettings",
  components: {
    SelectScaleModal,
    SelectTuningModal,
  },
  setup() {
    const fretboardParametersStore = useFretboardParametersStore();

    const selectedNote = ref(fretboardParametersStore.note);
    const selectedChordType = ref(fretboardParametersStore.chordType);

    const notes = ref(["A", "B", "C", "D", "E", "F", "G"]);
    const selectedVariation = ref("");
    const showOctave = ref(false);
    const showTriads = ref(false);
    const type = ref("chord");

    return {
      fretboardParametersStore,
      selectedChordType,
      selectedNote,
      notes,
      selectedVariation,
      showOctave,
      showTriads,
      type,
    };
  },
  watch: {
    selectedNote() {
      this.fretboardParametersStore.setNote(this.selectedCompleteNote);
    },
    selectedVariation() {
      this.fretboardParametersStore.setNote(this.selectedCompleteNote);
    },
    selectedChordType() {
      this.fretboardParametersStore.setChord(this.selectedChordType);
    },
    showOctave() {
      this.fretboardParametersStore.showOctave = this.showOctave;
    },
    showTriads() {
      this.fretboardParametersStore.showTriads = this.showTriads;
    },
  },
  computed: {
    selectedCompleteNote() {
      return this.selectedNote + this.selectedVariation;
    },
  },
};
</script>

<style scoped lang="scss"></style>
