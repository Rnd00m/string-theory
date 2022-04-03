<template>
  <div class="fretboard-settings-wrapper flex justify-center">
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
    <pre><code>{{ selectedCompleteNote }}</code></pre>
  </div>
</template>

<script>
export default {
  name: "FretboardSettings",
  data() {
    return {
      notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      selectedVariation: '',
      selectedNote: 'A'
    }
  },
  computed: {
    selectedCompleteNote() {
      let selectedCompleteNote = this.selectedNote + this.selectedVariation;

      this.emitter.emit('selected-note-changed', selectedCompleteNote);

      return selectedCompleteNote;
    }
  },
}
</script>

<style scoped lang="scss">

</style>