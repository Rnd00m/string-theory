<template>
  <div class="select-scale-modal">
    <button
      type="button"
      @click="openModal"
      class="btn btn-outline btn-primary btn-sm lg:btn-md modal-button capitalize"
    >
      {{ fretboardParametersStore.scaleName }}
    </button>

    <BaseDialog
      ref="settingsScaleDialog"
      modal-box-classes="max-h-[32rem]"
    >
      <template #title>
        <div class="flex items-center justify-between">
          <DialogTitle as="h3" class="text-lg font-bold"> Scales </DialogTitle>
          <SettingsScaleCombobox
            :scale-list="list"
            @scale-selected="setScale"
          />
        </div>
      </template>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 lg:gap-6">
        <div>
          <ul class="menu menu-compact mode">
            <li class="menu-title">
              <span>Modes</span>
            </li>
            <li
              v-for="mode in modes"
              :key="mode.name"
              @click="setScale(mode)"
            >
              <a
                class="capitalize"
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
              @click="setScale(scale)"
            >
              <a
                class="capitalize"
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
              @click="setScale(scale)"
            >
              <a
                class="capitalize"
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
              @click="setScale(scale)"
            >
              <a
                class="capitalize"
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
              <span>Other scales</span>
            </li>
            <li
              v-for="scale in otherScales"
              :key="scale.name"
              @click="setScale(scale)"
            >
              <a
                class="capitalize"
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
    </BaseDialog>
  </div>
</template>

<script setup lang="ts">
import BaseDialog from "@/components/BaseDialog.vue";
import SettingsScaleCombobox from "@/modules/settings/components/SettingsScaleCombobox.vue";
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";
import { Mode, Scale, ScaleType } from "@tonaljs/tonal";
import { ref } from "vue";
import { DialogTitle } from "@headlessui/vue";

const fretboardParametersStore = useFretboardParametersStore();

const settingsScaleDialog = ref(null);
const openModal = () => {
  settingsScaleDialog.value?.open();
};

const modes = Mode.all();
const scales = ScaleType.all();

// Put together modes and scales and remove duplicates
// We need this to populate the combobox
const list = [...modes, ...scales].reduce((accumulator, current) => {
  if (
    !accumulator.find((item: typeof Mode | Scale) => item.name === current.name)
  ) {
    accumulator.push(current);
  }
  return accumulator;
}, []);

// Filtered scales lists
const minorScales = ScaleType.all()
  .filter((scaleType) => scaleType.intervals.length === 7)
  .filter((scaleType) => scaleType.name.includes("minor"));

const majorScales = ScaleType.all()
  .filter((scaleType) => scaleType.intervals.length === 7)
  .filter((scaleType) => scaleType.name.includes("major"));

const pentatonicScales = ScaleType.all().filter((scaleType) =>
  scaleType.name.includes("pentatonic")
);

const otherScales = list.filter((scale: typeof Mode | Scale) => {
  return (
    !modes.find((mode) => mode.name === scale.name) &&
    !minorScales.find((minorScale) => minorScale.name === scale.name) &&
    !majorScales.find((majorScale) => majorScale.name === scale.name) &&
    !pentatonicScales.find(
      (pentatonicScale) => pentatonicScale.name === scale.name
    )
  );
});

const setScale = (scale: Scale) => {
  fretboardParametersStore.scaleName = scale.name;
};
</script>

<style scoped lang="scss">
</style>
