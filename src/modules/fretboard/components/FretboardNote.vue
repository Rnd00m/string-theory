<template>
  <div class="fret-wrapper" @click="selectNote">
    <div class="note-wrapper text-center py-2 px-3 lg:px-4">
      <div
        class="note rounded-lg text-center text-base lg:text-lg font-bold"
        :class="[props.noteClass]"
      >
        <span>{{ noteFullName }}</span>
        <span class="note-octave" v-if="props.showOctave">{{ note.oct }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Tone from "tone";
import { Note } from "@tonaljs/tonal";
import type { NoteClassMap } from "@/modules/fretboard/types/NoteClassMap";
import { computed } from "vue";
import { getNoteClassKey } from "@/modules/fretboard/services/noteClassMaps";

interface Props {
  string: number; // String of the current note
  fret: number; // Fret position of the current note
  note: typeof Note; // Current note to display on the fret
  showOctave?: boolean;
  sampler: Tone.Sampler;
  noteClassMap?: NoteClassMap[];
  noteClass?: string;
  isSoundActive?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  showOctave: false,
  noteClass: "",
  isSoundActive: false,
});

const emit = defineEmits(["note-selected"]);

const noteFullName = computed(() => {
  return props.note.letter + beautifyAccidentalValue(props.note.acc);
});

function beautifyAccidentalValue(accidental: string): string {
  if (accidental === "b") return "♭";
  if (accidental === "bb") return "𝄫";
  if (accidental === "##") return "𝄪";
  if (accidental === undefined) return "";
  return accidental;
}

function selectNote() {
  const noteClassMap: NoteClassMap = {
    key: getNoteClassKey(props.string, props.fret),
    string: props.string,
    fret: props.fret,
    note: props.note,
    class: "fretboard-note-selected",
  };

  emit("note-selected", noteClassMap);

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