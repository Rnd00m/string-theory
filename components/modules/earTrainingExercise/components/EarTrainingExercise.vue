<template>
  <div class="exercise-wrapper grid gap-4 w-80 sm:w-[32rem]">
    <div class="flex justify-center gap-4 p-4">
      <slot name="exercise-detail" />
    </div>

    <slot name="exercise-responses" />

    <slot name="exercise-modal" />
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped></style>
