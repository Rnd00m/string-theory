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
import FretboardVisualizer from "@/components/modules/fretboard/components/FretboardVisualizer.vue";
import FretboardSettingsLayout from "@/components/layouts/FretboardSettingsViewLayout.vue";
import InformationComponent from "@/components/modules/information/components/InformationComponent.vue";

export default {
  components: {
    FretboardVisualizer,
    FretboardSettingsLayout,
    InformationComponent
  },
};
</script>

<style scoped lang="scss"></style>