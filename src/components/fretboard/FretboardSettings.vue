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
        <input type="checkbox" id="show-triads" v-model="showTriads" />
        <label for="show-triads">&nbsp;Triads</label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import { useParametersStore } from "@/stores/parameters";

export default {
  name: "FretboardSettings",
  data() {
    return {
      notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      selectedVariation: '',
      selectedNote: 'A',
      showOctave: false,
      showTriads: false,
    }
  },
  watch: {
    // TODO : add Pinia to avoid use of a bus
    selectedNote() {
      this.emitter.emit('selected-note-changed', this.selectedCompleteNote);
      this.store.setNote(this.selectedCompleteNote);
    },
    selectedVariation() {
      this.emitter.emit('selected-note-changed', this.selectedCompleteNote);
    },
    showOctave() {
      this.emitter.emit('show-octave-changed', this.showOctave);
    },
    showTriads() {
      this.emitter.emit('show-triads-changed', this.showTriads);
    }
  },
  computed: {
    selectedCompleteNote() {
      return this.selectedNote + this.selectedVariation;
    }
  },
  methods: {
    tuneUp() {
      this.emitter.emit('guitar-tuning-changed', 1);
    },
    tuneDown() {
      this.emitter.emit('guitar-tuning-changed', -1);
    },
  },
  created() {
    this.emitter.emit('selected-note-changed', this.selectedCompleteNote);
  },
  setup() {
    const store = useParametersStore();

    return { store }
  },
}
</script>

<style scoped lang="scss">

</style>