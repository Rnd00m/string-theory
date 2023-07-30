<template>
  <BaseSelect
    name="chord-type"
    :items="stringLength"
    v-model="fretboardParametersStore.fretboard.stringLength"
    value="string-length"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";
import BaseSelect from "@/components/base/BaseSelect.vue";

const fretboardParametersStore = useFretboardParametersStore();

const stringLength = ref<number[]>([12, 24]);
</script>

<style scoped lang="scss"></style>
