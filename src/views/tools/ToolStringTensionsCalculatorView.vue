<template>
  <div class="wrapper grid grid-flow-row items-center gap-4">
    <div class="hidden md:grid justify-items-center mb-4">
      <h1 class="text-center text-4xl font-bold">String tension calculator</h1>
    </div>
    <div class="grid grid-flow-row auto-rows-max">
      <TensionSettingsComponent
        :diapason="diapason"
        :notes="notes"
        :strings="strings"
        @diapasonUpdated="updateDiapasonParameter"
        @notesUpdated="updateNotesParameter"
        @stringsUpdated="updateStringsParameter"
        class="mb-5 md:mb-0"
      />

      <div class="grid grid-flow-row auto-rows-max md:grid-cols-2">
        <GuitarTension
          :string-tensions="stringTensions"
          @tensionParameterUpdated="updateTensionParameter"
        />
        <TensionChartComponent :string-tensions="stringTensions" />
      </div>

      <!--      <div class="grid justify-items-center">
          <TensionStat />
      </div>-->
    </div>
  </div>
</template>
<script setup lang="ts">
import GuitarTension from "@/modules/guitarTension/components/guitar/GuitarTensionComponent.vue";
import TensionChartComponent from "@/modules/guitarTension/components/TensionChartComponent.vue";
import TensionSettingsComponent from "@/modules/guitarTension/components/TensionSettingsComponent.vue";
import { Note } from "@tonaljs/tonal";
import { stringSets, tunings } from "@/modules/guitarTension/data/stringsData";
import type {
  GuitarString,
  TensionParameterUpdateEvent,
} from "@/modules/guitarTension/types/stringTension";
import { StringTension } from "@/modules/guitarTension/services/StringTension";
import { ref } from "vue";

const notes = ref<Note[]>(
  tunings.find((tuning) => tuning.name === "Standard")?.notes || []
);

const strings = ref<GuitarString[]>(
  stringSets.find((stringSet) => stringSet.name === "EXL110 (10-46)")
    ?.strings || []
);

const diapason = ref<number>(0.648);

const stringTensions = ref<StringTension[]>([]);

function processStringTensions(): void {
  stringTensions.value.splice(0, stringTensions.value.length);

  notes.value.forEach((note: Note, index: number) => {
    addString(new StringTension(strings.value[index], note, diapason.value));
  });
}

const addString = (stringTension: StringTension) => {
  stringTensions.value.push(stringTension);
};

processStringTensions();

// ------------------------ Events ------------------------>
function updateTensionParameter(data: TensionParameterUpdateEvent): void {
  stringTensions.value.splice(
    data.index,
    1,
    new StringTension(data.string, data.note)
  );
}

function updateDiapasonParameter(data: number): void {
  diapason.value = data;
  processStringTensions();
}

function updateNotesParameter(data: Note[]): void {
  notes.value = data.value;

  const noteNumber: number = notes.value.length;

  if (noteNumber !== strings.value.length) {
    strings.value =
      stringSets.find((stringSet) => stringSet.strings.length === noteNumber)
        ?.strings || [];
  }

  processStringTensions();
}

function updateStringsParameter(data: GuitarString[]): void {
  strings.value = data.value;

  const stringNumber: number = strings.value.length;

  if (stringNumber !== notes.value.length) {
    notes.value =
      tunings.find((tuning) => tuning.notes.length === stringNumber)?.notes ||
      [];
  }

  processStringTensions();
}
</script>
