<template>
  <div class="flex flex-row-reverse justify-center gap-5 lg:gap-8">
    <div
      class="flex flex-col gap-1"
      v-for="(note, index) in fretboardParametersStore.fretboard
        .baseNotes"
      :key="'note-' + index"
    >
      <button
        class="btn btn-square btn-xs lg:btn-sm btn-primary"
        @click="fretboardParametersStore.changeStringTuning(index, 1)"
      >
        +
      </button>
      <div class="text-center text-base lg:text-lg">
        {{ note.name }}
      </div>
      <button
        class="btn btn-square btn-xs lg:btn-sm btn-primary"
        @click="fretboardParametersStore.changeStringTuning(index, -1)"
      >
        -
      </button>
    </div>
    <div class="flex flex-col gap-1">
      <button class="btn btn-square btn-xs lg:btn-sm" @click="tuneUp">
        +
      </button>
      <div class="text-center text-base lg:text-lg">All</div>
      <button class="btn btn-square btn-xs lg:btn-sm" @click="tuneDown">
        -
      </button>
    </div>
  </div>
</template>

<script>
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";

export default {
  name: "SettingsTuningSelection",
  setup() {
    const fretboardParametersStore = useFretboardParametersStore();

    return { fretboardParametersStore };
  },
  methods: {
    tuneUp() {
      this.fretboardParametersStore.changeGuitarTuning(1);
    },
    tuneDown() {
      this.fretboardParametersStore.changeGuitarTuning(-1);
    },
  },
};
</script>

<style scoped lang="scss">
.chord-name {
  text-transform: capitalize;
}
</style>