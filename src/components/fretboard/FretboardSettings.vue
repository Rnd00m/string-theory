<template>
  <div class="fretboard-settings-wrapper flex flex-col mx-auto space-y-5">
    <div class="flex flex-wrap gap-4 p-4 bg-base-300 rounded-box">
      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">-&nbsp;&nbsp;</span>
          <input
            type="radio"
            name="variation"
            value=""
            class="radio radio-primary checked:bg-red-500"
            v-model="selectedVariation"
          />
        </label>
      </div>

      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">#&nbsp;&nbsp;</span>
          <input
            type="radio"
            name="variation"
            value="#"
            class="radio radio-primary checked:bg-red-500"
            v-model="selectedVariation"
          />
        </label>
      </div>

      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">b&nbsp;&nbsp;</span>
          <input
            type="radio"
            name="variation"
            value="♭"
            class="radio radio-primary checked:bg-red-500"
            v-model="selectedVariation"
          />
        </label>
      </div>

      <div class="divider lg:divider-horizontal"></div>

      <div class="form-control" v-for="note in notes" :key="note">
        <label class="label cursor-pointer">
          <span class="label-text">{{ note }}&nbsp;&nbsp;</span>
          <input
            :id="note"
            name="note"
            :value="note"
            v-model="selectedNote"
            type="radio"
            class="radio radio-primary checked:bg-red-500"
          />
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
          <span class="label-text">Show octave&nbsp;&nbsp; </span>
          <input
            type="checkbox"
            class="checkbox checkbox-primary"
            v-model="showOctave"
          />
        </label>
      </div>
    </div>

    <div
      class="flex gap-4 items-center justify-center p-4 bg-base-300 rounded-box"
    >
      <div>
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

      <div class="divider lg:divider-horizontal"></div>

      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">Chord&nbsp;&nbsp;</span>
          <input
            type="radio"
            name="type"
            value="chord"
            class="radio radio-primary checked:bg-red-500"
            v-model="type"
          />
        </label>
      </div>

      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">Scale&nbsp;&nbsp;</span>
          <input
            type="radio"
            name="type"
            value="scale"
            class="radio radio-primary checked:bg-red-500"
            v-model="type"
          />
        </label>
      </div>

      <div class="divider lg:divider-horizontal"></div>

      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">Show notes&nbsp;&nbsp; </span>
          <input
            type="checkbox"
            class="checkbox checkbox-primary"
            v-model="showTriads"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useFretboardParametersStore } from "@/stores/fretboardParameters";

export default {
  name: "FretboardSettings",
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
