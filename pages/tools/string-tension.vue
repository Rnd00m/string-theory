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
        <GuitarTensionComponent
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
import { stringSets, tunings } from "@/components/modules/guitarTension/data/stringsData";
import type {
  GuitarString,
  TensionParameterUpdateEvent,
} from "@/components/modules/guitarTension/types/stringTension";
import { StringTension } from "@/components/modules/guitarTension/services/StringTension";
import { ref } from "vue";

definePageMeta({
  title: 'String Tension Calculator'
})

useSEODescription("Explore the string tension calculator designed to determine the applied tension of various string sets based on different tunings. This tool provides insights into string hardness and the tensions exerted on each string and across the fretboard. Whether you're a guitarist or a bassist, the calculator offers valuable information to optimize your instrument setup and playing experience. Try it now to find the perfect balance of tension for your musical needs!");

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
    new StringTension(data.string, data.note, diapason.value)
  );
}

function updateDiapasonParameter(data: number): void {
  diapason.value = data;
  processStringTensions();
}

function updateNotesParameter(data: Note[]): void {
  notes.value = data;

  const noteNumber: number = notes.value.length;

  if (noteNumber !== strings.value.length) {
    strings.value =
      stringSets.find((stringSet) => stringSet.strings.length === noteNumber)
        ?.strings || [];
  }

  processStringTensions();
}

function updateStringsParameter(data: GuitarString[]): void {
  strings.value = data;

  const stringNumber: number = strings.value.length;

  if (stringNumber !== notes.value.length) {
    notes.value =
      tunings.find((tuning) => tuning.notes.length === stringNumber)?.notes ||
      [];
  }

  processStringTensions();
}
</script>
