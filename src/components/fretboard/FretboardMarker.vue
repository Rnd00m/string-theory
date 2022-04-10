<template>
  <div class="fretboard-marker-wrapper">
    <div
      class="fretboard-marker text-center"
      v-for="(n, index) in this.stringLength + 1"
      :key="n"
    >
      <template v-if="dotsPosition.includes(index)">
        <div class="marker-dot"></div>
      </template>
      <template v-else-if="doubleDotsPosition.includes(index)">
        <div class="marker-dot"></div>
        <div class="marker-dot"></div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "FretboardMarker",
  data() {
    return {
      dotsPosition: [1, 3, 5, 7, 9, 15, 17, 19, 21],
      doubleDotsPosition: [12, 24],
    }
  },
  props: {
    stringLength: {
      type: Number,
      required: false,
      default: 12
    }
  },
}
</script>

<style scoped lang="scss">
.fretboard-marker-wrapper {
  display: grid;
  grid-template-columns: repeat(13, 5em);

  .fretboard-marker {
    .marker-dot {
      height: 0.3em;
      width: 0.3em;
      margin-left: 0.2em;
      margin-right: 0.2em;
      border-radius: 50%;
      background: theme('colors.white-light');
      display: inline-block;
    }
  }
}
</style>