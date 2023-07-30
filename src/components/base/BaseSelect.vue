<template>
  <div class="form-control">
    <label class="label" v-if="props.label !== undefined">
      <span class="label-text">{{ props.label }}</span>
    </label>
    <select
      v-model="value"
      class="select select-sm md:select-md select-primary select-bordered w-full max-w-xs"
      v-bind="$attrs"
    >
      <option
        v-for="(item, index) in props.items"
        :key="
          areItemsStringOrNumberType
            ? `${item}_${index}`
            : `${item[props.value]}_${index}`
        "
        :value="areItemsStringOrNumberType ? item : item[props.value]"
      >
        {{ areItemsStringOrNumberType ? item : item[props.display] }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

interface Props {
  label?: string | undefined;
  name: string;
  modelValue: string | number;
  items: object[] | string[] | number[];
  value: string;
  display?: string;
}
const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);
const areItemsStringOrNumberType = ref<boolean>(
  isItemStringOrNumberType(props.items[0])
);

function isItemStringOrNumberType(item: any): boolean {
  return typeof item === "string" || typeof item === "number";
}

const value = computed<string | number>({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<style scoped></style>
