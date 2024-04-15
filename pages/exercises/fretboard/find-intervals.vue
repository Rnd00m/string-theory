<template>
  <div class="training">
    <FretboardExercise>
      <template #exercise-detail>
        <BaseStats>
          <BaseStat>
            <template #title>
              Find a
              <span
                v-if="!isFirstLoad"
                class="text-white p-1 font-bold text-base lg:text-lg rounded-lg note-to-find p-1.5"
              >{{ intervalToFind.name }}</span>
              <span v-else class="loading loading-dots loading-xs text-primary"></span>
              from the selected
              <span
                v-if="!isFirstLoad"
                class="text-white p-1 font-bold text-base lg:text-lg rounded-lg note-to-find p-1.5"
              >{{ startNote.pc }}</span>
              <span v-else class="loading loading-dots loading-xs text-primary"></span>
            </template>
            <template #value>
              {{ totalNoteFound }} / {{ totalNoteToFind }}
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

          <BaseStat v-if="!isExerciseInProgress && !isFirstLoad">
            <template #value>
              <button
                class="btn btn-outline self-center"
                @click="startExercise"
              >
                <SvgIcon type="mdi" :path="mdiRestart"/>
              </button>
            </template>
          </BaseStat>
        </BaseStats>
      </template>

      <template #exercise-fretboard>
        <FretboardViewer
            v-if="!isFirstLoad"
            :fretboard-notes="fretboardNotes"
            :is-note-selectable="isExerciseInProgress"
            :is-sound-active="false"
            @note-selected="selectNote"
        />
        <div class="skeleton w-[45.5rem] lg:w-[58.5rem] h-[15rem] lg:h-[18rem]" v-else />
      </template>
    </FretboardExercise>
  </div>
</template>

<style></style>
<script setup lang="ts">
import FretboardExercise from "@/components/modules/fretboardExercise/components/FretboardExercise.vue";

import {Note} from "@tonaljs/tonal";
import {
  getDisplayVariationTypeToUse,
  getFretboardNotes,
} from "@/components/modules/fretboard/services/fretboard";
import {
  getPositionOfNoteToFindOnFretboard,
  getRandomInterval,
  getRandomNote,
} from "@/components/modules/fretboardExercise/services/exercise";
import {getRandomInt} from "@/utils/helpers/utils";
import {getTransposedNote} from "@/utils/helpers/notes";
import type {
  FretboardNote,
  FretboardNoteSelectedEvent,
} from "@/components/modules/fretboard/types/fretboard";
import type {NotePosition} from "@/components/modules/fretboardExercise/types/fretboardExercise";
import {mdiRestart} from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";

definePageMeta({
  title: 'Learn to find intervals on fretboard'
})

useSEODescription("Explore an engaging exercise focused on locating intervals across the fretboard of your instrument. Designed for guitarists and bassists, this exercise provides a practical approach to improve your ability to identify intervals visually on the fretboard. Try it now to enhance your fretboard proficiency and strengthen your understanding of interval relationships!")

const startNote = ref<Note>();
const intervalToFind = ref<Interval>();
const noteToFind = ref<Note>();
const baseNotes: Note[] = [
  Note.get("E4"),
  Note.get("B3"),
  Note.get("G3"),
  Note.get("D3"),
  Note.get("A2"),
  Note.get("E2"),
];

const fretboardNotes = ref<FretboardNote[][]>([]);
const positionsOfNoteToFind = ref<NotePosition[]>([]);
const totalNoteToFind = ref<number>(0);
const totalNoteFound = ref<number>(0);
const errorsNumber = ref<number>(0);
const isExerciseInProgress = ref<boolean>(false);
const isFirstLoad = ref<boolean>(true);

function startExercise(): void {
  // Get a random start note and a random interval to start exercise
  startNote.value = getRandomNote({
    lowerNote: Note.get("E2"),
    higherNote: Note.get("E5"),
  });
  intervalToFind.value = getRandomInterval();

  // Initialize fretboard
  fretboardNotes.value = getFretboardNotes(
      baseNotes,
      12,
      [],
      getDisplayVariationTypeToUse(startNote.value),
      false
  );

  // Display start note on fretboard
  displayNoteOnFretboard(startNote.value);

  noteToFind.value = getTransposedNote(startNote.value, intervalToFind.value);

  positionsOfNoteToFind.value = getPositionOfNoteToFindOnFretboard(
      fretboardNotes.value,
      [noteToFind.value],
      true
  );

  if (positionsOfNoteToFind.value.length === 0) {
    startExercise();
  }

  totalNoteToFind.value = positionsOfNoteToFind.value.length;
  totalNoteFound.value = 0;
  errorsNumber.value = 0;
  isExerciseInProgress.value = true; // Enable the note selection
  isFirstLoad.value = false;
}

/**
 * Select a random note on fretboard with the same octave as the given one
 */
function displayNoteOnFretboard(note: Note): void {
  const foundNotes: FretboardNote[] = [];

  fretboardNotes.value.forEach((strings: FretboardNote[]) => {
    const foundNoteOnFretboard = strings.find(
        (fretboardNote: FretboardNote) => fretboardNote.note.name === note.name
    );

    if (foundNoteOnFretboard !== undefined) {
      foundNotes.push(foundNoteOnFretboard);
    }
  });

  const randomNoteIndex = getRandomInt(0, foundNotes.length);
  const selectedFretboardNote: FretboardNote = foundNotes[randomNoteIndex];

  fretboardNotes.value.some((strings: FretboardNote[]) => {
    const foundNoteOnFretboard = strings.find(
        (fretboardNote: FretboardNote) =>
            fretboardNote.key === selectedFretboardNote.key
    );

    if (foundNoteOnFretboard !== undefined) {
      foundNoteOnFretboard.isDisplayed = true;
      foundNoteOnFretboard.classes.push("note-to-find");
    }
  });
}

function selectNote(eventData: FretboardNoteSelectedEvent) {
  fretboardNotes.value.some((strings: FretboardNote[]) => {
    const foundNoteOnFretboard = strings.find(
        (fretboardNote: FretboardNote) => fretboardNote.key === eventData.key
    );

    if (foundNoteOnFretboard !== undefined) {
      const foundIndex: number = positionsOfNoteToFind.value.findIndex(
          (notePosition: NotePosition) => {
            return (
                notePosition.string === foundNoteOnFretboard.string &&
                notePosition.fret === foundNoteOnFretboard.fret
            );
          }
      );

      let noteClasses: string[] = foundNoteOnFretboard.classes;

      if (foundIndex < 0 && !noteClasses.includes("note-error")) {
        foundNoteOnFretboard.isDisplayed = true;
        foundNoteOnFretboard.classes.push("note-error");
        errorsNumber.value += 1;
      } else if (foundIndex >= 0 && !noteClasses.includes("note-success")) {
        foundNoteOnFretboard.isDisplayed = true;
        foundNoteOnFretboard.classes.push("note-success");
        totalNoteFound.value += 1;
      }
      return true;
    }
    return false;
  });

  // If user has found all the notes, we show a dialog to restart the exercise
  if (totalNoteFound.value === totalNoteToFind.value) {
    isExerciseInProgress.value = false; // At the end of the exercise, we disable the selection of notes to preserve the state
  }
}

onMounted(() => {
  startExercise();
});
</script>

<style scoped lang="scss"></style>
