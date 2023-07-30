<script setup lang="ts">
import { stringsData } from "@/modules/guitarTension/data/stringsData";
import { reactive } from "vue";
import { Note, Scale } from "@tonaljs/tonal";
import { StringTension } from "@/modules/guitarTension/services/StringTension";
import BaseSelect from "@/components/base/BaseSelect.vue";
import type { TensionParameterUpdateEvent } from "@/modules/guitarTension/types/stringTension";

interface Props {
  stringTension: StringTension; // String of the current note
  index: number;
}
const props = defineProps<Props>();

const selected = reactive({
  note: props.stringTension.note.name,
  string: props.stringTension.string,
});

const range = Scale.rangeOf("C chromatic");
const notes = range("C1", "C5"); // All notes between C1 and C5

const emit = defineEmits(["tensionParameterUpdated"]);

function emitNewTensionParameter() {
  emit("tensionParameterUpdated", {
    note: Note.get(selected.note),
    string: selected.string,
    index: props.index,
  } as TensionParameterUpdateEvent);
}
</script>

<template>
  <div
    class="string-tension grid grid-flow-col auto-cols-max place-content-center place-items-center gap-3"
  >
    <BaseSelect
      name="string-tension-note"
      v-model="selected.note"
      :items="notes"
      value="note"
      @change="emitNewTensionParameter"
    />

    <select
      v-model="selected.string"
      class="select select-sm md:select-md select-primary select-bordered w-full max-w-xs"
      @change="emitNewTensionParameter"
    >
      <option v-for="string in stringsData" :value="string" :key="string.name">
        {{ string.name }} - {{ string.diameter }}
      </option>
    </select>

    <div class="w-20">
      <span class="string-tension-span font-semibold">
        {{ props.stringTension.getTensionInKg().toFixed(2) }} kg
      </span>
    </div>
  </div>
</template>

<style scoped></style>
