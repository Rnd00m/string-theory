<template>
  <div class="fretboard-visualizer">
    <div class="grid gap-8">
      <ChordInformation v-if="fretboardParametersStore.displayType === 'chord'"></ChordInformation>
      <FretboardVisualizer></FretboardVisualizer>
      <FretboardSettings></FretboardSettings>
    </div>
  </div>
</template>

<script lang="ts">
import { useFretboardParametersStore } from "@/stores/fretboardParameters";
import FretboardVisualizer from "@/components/fretboard/FretboardVisualizer.vue";
import FretboardSettings from "@/components/fretboard/FretboardSettings.vue";
import ChordInformation from "@/components/information/ChordInformation.vue";

export default {
  components: {
    FretboardVisualizer,
    FretboardSettings,
    ChordInformation
  },
  setup() {
    const fretboardParametersStore = useFretboardParametersStore();

    return { fretboardParametersStore };
  },
};
</script>

<style scoped lang="scss"></style>