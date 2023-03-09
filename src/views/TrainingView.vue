<template>
  <div class="training">
    <FretboardVisualizer
      :base-notes="fretboardParametersStore.fretboard.baseNotes"
      :string-length="fretboardParametersStore.fretboard.stringLength"
      :is-note-selectable="true"
    ></FretboardVisualizer>
  </div>
</template>

<style></style>
<script setup lang="ts">
import FretboardVisualizer from "@/modules/fretboard/components/FretboardVisualizer.vue";
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";

const fretboardParametersStore = useFretboardParametersStore();
</script>