<template>
  <div class="form-control">
    <label class="label cursor-pointer">
      <input
        type="checkbox"
        class="checkbox checkbox-sm lg:checkbox-md checkbox-primary"
        v-model="showTriads"
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
    const showTriads = ref(false);

    return {
      fretboardParametersStore,
      showTriads,
    };
  },
  watch: {
    showTriads() {
      this.fretboardParametersStore.showTriads = this.showTriads;
    },
  },
};
</script>

<style scoped lang="scss"></style>