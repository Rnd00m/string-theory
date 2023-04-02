<template>
  <div class="exercise-list-wrapper grid grid-cols-2 gap-x-6 lg:gap-x-12 gap-y-3 lg:gap-y-6">
    <BaseCardLink
      :to="{name: 'exercise.findNotes'}"
      :icon-path="mdiMagnify"
      icon-class="bg-pink-500"
    >
      <template #title>Find notes on fretboard</template>
      <template #content>To perfectly know your fretboard</template>
      <template #card-actions>
        <RouterLink class="btn btn-primary place-self-end" >Start</RouterLink>
      </template>
    </BaseCardLink>

    <BaseCardLink
      :to="{name: 'exercise.findIntervals'}"
      :icon-path="mdiMusicAccidentalSharp"
      icon-class="bg-green-500"
    >
      <template #title>Find intervals on fretboard</template>
      <template #content>To easily find your chord positions on fretboard</template>
      <template #card-actions>
        <RouterLink class="btn btn-primary place-self-end" >Start</RouterLink>
      </template>
    </BaseCardLink>

<!--    <BaseCardLink
      :to="{name: 'exercise.findNotes'}"
      :icon-path="'afafaf'"
      icon-class="bg-blue-500"
    >
      <template #title>Find intervals on fretboard</template>
      <template #content>To perfectly know different prositions on fretboard</template>
      <template #card-actions>
        <RouterLink class="btn btn-primary place-self-end" >Start</RouterLink>
      </template>
    </BaseCardLink>

    <BaseCardLink
      :to="{name: 'exercise.findNotes'}"
      :icon-path="'afafaf'"
      icon-class="bg-yellow-500"
    >
      <template #title>Find intervals on fretboard</template>
      <template #content>To perfectly know different prositions on fretboard</template>
      <template #card-actions>
        <RouterLink class="btn btn-primary place-self-end" >Start</RouterLink>
      </template>
    </BaseCardLink>-->
  </div>
</template>

<style></style>
<script setup lang="ts">
import { mdiMagnify, mdiMusicAccidentalSharp } from '@mdi/js';

import BaseCardLink from "@/components/base/cards/BaseCardLink.vue";
</script>