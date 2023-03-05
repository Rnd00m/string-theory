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
        @click="changeStringTuning(index, 1)"
      >
        +
      </button>
      <div class="text-center text-base lg:text-lg">
        {{ note.name }}
      </div>
      <button
        class="btn btn-square btn-xs lg:btn-sm btn-primary"
        @click="changeStringTuning(index, -1)"
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
import { Note } from "@tonaljs/tonal";

export default {
  name: "SettingsTuningSelection",
  setup() {
    const fretboardParametersStore = useFretboardParametersStore();

    return { fretboardParametersStore };
  },
  methods: {
    tuneUp() {
      this.changeGuitarTuning(1);
    },
    tuneDown() {
      this.changeGuitarTuning(-1);
    },
    changeStringTuning(noteIndex, direction) {
      let interval = direction > 0 ? "" : "-";
      interval = `${interval}2m`;

      let newNote = Note.get(
        Note.simplify(
          Note.transpose(
            this.fretboardParametersStore.fretboard.baseNotes[noteIndex],
            interval
          )
        )
      );
      this.fretboardParametersStore.fretboard.baseNotes.splice(noteIndex, 1, newNote);
    },
    changeGuitarTuning(direction) {
      for (let i = 0; i < this.fretboard.baseNotes.length; i++) {
        this.changeStringTuning(i, direction);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.chord-name {
  text-transform: capitalize;
}
</style>