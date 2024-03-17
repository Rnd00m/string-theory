<template>
  <div class="form-control">
    <label class="label cursor-pointer">
      <input
        type="checkbox"
        :name="props.name"
        v-model="value"
        class="checkbox checkbox-xs lg:checkbox-sm checked:checkbox-primary"
        v-bind="$attrs"
      />
      <span class="label-text text-sm lg:text-base"
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
  modelValue: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const value = computed<boolean>({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<style scoped></style>
