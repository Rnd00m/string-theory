<template>
  <div class="form-control">
    <label class="label cursor-pointer">
      <input
        type="radio"
        name="variation"
        value=""
        class="radio radio-xs lg:radio-md radio-primary checked:bg-primary"
        v-model="selectedVariation"
      />
      <span class="label-text text-sm lg:text-base">&nbsp;&nbsp;-</span>
    </label>
  </div>
  <div class="form-control">
    <label class="label cursor-pointer">
      <input
        type="radio"
        name="variation"
        value="#"
        class="radio radio-xs lg:radio-md radio-primary checked:bg-primary"
        v-model="selectedVariation"
      />
      <span class="label-text text-sm lg:text-base">&nbsp;&nbsp;#</span>
    </label>
  </div>

  <div class="form-control">
    <label class="label cursor-pointer">
      <input
        type="radio"
        name="variation"
        value="b"
        class="radio radio-xs lg:text-base radio-primary checked:bg-primary"
        v-model="selectedVariation"
      />
      <span class="label-text text-sm lg:text-base">&nbsp;&nbsp;♭</span>
    </label>
  </div>
</template>

<script>
import { ref } from "vue";
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";

export default {
  name: "SettingsNoteVariation",
  setup() {
    const fretboardParametersStore = useFretboardParametersStore();

    const selectedVariation = ref("");

    return {
      fretboardParametersStore,
      selectedVariation,
    };
  },
  watch: {
    selectedVariation() {
      this.fretboardParametersStore.noteVariation = this.selectedVariation;
    },
  },
};
</script>

<style scoped lang="scss"></style>