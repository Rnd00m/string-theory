<template>
  <div class="fretboard-wrapper">
    <div class="strings-wrapper">
      <div class="string" :class="'string-' + (index + 1)" v-for="(string, index) in strings" :key="index">
        <div class="fret py-2 px-4" :key="note" v-for="note in string">
          <div class="note-wrapper text-center p-1">
            <div class="note rounded-lg text-center text-lg px-1 py-0"
                 :class="[selectedNote == note ? 'note-selected text-white' : '']">
              {{ note }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FretboardVisualizer",
  data() {
    return {
      strings: [
        ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'],
        ['B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
        ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G'],
        ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D'],
        ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'],
        ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'],
      ],
      selectedNote: null
    }
  },
  created() {
    this.emitter.on('selected-note-changed', note => {
      this.selectedNote = note
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

    .fret {
      border-right: 2px theme('colors.white-light') solid;

      .note-wrapper {
        z-index: 5;
        background: theme('colors.black');

        .note {
          &-selected {
            background: theme('colors.blue');
          }
        }
      }
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