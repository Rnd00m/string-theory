<template>
  <div class="strings-wrapper">
    <div
      class="grid lg:grid-cols-[repeat(13,_4.5rem)] grid-cols-[repeat(13,_3.5rem)]"
    >
      <FretboardNote
        v-for="note in string"
        :key="note"
        :note="note"
        :sampler="sampler"
      ></FretboardNote>
    </div>
  </div>
</template>

<script>
import FretboardNote from "./FretboardNote.vue";
import { ref } from "vue";
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";
import * as Tone from "tone";

export default {
  name: "FretboardString",
  components: { FretboardNote },
  setup() {
    const fretboardParametersStore = useFretboardParametersStore();

    const selectedNote = ref(null);

    return { fretboardParametersStore, selectedNote };
  },
  props: {
    string: {
      type: Array,
      required: true,
    },
    sampler: {
      type: Tone.Sampler,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss"></style>