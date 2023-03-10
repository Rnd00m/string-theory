<template>
  <div class="fret-wrapper" @click="selectNote">
    <div class="note-wrapper text-center py-2 px-3 lg:px-4">
      <div
        class="note rounded-lg text-center text-base lg:text-lg font-bold"
        :class="[mappedNoteClass, props.selectedNoteClass]"
      >
        <span>{{ noteFullName }}</span>
        <span class="note-octave" v-if="fretboardParametersStore.showOctave">{{
          note.oct
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";
import * as Tone from "tone";
import { Note } from "@tonaljs/tonal";
import type { NoteClassMap } from "@/modules/fretboard/types/NoteClassMap";
import { computed } from "vue";
import { ScaleIntervalsEnum } from "@/scripts/enums/ScaleIntervalsEnum";
import { ChordIntervalsEnum } from "@/scripts/enums/ChordIntervalsEnum";
import type { SelectedNote } from "@/modules/fretboard/types/SelectedNote";

interface Props {
  string: number; // String of the current note
  fret: number; // Fret position of the current note
  note: typeof Note; // Current note to display on the fret
  sampler: Tone.Sampler;
  noteClassMap?: NoteClassMap[];
  showRootNoteBackground?: boolean; // Whether the background of the root note should be displayed or not
  showNoteBackground?: boolean; // Whether the background of the important notes should be displayed or not
  selectedNoteClass?: string;
  isSoundActive?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  showRootNoteBackground: true,
  showNoteBackground: true,
  selectedNoteClass: "",
  isSoundActive: false,
});

const emit = defineEmits(["note-selected"]);

const fretboardParametersStore = useFretboardParametersStore();

const noteFullName = computed(() => {
  return props.note.letter + beautifyAccidentalValue(props.note.acc);
})

const mappedNoteClass = computed<string>(() => {
  if (props.noteClassMap === undefined) {
    return "";
  }

  const noteClass = props.noteClassMap.find(noteClassMap => noteClassMap.note === props.note.pc);

  if (noteClass !== undefined) {
    if (noteClass.intervals === ChordIntervalsEnum.Root || noteClass.intervals === ScaleIntervalsEnum.Root) {
      if (!props.showRootNoteBackground) {
        return "";
      }
    } else {
      if (!props.showNoteBackground) {
        return "";
      }
    }
    return noteClass.class;
  }

  return "";
});

function beautifyAccidentalValue(accidental: string): string {
  if (accidental === "b") return "♭";
  if (accidental === "bb") return "𝄫";
  if (accidental === "##") return "𝄪";
  if (accidental === undefined) return "";
  return accidental;
}

function selectNote() {
  const selectedNoteEvent: SelectedNote = {
    key: `string-${props.string}-fret-${props.fret}`,
    string: props.string,
    fret: props.fret,
    note: props.note,
  };

  emit("note-selected", selectedNoteEvent);

  if (props.isSoundActive) playNote();
}

function playNote() {
  props.sampler.triggerAttackRelease(props.note.name, 3);
}
</script>

<style scoped lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  position: relative;
  font-weight: normal;
}

.fret-wrapper {
  border-right: 2px hsl(var(--bc)) solid;

  &:not(:first-child):before {
    position: absolute;
    content: " ";
    height: 50%;
    width: 100%;
    top: 0;
    z-index: 4;
    border-bottom: 1px solid hsl(var(--nc));
  }
}

.fret-wrapper span::selection {
  background: transparent;
}

.fretboard-note-selected {
  background: hsl(var(--pf));
}
</style>