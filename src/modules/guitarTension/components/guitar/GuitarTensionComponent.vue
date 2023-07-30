<template>
  <div class="guitar-tension grid gap-8 lg:gap-5 content-center">
    <StringTensionComponent
      :string-tension="string"
      :index="index"
      v-for="(string, index) in props.stringTensions"
      :key="
        `string-tension-${string.note.name}-${string.string.name}`.toLowerCase()
      "
      v-bind="$attrs"
    />
    <div class="self-auto">
      <!--      <button class="btn btn-outline btn-block" @click="addNewString">
        Add string
      </button>-->
    </div>
  </div>
</template>

<script setup lang="ts">
import StringTensionComponent from "./StringTensionComponent.vue";
import { StringTension } from "@/modules/guitarTension/services/StringTension";
import { ref } from "vue";

interface Props {
  stringTensions: StringTension[];
}
const props = defineProps<Props>();

/*function addNewString() {
  tensionStore.addString({
    note: null,
    string: null,
    tension: 0,
  });
}*/
</script>

<style scoped></style>
