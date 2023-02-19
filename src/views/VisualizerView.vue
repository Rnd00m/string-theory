<template>
  <div class="fretboard-visualizer">
    <div class="grid lg:gap-8 gap-4">
      <FretboardSettingsLayout></FretboardSettingsLayout>
      <FretboardVisualizer></FretboardVisualizer>
      <InformationComponent></InformationComponent>
    </div>
  </div>
</template>

<script lang="ts">
import FretboardVisualizer from "@/components/fretboard/FretboardVisualizer.vue";
import FretboardSettingsLayout from "@/components/layouts/FretboardSettingsViewLayout.vue";
import InformationComponent from "@/components/information/InformationComponent.vue";

export default {
  components: {
    FretboardVisualizer,
    FretboardSettingsLayout,
    InformationComponent
  },
};
</script>

<style scoped lang="scss"></style>