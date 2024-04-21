<template>
  <div class="settings grid grid-flow-row auto-rows-max md:grid-cols-3 md:gap-4 justify-items-center">
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Diapason</span>
      </label>
      <BaseSelect
        name="tension-parameter-diapason"
        v-model="selectedDiapason"
        :items="diapasons"
        value="millimeter"
        display="inch"
        @change="emitDiapasonUpdated"
      />
    </div>

    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Tuning</span>
      </label>
      <select
        v-model="selectedNotes"
        class="select select-sm sm:select-md select-bordered w-full max-w-xs"
        @change="emitNotesUpdated"
      >
        <option
          v-for="tuning in tunings"
          :key="`tension-tuning-${tuning.name}`"
          :value="tuning.notes"
        >
          {{ tuning.name }}
        </option>
      </select>
    </div>

    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">String Set</span>
      </label>
      <select
        v-model="selectedStrings"
        class="select select-sm sm:select-md select-primary select-bordered w-full max-w-xs"
        @change="emitStringsUpdated"
      >
        <option
          v-for="stringSet in stringSets"
          :key="`tension-string-${stringSet.name}`"
          :value="stringSet.strings"
        >
          {{ stringSet.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { stringSets, tunings } from "@/components/modules/guitarTension/data/stringsData";
import type { GuitarString } from "@/components/modules/guitarTension/types/stringTension";

interface Props {
  diapason?: number; // Diapason of neck in millimeter
  notes: Note[];
  strings: GuitarString[];
}
const props = withDefaults(defineProps<Props>(), {
  diapason: 0.648,
});

type Diapason = {
  millimeter: number;
  inch: number;
};

const diapasons = ref<Diapason[]>([
  {
    millimeter: 0.628,
    inch: 24.75,
  },
  {
    millimeter: 0.635,
    inch: 25,
  },
  {
    millimeter: 0.648,
    inch: 25.5,
  },
  {
    millimeter: 0.673,
    inch: 26.5,
  },
  {
    millimeter: 0.686,
    inch: 27,
  },
  {
    millimeter: 0.762,
    inch: 30,
  },
]);

const selectedDiapason = ref<number>(props.diapason);
const selectedNotes = ref<Note[]>(props.notes);
const selectedStrings = ref<Note[]>(props.strings);

watchEffect(() => {
  selectedDiapason.value = props.diapason;
  selectedNotes.value = props.notes;
  selectedStrings.value = props.strings;
});

const emit = defineEmits(["diapasonUpdated", "notesUpdated", "stringsUpdated"]);

function emitDiapasonUpdated(): void {
  emit("diapasonUpdated", selectedDiapason.value);
}

function emitNotesUpdated(): void {
  emit("notesUpdated", selectedNotes.value);
}

function emitStringsUpdated(): void {
  emit("stringsUpdated", selectedStrings.value);
}
</script>

<style scoped></style>
