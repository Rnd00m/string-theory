<template>
  <div class="form-control" v-for="note in notes" :key="note">
    <label class="label cursor-pointer">
      <input
        :id="note"
        name="note"
        :value="note"
        v-model="selectedNote"
        type="radio"
        class="radio radio-sm lg:radio-md radio-primary checked:bg-red-500"
      />
      <span class="label-text text-sm lg:text-base"
        >&nbsp;&nbsp;{{ note }}</span
      >
    </label>
  </div>
</template>

<script>
import { ref } from "vue";
import { useFretboardParametersStore } from "@/stores/fretboardParameters";

export default {
  name: "SettingsNote",
  setup() {
    const fretboardParametersStore = useFretboardParametersStore();

    const selectedNote = ref(fretboardParametersStore.note);

    const notes = ref(["A", "B", "C", "D", "E", "F", "G"]);

    return {
      fretboardParametersStore,
      selectedNote,
      notes
    };
  },
  watch: {
    selectedNote() {
      this.fretboardParametersStore.setNote(this.selectedNote);
    },
  },
};
</script>

<style scoped lang="scss"></style>