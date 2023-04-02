<template>
  <div
    class="fretboard-marker-wrapper h-6 grid lg:grid-cols-[repeat(13,_4.5rem)] grid-cols-[repeat(13,_3.5rem)] content-center"
  >
    <div
      class="fretboard-marker flex place-content-center"
      v-for="(n, index) in props.stringLength + 1"
      :key="n"
    >
      <template v-if="dotsPosition.includes(index)">
        <div class="marker-dot rounded-full bg-base-content inline-block"></div>
      </template>
      <template v-else-if="doubleDotsPosition.includes(index)">
        <div class="marker-dot rounded-full bg-base-content inline-block mr-1"></div>
        <div class="marker-dot rounded-full bg-base-content inline-block"></div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
  stringLength: number;
}
const props = defineProps<Props>();

// TODO : add function to calculate dot position automatically
const dotsPosition = ref([1, 3, 5, 7, 9, 15, 17, 19, 21]);
const doubleDotsPosition = ref([12, 24]);
</script>

<style scoped lang="scss">
.fretboard-marker-wrapper {
  .fretboard-marker {
    .marker-dot {
      height: 0.3em;
      width: 0.3em;
    }
  }
}
</style>