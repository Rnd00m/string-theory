<template>
  <div class="fretboard-wrapper">
    <FretboardString v-for="note in baseNotesForString" :key="'string-' + note.name" :start-note="note"></FretboardString>
  </div>
</template>

<script>
import { Note, Interval } from '@tonaljs/tonal';
import FretboardString from "@/components/fretboard/FretboardString.vue";

export default {
  name: "FretboardVisualizer",
  components: {FretboardString},
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
      for (let i = 0; i < this.baseNotesForString.length; i++) {
        let newNote = Note.simplify(Note.transpose(this.baseNotesForString[i], '-2m'));

        this.baseNotesForString.splice(i, 1, newNote)
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