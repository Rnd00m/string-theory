<template>
  <div class="training">
    <FretboardExercise>
      <template #exercise-detail>
        <div class="stats bg-base-300">
          <div class="stat">
            <div>
              Find all
              <span
                class="text-white p-1 font-bold text-base lg:text-lg rounded-lg note-to-find"
                >{{ noteToFind.pc }}</span
              >
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
        </div>
        <button
          class="btn btn-outline self-center"
          v-if="!isExerciseInProgress"
        >
          <SvgIcon type="mdi" :path="mdiRestart" @click="startExercise" />
        </button>
      </template>

      <template #exercise-fretboard>
        <FretboardViewer
          :fretboard-notes="fretboardNotes"
          :is-note-selectable="isExerciseInProgress"
          :is-sound-active="false"
          @note-selected="selectNote"
        />
      </template>

      <template #exercise-modal>
        <BaseDialog
          ref="endExerciseDialog"
          title="Congratulations you've found all the notes"
          confirm-text="Restart"
          show-cancel
          show-confirm
          @confirm="startExercise"
        >
          <p class="py-4">
            You could now restart the exercise with a new note or go back to
            another exercise.
          </p>
        </BaseDialog>
      </template>
    </FretboardExercise>
  </div>
</template>

<style></style>
<script setup lang="ts">
import FretboardExercise from "@/components/modules/fretboardExercise/components/FretboardExercise.vue";
import { Note } from "@tonaljs/tonal";
import { ref } from "vue";
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
import BaseDialog from "@/components/BaseDialog.vue";
import { mdiRestart } from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";

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

const endExerciseDialog = ref<InstanceType<typeof BaseDialog>>();
const openEndExerciseDialog = () => endExerciseDialog.value?.open();

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
    openEndExerciseDialog();
    isExerciseInProgress.value = false; // At the end of the exercise, we disable the selection of notes to preserve the state
  }
}

startExercise();
</script>

<style scoped lang="scss"></style>
