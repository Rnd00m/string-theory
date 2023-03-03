<template>
  <div class="fretboard-wrapper">
    <FretboardString
      v-for="(string, index) in fretboardParametersStore.strings"
      :key="'string-' + index"
      :string="string"
      :sampler="sampler"
    ></FretboardString>
    <FretboardMarker></FretboardMarker>
  </div>
</template>

<script>
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";

import FretboardString from "@/modules/fretboard/components/FretboardString.vue";
import FretboardMarker from "@/modules/fretboard/components/FretboardMarker.vue";
import * as Tone from "tone";

export default {
  name: "FretboardVisualizer",
  components: { FretboardMarker, FretboardString },
  computed: {
    sampler() {
      return new Tone.Sampler({
        urls: {
          A1: "A1.mp3",
          D1: "D1.mp3",
          A2: "A2.mp3",
          D2: "D2.mp3",
          A3: "A3.mp3",
          D3: "D3.mp3",
          A4: "A4.mp3",
          D4: "D4.mp3",
          A5: "A5.mp3",
          D5: "D5.mp3",
          A6: "A6.mp3",
          D6: "D6.mp3",
          A7: "A7.mp3",
          D7: "D7.mp3",
        },
        baseUrl: this.fretboardParametersStore.selectedSoundSample.url,
      }).toDestination();
    },
  },
  setup() {
    const fretboardParametersStore = useFretboardParametersStore();

    return { fretboardParametersStore };
  },
};
</script>

<style scoped lang="scss"></style>