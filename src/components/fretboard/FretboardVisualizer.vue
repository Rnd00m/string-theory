<template>
  <div class="fretboard-wrapper">
    <FretboardString v-for="note in tuningStore.notes" :key="'string-' + note" :start-note="note"></FretboardString>
    <FretboardMarker></FretboardMarker>
  </div>
</template>

<script>
import { useTuningStore } from "@/stores/tuning";

import FretboardString from "@/components/fretboard/FretboardString.vue";
import FretboardMarker from "@/components/fretboard/FretboardMarker.vue";

export default {
  name: "FretboardVisualizer",
  components: { FretboardMarker, FretboardString },
  setup() {
    const tuningStore = useTuningStore();

    return { tuningStore }
  }
}
</script>

<style scoped lang="scss">
</style>