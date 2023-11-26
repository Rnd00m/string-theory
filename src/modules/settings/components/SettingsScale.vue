<template>
  <BaseTabs>
    <BaseTab title="Commons">
      <div class="grid grid-cols-3 mt-4 gap-2 lg:gap-6">
        <div>
          <Combobox v-model="selectedElement">
            <ComboboxInput
              @change="query = $event.target.value"
              :displayValue="(scale) => scale.name"
              class="input input-bordered input-secondary w-full max-w-xs"
            />
            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-out"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <ComboboxOptions class="menu bg-base-200 rounded-lg mt-2">
                <ComboboxOption
                  as="template"
                  v-for="element in filteredList"
                  :key="element.name"
                  :value="element.name"
                  v-slot="{ selected, active }"
                >
                  <li
                    class="relative cursor-default select-none py-2 pl-4 pr-2 rounded-lg"
                    :class="{
                      'bg-secondary bg-secondary-content': active || selected,
                    }"
                  >
                    {{ element.name }}
                  </li>
                </ComboboxOption>
              </ComboboxOptions>
            </transition>
          </Combobox>
          <ul class="menu menu-compact mode">
            <li class="menu-title">
              <span>Modes</span>
            </li>
            <li v-for="mode in modes" :key="mode.name" @click="setScale(mode.name)">
              <a
                class="chord-name"
                :class="{
                  active: fretboardParametersStore.scaleName === mode.name,
                }"
              >
                {{ mode.name }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <ul class="menu menu-compact mode">
            <li class="menu-title">
              <span>Major scales</span>
            </li>
            <li
              v-for="scale in majorScales"
              :key="scale.name"
              @click="setScale(scale.name)"
            >
              <a
                class="chord-name"
                :class="{
                  active: fretboardParametersStore.scaleName === scale.name,
                }"
              >
                {{ scale.name }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <ul class="menu menu-compact mode">
            <li class="menu-title">
              <span>Minor scales</span>
            </li>
            <li
              v-for="scale in minorScales"
              :key="scale.name"
              @click="setScale(scale.name)"
            >
              <a
                class="chord-name"
                :class="{
                  active: fretboardParametersStore.scaleName === scale.name,
                }"
              >
                {{ scale.name }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <ul class="menu menu-compact mode">
            <li class="menu-title">
              <span>Pentatonic scales</span>
            </li>
            <li
              v-for="scale in pentatonicScales"
              :key="scale.name"
              @click="setScale(scale.name)"
            >
              <a
                class="chord-name"
                :class="{
                  active: fretboardParametersStore.scaleName === scale.name,
                }"
              >
                {{ scale.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </BaseTab>
  </BaseTabs>
</template>

<script setup lang="ts">
import { Mode, ScaleType } from "@tonaljs/tonal";
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/vue";
import {computed, ref, watch} from "vue";
import BaseTabs from "@/components/base/tabs/BaseTabs.vue";
import BaseTab from "@/components/base/tabs/BaseTab.vue";

const fretboardParametersStore = useFretboardParametersStore();

const modes = Mode.all();
const scales = ScaleType.all();

const list = [...modes, ...scales].reduce((accumulator, current) => {
  if (!accumulator.find((item) => item.name === current.name)) {
    accumulator.push(current);
  }
  return accumulator;
}, []);
const query = ref("");

const minorScales = ScaleType.all()
  .filter((scaleType) => scaleType.intervals.length === 7)
  .filter((scaleType) => scaleType.name.includes("minor"));

const majorScales = ScaleType.all()
  .filter((scaleType) => scaleType.intervals.length === 7)
  .filter((scaleType) => scaleType.name.includes("major"));

const pentatonicScales = ScaleType.all().filter((scaleType) =>
  scaleType.name.includes("pentatonic")
);

const filteredList = computed(() =>
  query.value === ""
    ? list
    : list.filter((element) => {
        return element.name.toLowerCase().includes(query.value.toLowerCase());
      })
);

const selectedElement = ref(list.find((element) => element.name === fretboardParametersStore.scaleName));

watch(selectedElement, (newSelectedElement) => {
  console.log(newSelectedElement);
  setScale(newSelectedElement || '');
});

function setScale(scaleName: string) {
  fretboardParametersStore.scaleName = scaleName;
}
</script>

<style scoped lang="scss">
.chord-name {
  text-transform: capitalize;
}
</style>
