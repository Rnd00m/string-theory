<script setup lang="ts">
import { stringsData } from "@/modules/guitarTension/data/stringsData";
import { reactive, ref, toRef, watch } from "vue";
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

/*watch(
  () => selected.note,
  (note) => {
    tensionStore.updateString(props.index, {
      note: note,
      string: selected.string,
      tension: 0,
    });
  }
);

watch(
  () => selected.string,
  (string) => {
    tensionStore.updateString(props.index, {
      note: selected.note,
      string: string,
      tension: 0,
    });
  }
);*/
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
      class="select select-sm lg:select-md select-primary select-bordered w-full max-w-xs"
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

    <!--    <button
      class="btn btn-square btn-outline btn-xs"
      @click="tensionStore.deleteString(index)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        width="12"
        height="12"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>-->
  </div>
</template>

<style scoped></style>
