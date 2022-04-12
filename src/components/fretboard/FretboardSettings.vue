<template>
  <div class="fretboard-settings-wrapper flex flex-col mx-auto space-y-5">
    <div class="flex gap-4">
      <div>
        <input type="radio" id="none" name="variation" value="" v-model="selectedVariation">
        <label for="none">-</label>
      </div>
      <div>
        <input type="radio" id="sharp" name="variation" value="#" v-model="selectedVariation">
        <label for="sharp">#</label>
      </div>
      <div>
        <input type="radio" id="flat" name="variation" value="♭" v-model="selectedVariation">
        <label for="flat">♭</label>
      </div>
      <div v-for="note in notes" :key="note">
        <input
            class="text-blue-500 border border-solid border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-md px-4 py-2 rounded"
            type="radio" :id="note" name="note" :value="note" v-model="selectedNote">
        <label for="none">{{ note }}</label>
      </div>
    </div>
    <div class="flex gap-4">
      <div>
        Accordage
        <button
          class="text-blue-500 border border-solid border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-md px-4 py-2 rounded"
          @click="tuneUp"
        >+</button>
        <button
          class="text-blue-500 border border-solid border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-md px-4 py-2 rounded"
          @click="tuneDown"
        >-</button>
      </div>
      <div>
        <input type="checkbox" id="show-octave-checkbox" v-model="showOctave" />
        <label for="show-octave-checkbox">&nbsp;Afficher les octaves</label>
      </div>
    </div>
    <div class="flex gap-4">
      <div>
        <select v-model="selectedChordType">
          <option
            v-for="chord in parametersStore.chordTypeList"
            :key="chord.notation"
            :value="chord.notation"
          >
            {{ chord.name }}
          </option>
        </select>
      </div>
      <div>
        <input type="checkbox" id="show-triads" v-model="showTriads" />
        <label for="show-triads">&nbsp;Triads</label>
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
  select {
    color: black;
  }
</style>