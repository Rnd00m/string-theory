<template>
  <div class="fretboard-visualizer">
    <FretboardVisualizer></FretboardVisualizer>
  </div>
</template>

<script lang="ts">
import FretboardVisualizer from "@/components/fretboard/FretboardVisualizer.vue";

export default {
  components: {
    FretboardVisualizer
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
}
</style>