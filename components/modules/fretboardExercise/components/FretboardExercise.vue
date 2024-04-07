<template>
  <div class="exercise-wrapper flex flex-col">
    <div class="flex justify-center gap-4 p-4">
      <slot name="exercise-detail" />
    </div>

    <div class="exercise-fretboard">
      <slot name="exercise-fretboard" />
    </div>

    <slot name="exercise-modal" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
