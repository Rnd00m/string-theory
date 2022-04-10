<template>
  <div class="fretboard-wrapper">
    <FretboardString v-for="note in baseNotesForString" :key="'string-' + note" :start-note="note"></FretboardString>
    <FretboardMarker></FretboardMarker>
  </div>
</template>

<script>
import { Note } from '@tonaljs/tonal';
import FretboardString from "@/components/fretboard/FretboardString.vue";
import FretboardMarker from "@/components/fretboard/FretboardMarker.vue";

export default {
  name: "FretboardVisualizer",
  components: { FretboardMarker, FretboardString },
  data() {
    return {
      baseNotesForString: [
        Note.get('E4').name,
        Note.get('B3').name,
        Note.get('G3').name,
        Note.get('D3').name,
        Note.get('A2').name,
        Note.get('E2').name
      ],
    }
  },
  methods: {
    changeTuning(direction) {
      let interval = direction > 0 ? '' : '-';
      interval = `${interval}2m`;

      for (let i = 0; i < this.baseNotesForString.length; i++) {
        let newNote = Note.simplify(Note.transpose(this.baseNotesForString[i], interval));

        this.baseNotesForString.splice(i, 1, newNote);
      }
    }
  },
  created() {
    this.emitter.on('guitar-tuning-changed', direction => {
      this.changeTuning(direction);
    });
  }
}
</script>

<style scoped lang="scss">
</style>