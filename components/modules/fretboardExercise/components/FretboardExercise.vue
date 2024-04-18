<template>
  <div class="grid grid-flow-row gap-2 md:gap-8">
    <div class="flex justify-center px-4">
      <slot name="exercise-detail" />
    </div>

    <slot name="exercise-fretboard" />

    <slot name="exercise-modal" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
