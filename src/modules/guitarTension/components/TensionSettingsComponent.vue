<template>
  <div class="settings grid grid-flow-col gap-4">
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
        @change="emitNewDiapasonSelected"
      />
    </div>
    <!--    <div class="form-control w-full max-w-xs">
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
        </div>-->
    <!--    <div class="form-control w-full max-w-xs">
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
    </div>-->
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { Note } from "@tonaljs/tonal";
import BaseSelect from "@/components/base/BaseSelect.vue";

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
const selectedDiapason = ref<number>(0.648);

const emit = defineEmits(["diapasonUpdated"]);

function emitNewDiapasonSelected() {
  emit("diapasonUpdated", selectedDiapason);
}
</script>

<style scoped></style>
