<template>
  <div class="training">
    <FretboardExercise @exercise-started="startExercise">
      <template #exercise-explication-title>
        Intervals finding exercise
      </template>

      <template #exercise-explication-content>
        <p>A note and an interval will be given to you. Find all the corresponding notes on the fretboard.</p>
        <p>Choose your settings below.</p>
      </template>

      <template #exercise-detail>
        <div class="w-full stats bg-base-200">
          <div class="stat">
            <div>Find a <span class="text-white p-1 font-bold text-base lg:text-lg rounded-lg note-to-find">{{ intervalToFind.name }}</span> from the selected <span class="text-white p-1 font-bold text-base lg:text-lg rounded-lg note-to-find">{{ startNote.pc }}</span></div>
            <div class="stat-value text-xl lg:text-2xl">{{ totalNoteFound }} / {{ totalNoteToFind }}</div>
          </div>

          <div class="stat">
            <div>Errors</div>
            <div class="stat-value text-xl lg:text-2xl">{{ errorsNumber }}</div>
          </div>
        </div>
      </template>

      <template #exercise-fretboard>
        <FretboardVisualizer
          :fretboard-notes="fretboardNotes"
          :is-note-selectable="true"
          :is-sound-active="false"
          @note-selected="selectNote"
        />
      </template>

      <template #exercise-modal>
        <input type="checkbox" id="modal-restart-exercise" class="modal-toggle" :checked="isStartModalDisplayed"/>
        <div class="modal">
          <div class="modal-box">
            <h3 class="font-bold text-lg">Congratulations you've found all the notes</h3>
            <p class="py-4">You could now restart the exercise with a new note or go back to another exercise.</p>
            <div class="modal-action">
              <button class="btn" @click="startExercise">Restart</button>
            </div>
          </div>
        </div>
      </template>
    </FretboardExercise>
  </div>
</template>

<style></style>
<script setup lang="ts">
import FretboardExercise from "@/modules/fretboardExercise/components/FretboardExercise.vue";

import FretboardVisualizer from "@/modules/fretboard/components/FretboardVisualizer.vue";
import {Interval, Note} from "@tonaljs/tonal";
import { computed, ref } from "vue";
import {
  getDisplayVariationTypeToUse,
  getFretboardNotes,
} from "@/modules/fretboard/services/fretboard";
import type { NotePosition } from "@/modules/fretboardExercise/types/fretboardExercise";
import type {
  FretboardNote,
  FretboardNoteSelectedEvent,
} from "@/modules/fretboard/types/fretboard";
import {
  getPositionOfNoteToFindOnFretboard, getRandomInterval,
  getRandomNote,
} from "@/modules/fretboardExercise/services/exercise";
import {getRandomInt, getRandomIntInclusive} from "@/scripts/helpers/utils";
import {getTransposedNote} from "@/scripts/helpers/notes";

const startNote = ref<typeof Note>();
const intervalToFind = ref<typeof Interval>();
const noteToFind = ref<typeof Note>();
const baseNotes: typeof Note[] = [
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

const isStartModalDisplayed = computed<boolean>(() => {
  return totalNoteFound.value === totalNoteToFind.value;
});

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
    true
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
}

/**
 * Select a random note on fretboard with the same octave as the given one
 *
 * @param note
 */
function displayNoteOnFretboard(note: typeof Note): void {
  const foundNotes: FretboardNote[] = [];

  fretboardNotes.value.forEach((strings: FretboardNote[]) => {
    const foundNoteOnFretboard = strings.find((fretboardNote: FretboardNote) => fretboardNote.note.name === note.name);

    if (foundNoteOnFretboard !== undefined) {
      foundNotes.push(foundNoteOnFretboard);
    }
  });

  const randomNoteIndex = getRandomInt(0, foundNotes.length);
  const selectedFretboardNote: FretboardNote = foundNotes[randomNoteIndex];

  fretboardNotes.value.some((strings: FretboardNote[]) => {
    const foundNoteOnFretboard = strings.find((fretboardNote: FretboardNote) => fretboardNote.key === selectedFretboardNote.key);

    if (foundNoteOnFretboard !== undefined) {
      foundNoteOnFretboard.isDisplayed = true;
      foundNoteOnFretboard.classes.push("note-to-find");
    }
  });
}

function selectNote(eventData: FretboardNoteSelectedEvent) {
  fretboardNotes.value.some((strings: FretboardNote[]) => {
    const foundNoteOnFretboard = strings.find((fretboardNote: FretboardNote) => fretboardNote.key === eventData.key);

    if (foundNoteOnFretboard !== undefined) {
      const foundIndex: number = positionsOfNoteToFind.value.findIndex((notePosition: NotePosition) => {
        return notePosition.string === foundNoteOnFretboard.string && notePosition.fret === foundNoteOnFretboard.fret;
      });

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
}
</script>

<style scoped lang="scss">
</style>