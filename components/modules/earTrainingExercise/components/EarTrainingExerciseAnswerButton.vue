<template>
  <button
    class="btn btn-primary normal-case"
    :class="buttonClass"
    @click="checkAnswer"
  >
    {{ props.interval.name }}
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
  interval: Interval;
  intervalToFind: Interval;
}
const props = defineProps<Props>();
const emit = defineEmits(["earTrainingExercise:answered"]);

const buttonClass = ref<string | null>(null);

function checkAnswer(): void {
  const isAnswerCorrect: boolean =
    props.interval.name === props.intervalToFind.name;

  if (!isAnswerCorrect) buttonClass.value = "btn-error";
  else buttonClass.value = "btn-success";

  emit("earTrainingExercise:answered", isAnswerCorrect);
}
</script>

<style scoped></style>
