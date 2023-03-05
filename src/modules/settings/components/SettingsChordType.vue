<template>
  <div class="settings-chord-type">
    <select
      v-model="selectedChordType"
      class="select select-sm lg:select-md select-primary select-bordered w-full max-w-xs"
    >
      <option
        v-for="chord in chordTypeList"
        :key="chord.notation"
        :value="chord.notation"
      >
        {{ chord.name }}
      </option>
    </select>
  </div>
</template>

<script>
import { ref } from "vue";
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";
import { chordTypeList } from "@/modules/settings/services/ChordTypeList";

export default {
  name: "SettingsChordType",
  setup() {
    const fretboardParametersStore = useFretboardParametersStore();

    const selectedChordType = ref(fretboardParametersStore.chordType);

    return {
      fretboardParametersStore,
      selectedChordType,
      chordTypeList,
    };
  },
  watch: {
    selectedChordType() {
      this.fretboardParametersStore.setChord(this.selectedChordType);
    },
  },
};
</script>

<style scoped lang="scss"></style>