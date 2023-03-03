<template>
  <div class="form-control">
    <label class="label cursor-pointer">
      <input
        type="radio"
        name="variation"
        value=""
        class="radio radio-sm lg:radio-md radio-primary checked:bg-red-500"
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
        class="radio radio-sm lg:radio-md radio-primary checked:bg-red-500"
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
        value="♭"
        class="radio radio-sm lg:text-base radio-primary checked:bg-red-500"
        v-model="selectedVariation"
      />
      <span class="label-text text-sm lg:text-base">&nbsp;&nbsp;b</span>
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
      selectedVariation
    };
  },
  watch: {
    selectedVariation() {
      this.fretboardParametersStore.setVariation(this.selectedVariation);
    },
  },
};
</script>

<style scoped lang="scss"></style>