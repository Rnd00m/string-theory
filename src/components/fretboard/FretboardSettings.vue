<template>
  <div class="fretboard-settings-wrapper flex flex-col mx-auto space-y-5">
    <div class="flex flex-wrap gap-4 p-4 bg-base-300 rounded-box">
      <div class="form-control">
        <label class="label cursor-pointer">
          <input
            type="radio"
            name="variation"
            value=""
            class="radio radio-primary checked:bg-red-500"
            v-model="selectedVariation"
          />
          <span class="label-text">&nbsp;&nbsp;-</span>
        </label>
      </div>

      <div class="form-control">
        <label class="label cursor-pointer">
          <input
            type="radio"
            name="variation"
            value="#"
            class="radio radio-primary checked:bg-red-500"
            v-model="selectedVariation"
          />
          <span class="label-text">&nbsp;&nbsp;#</span>
        </label>
      </div>

      <div class="form-control">
        <label class="label cursor-pointer">
          <input
            type="radio"
            name="variation"
            value="♭"
            class="radio radio-primary checked:bg-red-500"
            v-model="selectedVariation"
          />
          <span class="label-text">&nbsp;&nbsp;b</span>
        </label>
      </div>

      <div class="divider lg:divider-horizontal"></div>

      <div class="form-control" v-for="note in notes" :key="note">
        <label class="label cursor-pointer">
          <input
            :id="note"
            name="note"
            :value="note"
            v-model="selectedNote"
            type="radio"
            class="radio radio-primary checked:bg-red-500"
          />
          <span class="label-text">&nbsp;&nbsp;{{ note }}</span>
        </label>
      </div>
    </div>

    <div
      class="flex flex-wrap gap-4 items-center justify-center p-4 bg-base-300 rounded-box"
    >
      <span class="inline-block align-middle">Tuning</span>
      <div class="btn-group">
        <button class="btn btn-primary" @click="tuneUp">+</button>
        <button class="btn btn-primary" @click="tuneDown">-</button>
      </div>

      <div class="divider lg:divider-horizontal"></div>

      <div class="form-control">
        <label class="label cursor-pointer">
          <input
            type="checkbox"
            class="checkbox checkbox-primary"
            v-model="showOctave"
          />
          <span class="label-text">&nbsp;&nbsp;Show octave</span>
        </label>
      </div>
    </div>

    <div
      class="flex gap-4 items-center justify-center p-4 bg-base-300 rounded-box"
    >
      <div v-if="fretboardParametersStore.displayType === 'chord'">
        <select
          v-model="selectedChordType"
          class="select select-primary select-bordered w-full max-w-xs"
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
            class="radio radio-primary checked:bg-red-500"
            v-model="fretboardParametersStore.displayType"
          />
          <span class="label-text">&nbsp;&nbsp;Chord</span>
        </label>
      </div>

      <div class="form-control">
        <label class="label cursor-pointer">
          <input
            type="radio"
            name="type"
            value="scale"
            class="radio radio-primary checked:bg-red-500"
            v-model="fretboardParametersStore.displayType"
          />
          <span class="label-text">&nbsp;&nbsp;Scale</span>
        </label>
      </div>

      <div class="divider lg:divider-horizontal"></div>

      <div class="form-control">
        <label class="label cursor-pointer">
          <input
            type="checkbox"
            class="checkbox checkbox-primary"
            v-model="showTriads"
          />
          <span class="label-text">&nbsp;&nbsp;Show notes</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useFretboardParametersStore } from "@/stores/fretboardParameters";

import SelectScaleModal from "./SelectScaleModal.vue";

export default {
  name: "FretboardSettings",
  components: {
    SelectScaleModal,
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
  methods: {
    tuneUp() {
      this.fretboardParametersStore.changeGuitarTuning(1);
    },
    tuneDown() {
      this.fretboardParametersStore.changeGuitarTuning(-1);
    },
  },
};
</script>

<style scoped lang="scss"></style>
