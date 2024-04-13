<template xmlns:lg="http://www.w3.org/1999/xhtml">
  <div class="training">
    <FretboardExercise>
      <template #exercise-detail>
        <div class="stats bg-base-300">
          <div class="stat">
            <div>
              Find all
              <span
                v-if="!isFirstLoad"
                class="text-white p-1 font-bold text-base lg:text-lg rounded-lg note-to-find p-1.5"
                >{{ noteToFind.pc }}
              </span>
              <span v-else class="loading loading-dots loading-xs text-primary"></span>
              on the fretboard
            </div>
            <div class="stat-value text-xl lg:text-2xl">
              {{ totalNoteFound }} / {{ totalNoteToFind }}
            </div>
          </div>

          <div class="stat">
            <div>Errors</div>
            <div class="stat-value text-xl lg:text-2xl">{{ errorsNumber }}</div>
          </div>
          <div class="stat" v-if="!isExerciseInProgress && !isFirstLoad">
            <button
                class="btn btn-outline self-center"
                @click="startExercise"
            >
              <SvgIcon type="mdi" :path="mdiRestart"/>
            </button>
          </div>
        </div>
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
import { Note } from "@tonaljs/tonal";
import {
  getDisplayVariationTypeToUse,
  getFretboardNotes,
} from "@/components/modules/fretboard/services/fretboard";
import {
  getPositionOfNoteToFindOnFretboard,
  getRandomNote,
} from "@/components/modules/fretboardExercise/services/exercise";
import type {
  FretboardNote,
  FretboardNoteSelectedEvent,
} from "@/components/modules/fretboard/types/fretboard";
import type { NotePosition } from "@/components/modules/fretboardExercise/types/fretboardExercise";
import { mdiRestart } from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";

definePageMeta({
  title: 'Learn to find notes on fretboard'
})

useSEODescription("Discover a practical exercise designed to help musicians find notes on their instrument's fretboard. Perfect for guitarists and bassists, this exercise offers a hands-on approach to improve fretboard navigation and enhance musical understanding. Try it now to sharpen your skills and master the fretboard!");

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

/**
 * Start a new exercise by selecting a new note to find and resetting the fretboard
 */
function startExercise(): void {
  noteToFind.value = getRandomNote();
  fretboardNotes.value = getFretboardNotes(
    baseNotes,
    12,
    [],
    getDisplayVariationTypeToUse(noteToFind.value),
    false
  );
  positionsOfNoteToFind.value = getPositionOfNoteToFindOnFretboard(
    fretboardNotes.value,
    [noteToFind.value],
    false
  );
  totalNoteToFind.value = positionsOfNoteToFind.value.length;
  totalNoteFound.value = 0;
  errorsNumber.value = 0;
  isExerciseInProgress.value = true; // Enable the note selection
  isFirstLoad.value = false;
}

function selectNote(eventData: FretboardNoteSelectedEvent) {
  // We check if the note selected is the one to find
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
