<template>
  <div class="fret-wrapper" @click="playNote(note)">
    <div class="note-wrapper text-center py-2 px-3 lg:px-4">
      <div
        class="note rounded-lg text-center text-base lg:text-lg font-bold"
        :class="noteClass"
      >
        <span>{{ noteFullName }}</span
        ><span class="note-octave" v-if="fretboardParametersStore.showOctave">{{
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

interface Props {
  note: typeof Note;
  sampler: Tone.Sampler;
  noteClassMap?: NoteClassMap[];
  showRootNoteBackground?: boolean;
  showNoteBackground?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  showRootNoteBackground: true,
  showNoteBackground: true,
});

const fretboardParametersStore = useFretboardParametersStore();

const noteFullName = computed(() => {
  return props.note.letter + beautifyAccidentalValue(props.note.acc);
})

const noteClass = computed<string>(() => {
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

function playNote(note: typeof Note) {
  props.sampler.triggerAttackRelease(note.name, 3);
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
</style>