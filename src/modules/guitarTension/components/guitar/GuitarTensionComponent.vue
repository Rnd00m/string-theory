<template>
  <div class="guitar-tension grid gap-3 md:gap-5 content-center">
    <StringTensionComponent
      :string-tension="string"
      :index="index"
      v-for="(string, index) in props.stringTensions"
      :key="
        `string-tension-${string.note.name}-${string.string.name}`.toLowerCase()
      "
      v-bind="$attrs"
    />
  </div>
</template>

<script setup lang="ts">
import StringTensionComponent from "./StringTensionComponent.vue";
import { StringTension } from "@/modules/guitarTension/services/StringTension";

interface Props {
  stringTensions: StringTension[];
}
const props = defineProps<Props>();
</script>

<style scoped></style>
