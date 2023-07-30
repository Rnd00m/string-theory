<template>
  <div class="wrapper grid grid-flow-row items-center gap-4">
    <div class="hidden md:grid justify-items-center mb-4">
      <h1 class="text-center text-4xl font-bold">String tension calculator</h1>
    </div>
    <div class="grid grid-flow-row auto-rows-max">
      <div class="grid justify-items-center">
        <TensionSettingsComponent @diapasonUpdated="updateDiapasonParameter" />
      </div>

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
import { getGuitarString } from "@/modules/guitarTension/data/stringsData";
import type {
  StringNotePair,
  TensionParameterUpdateEvent,
} from "@/modules/guitarTension/types/stringTension";
import { StringTension } from "@/modules/guitarTension/services/StringTension";
import { ref } from "vue";

const stringNotePairs: StringNotePair[] = [
  {
    string: getGuitarString("PL010"),
    note: Note.get("E4"),
  },
  {
    string: getGuitarString("PL013"),
    note: Note.get("B3"),
  },
  {
    string: getGuitarString("PL017"),
    note: Note.get("G3"),
  },
  {
    string: getGuitarString("NW026"),
    note: Note.get("D3"),
  },
  {
    string: getGuitarString("NW036"),
    note: Note.get("A2"),
  },
  {
    string: getGuitarString("NW046"),
    note: Note.get("E2"),
  },
];

const stringTensions = ref<StringTension[]>([]);

const addString = (stringTension: StringTension) => {
  stringTensions.value.push(stringTension);
};

stringNotePairs.forEach((stringNotePair: StringNotePair) => {
  addString(new StringTension(stringNotePair.string, stringNotePair.note));
});

function updateTensionParameter(data: TensionParameterUpdateEvent): void {
  stringTensions.value.splice(
    data.index,
    1,
    new StringTension(data.string, data.note)
  );
}

function updateDiapasonParameter(data: number): void {
  stringTensions.value.forEach((stringTension) => {
    stringTension.diapason = data;
  });
}
</script>
