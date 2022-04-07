<template>
  <div class="fretboard-wrapper">
    <div class="strings-wrapper">
      <div class="string" :class="'string-' + (index + 1)" v-for="(string, index) in strings" :key="index">
        <FretboardNote
          v-for="note in string"
          :key="note"
          :note="note"
          :selected-note="selectedNote"
        ></FretboardNote>
      </div>
    </div>
  </div>
</template>

<script>
import teoria from 'teoria'
import FretboardNote from "@/components/fretboard/FretboardNote.vue";

export default {
  name: "FretboardVisualizer",
  components: {FretboardNote},
  data() {
    return {
      baseNotesForString: ['e', 'a', 'd', 'g', 'b', 'e'],
      strings: [],
      selectedNote: null
    }
  },
  methods: {
    generateStringNotes(startNote) {
      let e4 = teoria.note(startNote);

      return e4.scale('chromatic').notes();
    },
    generateFretboard() {
      this.baseNotesForString.forEach(note => {
        this.strings.push(this.generateStringNotes(note));
      })
    }
  },
  created() {
    this.generateFretboard();

    this.emitter.on('selected-note-changed', note => {
      this.selectedNote = note;
    });
  }
}
</script>

<style scoped lang="scss">
.strings-wrapper {
  .string {
    display: grid;
    grid-template-columns: repeat(13, 5em);

    &:before {
      position: absolute;
      content: " ";
      height: 50%;
      width: 100%;
      top: 0;
      z-index: 4;
    }
  }

  .string-1:before {
    border-bottom: 1px solid theme('colors.white');
  }

  .string-2:before {
    border-bottom: 2px solid theme('colors.white');
  }

  .string-3:before {
    border-bottom: 3px solid theme('colors.white');
  }

  .string-4:before {
    border-bottom: 4px solid theme('colors.white');
  }

  .string-5:before {
    border-bottom: 5px solid theme('colors.white');
  }

  .string-6:before {
    border-bottom: 6px solid theme('colors.white');
  }
}
</style>