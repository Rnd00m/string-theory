<template>
  <Combobox v-model="selected" @update:modelValue="value => emit('scaleSelected', value)">
    <div class="relative">
      <div
        class="relative w-full cursor-default overflow-hidden rounded-lg text-left shadow-md focus:outline-none"
      >
        <ComboboxInput
          class="w-full py-2 pl-3 pr-10 input input-sm input-bordered input-primary"
          :displayValue="(scale) => scale.name"
          @change="query = $event.target.value"
          placeholder="Search for a scale..."
        />
        <ComboboxButton
          class="absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <svg-icon
            type="mdi"
            :path="mdiUnfoldMoreHorizontal"
            width="20"
            height="20"
          />
        </ComboboxButton>
      </div>
      <TransitionRoot
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        @after-leave="query = ''"
      >
        <ComboboxOptions
          class="z-10 combobox-options absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-base-300 py-1 shadow-lg focus:outline-none sm:text-sm"
        >
          <div
            v-if="filteredScaleList.length === 0 && query !== ''"
            class="relative cursor-default select-none px-4 py-2 text-base-content"
          >
            No scale found.
          </div>

          <ComboboxOption
            v-for="scale in filteredScaleList"
            as="template"
            :key="scale.name"
            :value="scale"
            v-slot="{ selected, active }"
          >
            <li
              class="relative cursor-default select-none py-2 pl-10 pr-4"
              :class="{
                'bg-primary text-primary-content': active,
                'text-base-content': !active,
              }"
            >
              <span
                class="block truncate"
                :class="{ 'font-bold': selected, 'font-normal': !selected }"
              >
                {{ scale.name }}
              </span>
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content"
                :class="{
                  'text-primary-content': active,
                  'text-base-content': !active,
                }"
              >
                <svg-icon type="mdi" :path="mdiCheck" width="20" height="20" />
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </TransitionRoot>
    </div>
  </Combobox>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits } from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCheck, mdiUnfoldMoreHorizontal } from "@mdi/js";

interface Props {
  scaleList: Scale[];
}
const props = defineProps<Props>();
const emit = defineEmits(["scaleSelected"]);

let selected = ref("");
let query = ref("");

const filteredScaleList = computed(() =>
  query.value === ""
    ? props.scaleList
    : props.scaleList.filter((scale) => {
        return scale.name.toLowerCase().includes(query.value.toLowerCase());
      })
);
</script>

<style scoped lang="scss">
.combobox-options::-webkit-scrollbar-thumb {
  border: 4px solid transparent;
  border-radius: var(--rounded-box);
  background-color: hsl(var(--bc) / var(--tw-bg-opacity));
  background-clip: padding-box;
  --tw-bg-opacity: 0.5;
  --tw-border-opacity: 0.2;
}

.combobox-options::-webkit-scrollbar {
  width: 16px;
}
</style>
