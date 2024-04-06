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
import { chordTypeList } from "@/components/modules/settings/services/ChordTypeList";

const fretboardParametersStore = useFretboardParametersStore();
</script>

<style scoped lang="scss"></style>
