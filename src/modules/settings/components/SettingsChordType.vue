<template>
  <BaseSelect
    name="chord-type"
    :items="chordTypeList"
    value="notation"
    display="name"
    v-model="fretboardParametersStore.chordType"
  />
</template>

<script setup lang="ts">
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";
import { chordTypeList } from "@/modules/settings/services/ChordTypeList";
import BaseSelect from "@/components/base/BaseSelect.vue";

const fretboardParametersStore = useFretboardParametersStore();
</script>

<style scoped lang="scss"></style>
