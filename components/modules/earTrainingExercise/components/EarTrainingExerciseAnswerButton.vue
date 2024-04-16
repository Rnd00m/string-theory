<template>
  <button
    class="btn btn-primary normal-case"
    :class="buttonClass"
    @click="checkAnswer"
    :disabled="!isExerciseInProgress && !isAnswerCorrect"
  >
    {{ props.interval.name }}
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
  interval: Interval;
  intervalToFind: Interval;
  isExerciseInProgress: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits(["earTrainingExercise:answered"]);

const buttonClass = ref<string | null>(null);
const isAnswerCorrect = ref<boolean>(false);

function checkAnswer(): void {
  isAnswerCorrect.value = props.interval.name === props.intervalToFind.name;

  if (!isAnswerCorrect.value) buttonClass.value = "btn-error";
  else buttonClass.value = "btn-success";

  emit("earTrainingExercise:answered", isAnswerCorrect.value);
}
</script>

<style scoped></style>
