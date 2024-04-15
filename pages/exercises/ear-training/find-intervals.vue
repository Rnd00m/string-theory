<template>
  <div class="exercise-wrapper grid gap-4 md:w-2/3 w-full max-w-screen-md px-4">
    <BaseStats>
      <BaseStat>
        <template #value>
          <button
              class="btn btn-primary btn-md gap-2"
              @click="playExerciseNotes"
          >
            <svg-icon type="mdi" :path="mdiPlay" size="28"/>
          </button>
        </template>
      </BaseStat>

      <BaseStat>
        <template #title>
          Errors
        </template>
        <template #value>
          {{ errorsNumber }}
        </template>
      </BaseStat>

      <BaseStat>
        <template #title>
          Found
        </template>
        <template #value>
          {{ foundNumber }}
        </template>
      </BaseStat>
    </BaseStats>

    <div class="grid landscape:grid-cols-4 grid-cols-2 gap-4">
      <EarTrainingExerciseAnswerButton
          v-for="interval in intervalsList"
          :key="interval.name + exerciseCount"
          :interval="interval"
          :interval-to-find="intervalToFind"
          @earTrainingExercise:answered="consumeAnswerButtonClicked"
          :is-exercise-in-progress="isExerciseInProgress"
      />
    </div>

    <button
        class="btn btn-block btn-outline"
        @click="startExercise"
        v-if="!isExerciseInProgress"
    >
      <SvgIcon type="mdi" :path="mdiRestart"/>
    </button>
  </div>
</template>

<script setup lang="ts">
import EarTrainingExerciseAnswerButton
  from "@/components/modules/earTrainingExercise/components/EarTrainingExerciseAnswerButton.vue";
import {Interval, Note} from "@tonaljs/tonal";
import {ref} from "vue";
import {getIntervalsList} from "@/utils/helpers/intervals";
import {getRandomNote} from "@/components/modules/fretboardExercise/services/exercise";
import {getRandomInt, getSampler} from "@/utils/helpers/utils";
import * as Tone from "tone";
import {soundSampleList} from "@/components/modules/settings/services/SoundSampleList";
import SvgIcon from "@jamescoyle/vue-icon";
import {mdiPlay, mdiRestart} from "@mdi/js";

definePageMeta({
  title: 'Learn to recognize intervals by ear'
})

useSEODescription("Develop your ear training skills with the interval recognition exercise. Perfect for musicians of all levels, this exercise helps you train your ear to identify intervals by sound. Whether you're a guitarist, bassist, or any other musician, this exercise provides a valuable tool to enhance your musical abilities. Try it now to sharpen your ear and deepen your musical understanding!");

const intervalsList = ref<Interval[]>(
    getIntervalsList(Interval.get("2m"), Interval.get("8P"))
);
const rootNote = ref<Note | null>(null);
const intervalToFind = ref<Interval | null>(null);
const noteWithIntervalApplied = ref<Note | null>(null);
const errorsNumber = ref<number>(0);
const foundNumber = ref<number>(0);
const isExerciseInProgress = ref<boolean>(false);
const exerciseCount = ref<number>(0);

const sampler = getSampler(
    soundSampleList.find(
        (soundSample) => soundSample.name === "Acoustic Guitar Nylon"
    )?.url
);

function startExercise(): void {
  rootNote.value = getRandomNote({
    lowerNote: Note.get("E2"),
    higherNote: Note.get("E5"),
  });

  const randomIntervalIndex = getRandomInt(0, intervalsList.value.length);

  intervalToFind.value = intervalsList.value[randomIntervalIndex];
  noteWithIntervalApplied.value = Note.get(
      Note.simplify(
          Note.transpose(rootNote.value.name, intervalToFind.value.name)
      )
  );

  setTimeout(() => {
    playExerciseNotes();
  }, 600);
  isExerciseInProgress.value = true; // Enable the note selection
  exerciseCount.value += 1;
}

function playExerciseNotes(): void {
  const now = Tone.now();

  sampler.then((sampler) => {
    sampler.triggerAttackRelease(rootNote.value.name, 2, now);
    sampler.triggerAttackRelease(
        noteWithIntervalApplied.value.name,
        2,
        now + 0.5
    );
  });
}

function consumeAnswerButtonClicked(isCorrectlyAnswered: boolean): void {
  if (!isCorrectlyAnswered) errorsNumber.value += 1;
  else {
    foundNumber.value += 1;
    isExerciseInProgress.value = false;
  }
}

onMounted(() => {
  startExercise();
});
</script>

<style scoped></style>
