<template>
  <div class="form-control">
    <label class="label cursor-pointer">
      <input
        type="radio"
        :name="props.name"
        v-model="value"
        class="radio radio-xs lg:radio-sm checked:bg-primary"
        v-bind="$attrs"
      />
      <span class="label-text text-sm lg:text-base" v-if="props.label"
        >&nbsp;&nbsp;{{ props.label }}</span
      >
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  label: string | boolean;
  name: string;
  modelValue: string;
}
const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<style scoped></style>
