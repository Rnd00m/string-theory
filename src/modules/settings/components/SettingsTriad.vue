<template>
  <div class="form-control">
    <label class="label cursor-pointer">
      <input
        type="checkbox"
        class="checkbox checkbox-sm lg:checkbox-md checkbox-primary"
        v-model="showNotes"
      />
      <span class="label-text text-sm lg:text-base"
        >&nbsp;&nbsp;Show notes</span
      >
    </label>
  </div>
</template>

<script>
import { ref } from "vue";
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";

export default {
  name: "SettingsTriad",
  setup() {
    const fretboardParametersStore = useFretboardParametersStore();
    const showNotes = ref(false);

    return {
      fretboardParametersStore,
      showNotes,
    };
  },
  watch: {
    showNotes() {
      this.fretboardParametersStore.showNotes = this.showNotes;
    },
  },
};
</script>

<style scoped lang="scss"></style>