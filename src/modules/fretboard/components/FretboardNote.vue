<template>
  <div class="fret-wrapper" @click="selectNote">
    <div class="note-wrapper text-center py-2 px-3 lg:px-4">
      <div
        class="note rounded-lg text-center text-base lg:text-lg font-bold"
        :class="props.fretboardNote.classes"
      >
        <template v-if="props.fretboardNote.isDisplayed">
          <span>{{ noteFullName }}</span>
          <span class="note-octave" v-if="props.showOctave">{{ props.fretboardNote.note.oct }}</span>
        </template>
        <template v-else>
         &nbsp;
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Tone from "tone";
import { computed } from "vue";
import type {
  FretboardNote,
  FretboardNoteSelectedEvent
} from "@/modules/fretboard/types/fretboard";
import { getFretboardNoteKey } from "@/modules/fretboard/services/fretboard";

interface Props {
  string: number; // String of the current note
  fret: number; // Fret position of the current note
  fretboardNote: FretboardNote; // Current note to display on the fret
  showOctave?: boolean;
  sampler: Tone.Sampler;
  isSoundActive?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  showOctave: false,
  noteClass: "",
  isSoundActive: false,
});

const emit = defineEmits(["note-selected"]);

const noteFullName = computed(() => {
  return props.fretboardNote.note.letter + beautifyAccidentalValue(props.fretboardNote.note.acc);
});

function beautifyAccidentalValue(accidental: string): string {
  if (accidental === "b") return "♭";
  if (accidental === "bb") return "𝄫";
  if (accidental === "##") return "𝄪";
  if (accidental === undefined) return "";
  return accidental;
}

function selectNote() {
  const noteClassMap: FretboardNoteSelectedEvent = {
    key: getFretboardNoteKey(props.string, props.fret),
    string: props.string,
    fret: props.fret,
    note: props.fretboardNote.note,
  };

  emit("note-selected", noteClassMap);

  if (props.isSoundActive) playNote();
}

function playNote() {
  props.sampler.triggerAttackRelease(props.fretboardNote.note.name, 3);
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
</style>