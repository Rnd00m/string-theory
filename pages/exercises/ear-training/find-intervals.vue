<template>
  <div class="training">
    <EarTrainingExercise>
      <template #exercise-detail>
        <div class="stats bg-base-300">
          <div class="stat">
            <div class="stat-value flex items-center justify-center">
              <button
                class="btn btn-primary btn-md gap-2"
                @click="playExerciseNotes"
              >
                <svg-icon type="mdi" :path="mdiPlay" size="28" />
              </button>
            </div>
          </div>

          <div class="stat">
            <div>Errors</div>
            <div class="stat-value text-xl lg:text-2xl">
              {{ errorsNumber }}
            </div>
          </div>
          <div class="stat">
            <div>Found</div>
            <div class="stat-value text-xl lg:text-2xl">
              {{ foundNumber }}
            </div>
          </div>
        </div>
        <button
          class="btn btn-outline self-center"
          v-if="!isExerciseInProgress"
        >
          <SvgIcon type="mdi" :path="mdiRestart" @click="startExercise" />
        </button>
      </template>

      <template #exercise-responses>
        <div class="grid landscape:grid-cols-4 grid-cols-2 gap-4">
          <EarTrainingExerciseAnswerButton
            v-for="interval in intervalsList"
            :key="
              interval.name + intervalToFind.name + noteWithIntervalApplied.name
            "
            :interval="interval"
            :interval-to-find="intervalToFind"
            @earTrainingExercise:answered="consumeAnswerButtonClicked"
          />
        </div>
      </template>

      <template #exercise-modal>
        <BaseDialog
          ref="exerciseModal"
          title="Congratulations you've found the correct interval"
          confirm-text="Restart"
          show-confirm
          @confirm="startExercise"
        >
          <p class="py-4">
            You could now restart the exercise with a new interval.
          </p>
        </BaseDialog>
      </template>
    </EarTrainingExercise>
  </div>
</template>

<script setup lang="ts">
import EarTrainingExercise from "@/components/modules/earTrainingExercise/components/EarTrainingExercise.vue";
import EarTrainingExerciseAnswerButton from "@/components/modules/earTrainingExercise/components/EarTrainingExerciseAnswerButton.vue";
import { Interval, Note } from "@tonaljs/tonal";
import { ref } from "vue";
import { getIntervalsList } from "@/utils/helpers/intervals";
import { getRandomNote } from "@/components/modules/fretboardExercise/services/exercise";
import { getRandomInt, getSampler } from "@/utils/helpers/utils";
import * as Tone from "tone";
import { soundSampleList } from "@/components/modules/settings/services/SoundSampleList";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPlay, mdiRestart } from "@mdi/js";
import BaseDialog from "@/components/BaseDialog.vue";

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

const exerciseModal = ref<InstanceType<typeof BaseDialog>>();
const openEndExerciseDialog = () => exerciseModal.value?.open();

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
    openEndExerciseDialog();
  }
}

startExercise();
</script>

<style scoped></style>
