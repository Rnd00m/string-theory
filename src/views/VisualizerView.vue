<template>
  <div class="fretboard-visualizer">
    <div class="fretboard-wrapper">
      <div class="fret-number-row">

      </div>
      <div class="strings-wrapper">
        <div class="string" :class="'string-' + (index + 1)" v-for="(string, index) in strings" :key="index">
          <div class="fret py-2 px-5" :key="note" v-for="note in string">
            <div class="note rounded-lg text-center text-lg">
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
  data() {
    return {
      strings: [
        ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'],
        ['B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
        ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G'],
        ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D'],
        ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'],
        ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'],
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.fretboard-visualizer {
  min-height: 100vh;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;

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
        border-right: 2px white solid;

        .note {
          background: #272727;
          z-index: 5;
        }
      }
    }

    .string-1:before {
      border-bottom: 1px solid white;
    }

    .string-2:before {
      border-bottom: 2px solid white;
    }

    .string-3:before {
      border-bottom: 3px solid white;
    }

    .string-4:before {
      border-bottom: 4px solid white;
    }

    .string-5:before {
      border-bottom: 5px solid white;
    }

    .string-6:before {
      border-bottom: 6px solid white;
    }
  }
}
</style>