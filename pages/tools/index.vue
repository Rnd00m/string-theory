<template>
  <div
    class="exercise-list-wrapper grid xs:grid-flow-row sm:grid-cols-2 gap-x-6 lg:gap-x-12 gap-y-3 lg:gap-y-6"
  >
    <BaseCardLink
      to="/tools/string-tension"
      :icon-path="mdiChartBar"
      icon-class="bg-pink-500"
    >
      <template #title>String tension calculator</template>
      <template #content
        >Calculate the tensions applied to the neck by the different
        strings</template
      >
    </BaseCardLink>

    <BaseCardLink
      to="/tools/tuner"
      :icon-path="mdiKnob"
      icon-class="bg-green-500"
    >
      <template #title>Tuner</template>
      <template #content>Keep your instrument in perfect pitch with ease</template>
    </BaseCardLink>

    <!--    <BaseCardLink
      :to="{name: 'exercises.earTraining.findIntervals'}"
      :icon-path="mdiEarHearing"
      icon-class="bg-blue-500"
    >
      <template #title>Find intervals by ear</template>
      <template #content>Learn to recognize different intervals by ear</template>
      <template #card-actions>
        <RouterLink class="btn btn-primary place-self-end" >Start</RouterLink>
      </template>
    </BaseCardLink>-->

    <!--    <BaseCardLink
      :to="{name: 'exercises.findNotes'}"
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
import {mdiChartBar, mdiKnob} from "@mdi/js";

definePageMeta({
  title: 'Tools'
})
</script>
