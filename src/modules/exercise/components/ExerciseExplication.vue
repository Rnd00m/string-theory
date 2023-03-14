<template>
  <div class="exercise-wrapper flex justify-center gap-4">
    <div class="card bg-base-200 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Note finding exercise</h2>
        <p>A note will be given to you. Find all the occurrences on the fretboard.</p>
        <p>Choose your settings below.</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary" @click="startExercise">Start</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["exercise-started"]);

function startExercise() {
  emit("exercise-started");
}
</script>

<style scoped lang="scss">
</style>