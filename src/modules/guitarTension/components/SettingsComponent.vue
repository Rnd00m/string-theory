<!--
<script setup lang="ts">
import { useTensionStore } from "@/stores/tension";
import { reactive, watch } from "vue";
import { tunings, stringSets, strings } from "@/scripts/stringsData";

const tensionStore = useTensionStore();

const selected = reactive({
  diapason: tensionStore.diapason,
  tuning: tunings.find((tuning) => tuning.name === "Standard")?.notes,
  stringSet: stringSets.find((stringSet) => stringSet.name === "EXL110 (10-46)")
    ?.strings,
});

watch(
  () => selected.diapason,
  (diapason) => {
    tensionStore.updateDiapason(diapason);
  }
);

watch(
  () => selected.tuning,
  (tuning) => {
    if (tuning) {
      let lastIndex = 0;

      tensionStore.strings.forEach((string, index) => {
        string.note = tuning[index];
        tensionStore.updateString(index, string);
        lastIndex = index;
      });

      // Add missing strings to store
      if (tuning.length > tensionStore.strings.length) {
        lastIndex += 1;
        for (let i = lastIndex; i < tuning.length; i++) {
          tensionStore.addString({
            note: tuning[i],
            string: null,
            tension: 0,
          });
        }
      }

      // Remove extra strings from store
      if (tensionStore.strings.length > tuning.length) {
        for (let i = lastIndex; i >= tuning.length; i&#45;&#45;) {
          tensionStore.deleteString(i);
        }
      }
    }
  }
);

watch(
  () => selected.stringSet,
  (stringSet) => {
    if (stringSet) {
      let lastIndex = 0;

      tensionStore.strings.forEach((string, index) => {
        string.string = stringSet[index];
        tensionStore.updateString(index, string);
        lastIndex = index;
      });

      if (stringSet.length > tensionStore.strings.length) {
        lastIndex += 1;
        for (let i = lastIndex; i < stringSet.length; i++) {
          tensionStore.addString({
            note: null,
            string: stringSet[i],
            tension: 0,
          });
        }
      }
      if (tensionStore.strings.length > stringSet.length) {
        for (let i = lastIndex; i >= stringSet.length; i&#45;&#45;) {
          tensionStore.deleteString(i);
        }
      }
    }
  }
);
</script>

<template>
  <div class="settings grid grid-flow-col gap-4">
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Diapason</span>
      </label>
      <select class="select select-bordered" v-model="selected.diapason">
        <option :value="0.628">24.75</option>
        <option :value="0.635">25</option>
        <option :value="0.648">25.5</option>
        <option :value="0.673">26.5</option>
        <option :value="0.686">27</option>
        <option :value="0.762">30</option>
      </select>
    </div>
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Tuning</span>
      </label>
      <select class="select select-bordered" v-model="selected.tuning">
        <option
          :key="tuning.name"
          v-for="tuning in tunings"
          :value="tuning.notes"
        >
          {{ tuning.name }}
        </option>
      </select>
    </div>
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">String set</span>
      </label>
      <select class="select select-bordered" v-model="selected.stringSet">
        <option
          :key="stringSet.name"
          v-for="stringSet in stringSets"
          :value="stringSet.strings"
        >
          {{ stringSet.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped></style>
-->
