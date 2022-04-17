<template>
  <div class="fretboard-wrapper">
    <FretboardString v-for="(string, index) in fretboardParametersStore.strings" :key="'string-' + index" :string="string"></FretboardString>
    <FretboardMarker></FretboardMarker>
  </div>
</template>

<script>
import { useFretboardParametersStore } from "@/stores/fretboardParameters";

import FretboardString from "@/components/fretboard/FretboardString.vue";
import FretboardMarker from "@/components/fretboard/FretboardMarker.vue";

export default {
  name: "FretboardVisualizer",
  components: { FretboardMarker, FretboardString },
  setup() {
    const fretboardParametersStore = useFretboardParametersStore();

    return { fretboardParametersStore }
  }
}
</script>

<style scoped lang="scss">
</style>