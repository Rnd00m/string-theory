<template>
  <div class="fretboard-visualizer">
    <div class="grid gap-8">
      <ChordInformation></ChordInformation>
      <FretboardVisualizer></FretboardVisualizer>
      <FretboardSettings></FretboardSettings>
    </div>
  </div>
</template>

<script lang="ts">
import FretboardVisualizer from "@/components/fretboard/FretboardVisualizer.vue";
import FretboardSettings from "@/components/fretboard/FretboardSettings.vue";
import ChordInformation from "@/components/information/ChordInformation.vue";

export default {
  components: {
    FretboardVisualizer,
    FretboardSettings,
    ChordInformation
  },
};
</script>

<style scoped lang="scss"></style>