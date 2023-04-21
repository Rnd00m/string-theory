<template>
  <div class="training w-72 sm:w-[32rem]">
    <EarTrainingExercise @exercise-started="startExercise">
      <template #exercise-explication-title>
        Ear training with intervals
      </template>

      <template #exercise-explication-content>
        <p>Listen and find the correct interval</p>
      </template>

      <template #exercise-detail>
        <div class="stats bg-base-200">
          <div class="stat">
            <div>Find this interval</div>
            <div class="stat-value text-xl lg:text-2xl">
              <button
                class="btn btn-accent btn-md gap-2"
                @click="playExerciseNotes"
              >
                <svg-icon type="mdi" :path="mdiPlay" size="28" />
              </button>
            </div>
          </div>

          <div class="stat">
            <div>Errors</div>
            <div class="stat-value text-xl lg:text-2xl">{{ errorsNumber }}</div>
          </div>
        </div>
      </template>

      <template #exercise-responses>
        <div class="grid grid-cols-2 gap-4">
          <button
            class="btn btn-primary normal-case"
            v-for="interval in intervalsList"
            :key="interval.name"
          >{{ interval.name }}</button>
        </div>
      </template>

      <template #exercise-modal>
<!--        <input type="checkbox" id="modal-restart-exercise" class="modal-toggle" :checked="isStartModalDisplayed"/>
        <div class="modal">
          <div class="modal-box">
            <h3 class="font-bold text-lg">Congratulations you've found all the notes</h3>
            <p class="py-4">You could now restart the exercise with a new note or go back to another exercise.</p>
            <div class="modal-action">
              <button class="btn" @click="startExercise">Restart</button>
            </div>
          </div>
        </div>-->
      </template>
    </EarTrainingExercise>
  </div>
</template>

<script setup lang="ts">
import EarTrainingExercise from "@/modules/earTrainingExercise/components/EarTrainingExercise.vue";
import { Interval, Note } from "@tonaljs/tonal";
import { ref } from "vue";
import { getIntervalsList } from "@/commons/helpers/intervals";
import { getRandomNote } from "@/modules/fretboardExercise/services/exercise";
import { getRandomInt } from "@/commons/helpers/utils";
import * as Tone from "tone";
import { soundSampleList } from "@/modules/settings/services/SoundSampleList";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPlay } from '@mdi/js';

const intervalsList = ref<Interval[]>(
  getIntervalsList(Interval.get("2m"), Interval.get("8P"))
);
const rootNote = ref<Note | null>(null);
const intervalToFind = ref<Interval | null>(null);
const noteWithIntervalApplied = ref<Note | null>(null);
const errorsNumber = ref<number>(0);

const sampler = new Tone.Sampler({
  urls: {
    A1: "A1.mp3",
    D1: "D1.mp3",
    A2: "A2.mp3",
    D2: "D2.mp3",
    A3: "A3.mp3",
    D3: "D3.mp3",
    A4: "A4.mp3",
    D4: "D4.mp3",
    A5: "A5.mp3",
    D5: "D5.mp3",
    A6: "A6.mp3",
    D6: "D6.mp3",
    A7: "A7.mp3",
    D7: "D7.mp3",
  },
  baseUrl: soundSampleList.find(soundSample => soundSample.name === "Acoustic Guitar Nylon")?.url,
}).toDestination();

function startExercise(): void {
  rootNote.value = getRandomNote({
    lowerNote: Note.get("E2"),
    higherNote: Note.get("E5"),
  });

  const randomIntervalIndex = getRandomInt(0, intervalsList.value.length);

  intervalToFind.value = intervalsList.value[randomIntervalIndex];
  noteWithIntervalApplied.value = Note.get(Note.transpose(rootNote.value.name, intervalToFind.value.name));

  console.log(rootNote.value.name, intervalToFind.value.name, noteWithIntervalApplied.value.name)

  setTimeout(() => {
    playExerciseNotes();
  }, 600);
}

function playExerciseNotes(): void {
  const now = Tone.now();

  sampler.triggerAttackRelease(rootNote.value.name, 2, now);
  sampler.triggerAttackRelease(noteWithIntervalApplied.value.name, 2, now + 0.5);
}
</script>

<style scoped>

</style>