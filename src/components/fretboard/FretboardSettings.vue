<template>
  <div class="fretboard-settings-wrapper flex flex-col mx-auto space-y-5">
    <div class="flex flex-wrap gap-4 bg-neutral p-4 rounded-box">
      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">-&nbsp;&nbsp;</span>
          <input type="radio" name="variation" value="" class="radio radio-primary checked:bg-red-500" v-model="selectedVariation">
        </label>
      </div>

      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">#&nbsp;&nbsp;</span>
          <input type="radio" name="variation" value="#" class="radio radio-primary checked:bg-red-500" v-model="selectedVariation">
        </label>
      </div>

      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">b&nbsp;&nbsp;</span>
          <input type="radio" name="variation" value="♭" class="radio radio-primary checked:bg-red-500" v-model="selectedVariation">
        </label>
      </div>

      <div class="divider lg:divider-horizontal"></div>

      <div class="form-control" v-for="note in notes" :key="note">
        <label class="label cursor-pointer">
          <span class="label-text">{{ note }}&nbsp;&nbsp;</span>
          <input :id="note" name="note" :value="note" v-model="selectedNote" type="radio" class="radio radio-primary checked:bg-red-500">
        </label>
      </div>
    </div>

    <div class="flex flex-wrap gap-4 items-center justify-center bg-neutral py-2 px-4 rounded-box">
      <span class="inline-block align-middle">Tuning</span>
      <div class="btn-group">
        <button class="btn btn-primary" @click="tuneUp">+</button>
        <button class="btn btn-primary" @click="tuneDown">-</button>
      </div>

      <div class="divider lg:divider-horizontal"></div>

      <div class="form-control">
        <label class="label cursor-pointer">
          <input type="checkbox" class="checkbox checkbox-primary" v-model="showOctave">
          <span class="label-text">&nbsp;&nbsp; Show octave</span>
        </label>
      </div>
    </div>

    <div class="flex gap-4 items-center justify-center bg-neutral py-2 px-4 rounded-box">
      <div>
        <select v-model="selectedChordType" class="select select-primary select-bordered w-full max-w-xs">
          <option
            v-for="chord in parametersStore.chordTypeList"
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
          <input type="checkbox" class="checkbox checkbox-primary" v-model="showTriads">
          <span class="label-text">&nbsp;&nbsp; Show triads</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useParametersStore } from "@/stores/parameters";
import { useTuningStore } from "@/stores/tuning";

export default {
  name: "FretboardSettings",
  data() {
    return {
      notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      selectedVariation: '',
      showOctave: false,
      showTriads: false,
    }
  },
  watch: {
    selectedNote() {
      this.parametersStore.setNote(this.selectedCompleteNote);
    },
    selectedVariation() {
      this.parametersStore.setNote(this.selectedCompleteNote);
    },
    selectedChordType() {
      this.parametersStore.setChord(this.selectedChordType);
    },
    showOctave() {
      this.parametersStore.showOctave = this.showOctave;
    },
    showTriads() {
      this.parametersStore.showTriads = this.showTriads;
    }
  },
  computed: {
    selectedCompleteNote() {
      return this.selectedNote + this.selectedVariation;
    }
  },
  methods: {
    tuneUp() {
      this.tuningStore.changeGuitarTuning(1);
    },
    tuneDown() {
      this.tuningStore.changeGuitarTuning(-1);
    },
  },
  setup() {
    const parametersStore = useParametersStore();
    const tuningStore = useTuningStore();

    const selectedNote = ref(parametersStore.note);
    const selectedChordType = ref(parametersStore.chordType);

    return {
      parametersStore,
      tuningStore,
      selectedChordType,
      selectedNote
    }
  },
}
</script>

<style scoped lang="scss">

</style>