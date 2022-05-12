<template>
  <div class="fretboard-visualizer">
    <div class="grid lg:gap-8 gap-4">
      <FretboardSettingsLayout></FretboardSettingsLayout>
      <FretboardVisualizer></FretboardVisualizer>
      <ChordInformation
        v-if="fretboardParametersStore.displayType === 'chord'"
      ></ChordInformation>
      <ScaleInformation v-else></ScaleInformation>
    </div>
  </div>
</template>

<script lang="ts">
import { useFretboardParametersStore } from "@/stores/fretboardParameters";
import FretboardVisualizer from "@/components/fretboard/FretboardVisualizer.vue";
import ChordInformation from "@/components/information/ChordInformation.vue";
import ScaleInformation from "@/components/information/ScaleInformation.vue";
import FretboardSettingsLayout from "@/components/layouts/FretboardSettingsViewLayout.vue";

export default {
  components: {
    FretboardVisualizer,
    FretboardSettingsLayout,
    ChordInformation,
    ScaleInformation,
  },
  setup() {
    const fretboardParametersStore = useFretboardParametersStore();

    return { fretboardParametersStore };
  },
};
</script>

<style scoped lang="scss"></style>
