<template>
  <div class="fretboard-visualizer">
    <div class="fretboard-wrapper">
      <div class="fret-number-row">

      </div>
      <div class="strings-wrapper">
        <div class="string grid grid-flow-col auto-cols-max" :class="'string-1'" :key="string" v-for="(string, index) in strings">
          <div class="fret p-4" :key="note" v-for="note in string">
            <div class="note text-2xl">
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
      strings: {
        "E4": ['E', 'F', 'G', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E'],
        "B3": ['E', 'F', 'G', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E'],
        "G3": ['E', 'F', 'G', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E'],
        "D3": ['E', 'F', 'G', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E'],
        "A2": ['E', 'F', 'G', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E'],
        "E2": ['E', 'F', 'G', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E'],
      }
    }
  }
}
</script>

<style scoped lang="scss">
@media (min-width: 1024px) {
  .fretboard-visualizer {
    min-height: 100vh;
    display: flex;
    align-items: center;

    .strings-wrapper {
      .string {
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
        }
      }

      .string-1:before {
        border-bottom: 2px solid white;
      }
    }
  }

}
</style>