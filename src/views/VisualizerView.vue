<template>
  <div class="fretboard-visualizer">
    <div class="grid gap-8">
      <FretboardVisualizer></FretboardVisualizer>
      <FretboardSettings></FretboardSettings>
    </div>
  </div>
</template>

<script lang="ts">
import FretboardVisualizer from "@/components/fretboard/FretboardVisualizer.vue";
import FretboardSettings from "@/components/fretboard/FretboardSettings.vue";

export default {
  components: {
    FretboardVisualizer,
    FretboardSettings,
  },
};
</script>

<style scoped lang="scss"></style>