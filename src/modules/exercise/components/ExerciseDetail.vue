<template>
  <div class="exercise-wrapper flex justify-center gap-4">
    <div class="card bg-base-200 shadow-xl" v-if="!isExerciseStarted">
      <div class="card-body">
        <h2 class="card-title">Note finding exercise</h2>
        <p>You must find all the notes specified by the exercise</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary" @click="startExercise">Start</button>
        </div>
      </div>
    </div>
    <div class="stats bg-base-200 shadow-xl" v-else>
      <div class="stat">
        <div class="stat-title">Find all <span class="text-primary font-bold text-lg">{{ noteToFind.pc }}</span> on the fretboard</div>
        <div class="stat-value">0 / 6</div>
      </div>

      <div class="stat">
        <div class="stat-title">Errors</div>
        <div class="stat-value">5</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Note, Scale } from "@tonaljs/tonal";
import { ref } from "vue";

const noteToFind = ref<typeof Note>();
const isExerciseStarted = ref<boolean>(false);

function startExercise() {
  const chromaticScale: string[] = Scale.get("C chromatic").notes;
  const randomNote = Math.floor(Math.random() * chromaticScale.length);

  noteToFind.value = Note.get(chromaticScale[randomNote]);

  isExerciseStarted.value = true;
}
</script>

<style scoped lang="scss">
</style>