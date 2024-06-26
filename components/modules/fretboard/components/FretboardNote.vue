<template>
  <div class="fret-wrapper" @click="selectNote">
    <div class="note-wrapper text-center py-1.5 px-2.5 lg:py-2 lg:px-4">
      <div
        class="note rounded-lg text-center text-base lg:text-lg font-bold"
        :class="noteClasses"
      >
        <template v-if="props.fretboardNote.isDisplayed">
          <span>{{ noteFullName }}</span>
          <span class="note-octave" v-if="props.showOctave">{{
            props.fretboardNote.note.oct
          }}</span>
        </template>
        <template v-else> &nbsp; </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getFretboardNoteKey } from "@/components/modules/fretboard/services/fretboard";
import type {
FretboardNote,
FretboardNoteSelectedEvent,
} from "@/components/modules/fretboard/types/fretboard";
import * as Tone from "tone";
import { computed, ref } from "vue";

interface Props {
  string: number; // String of the current note
  fret: number; // Fret position of the current note
  fretboardNote: FretboardNote; // Current note to display on the fret
  showOctave?: boolean;
  sampler: Tone.Sampler;
  isSoundActive?: boolean;
  isNoteSelectable?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  showOctave: false,
  noteClass: "",
  isSoundActive: false,
  isNoteSelectable: false,
});

const cssStringProperties = ref<string>(
  0.075 + 0.03 * props.string + "em solid oklch(var(--bc))"
);

const noteClasses = computed<string[]>(() => {
  if (props.fretboardNote.isDisplayed) {
    if (props.fretboardNote.classes.length > 0) {
      return props.fretboardNote.classes;
    }
    return ["bg-base-100"];
  }

  return ["bg-transparent"];
});

const emit = defineEmits(["note-selected"]);

const noteFullName = computed(() => {
  return (
    props.fretboardNote.note.letter +
    beautifyAccidentalValue(props.fretboardNote.note.acc)
  );
});

function beautifyAccidentalValue(accidental: string): string {
  if (accidental === "b") return "♭";
  if (accidental === "bb") return "𝄫";
  if (accidental === "##") return "𝄪";
  if (accidental === undefined) return "";
  return accidental;
}

function selectNote() {
  if (props.isSoundActive) playNote();
  if (!props.isNoteSelectable) return;

  const noteClassMap: FretboardNoteSelectedEvent = {
    key: getFretboardNoteKey(props.string, props.fret),
    string: props.string,
    fret: props.fret,
    note: props.fretboardNote.note,
  };

  emit("note-selected", noteClassMap);
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
  .note {
    color: oklch(var(--bc));
  }

  border-right: 0.125rem oklch(var(--bc)) solid;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    border-top: v-bind(cssStringProperties);
    transform: translateY(-50%);
  }

  &:first-child {
    border-right: 0.3rem oklch(var(--bc)) solid;

    &:before {
      right: 0;
      width: 50%;
    }
  }

  &:not(:first-child):before {
    left: 0;
    width: 100%;
  }
}

.fret-wrapper span::selection {
  background: transparent;
}
</style>
