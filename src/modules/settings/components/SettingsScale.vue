<template>
  <div class="grid grid-cols-3 mt-4 gap-2 lg:gap-6">
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
            class="chord-name"
            :class="{
              active: fretboardParametersStore.scale.name === mode.name,
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
            class="chord-name"
            :class="{
              active: fretboardParametersStore.scale.name === scale.name,
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
            class="chord-name"
            :class="{
              active: fretboardParametersStore.scale.name === scale.name,
            }"
          >
            {{ scale.name }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Mode, ScaleType } from "@tonaljs/tonal";
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";

export default {
  name: "SettingsScale",
  setup() {
    const fretboardParametersStore = useFretboardParametersStore();

    const modes = Mode.all();

    const minorScales = ScaleType.all()
      .filter((scaleType) => scaleType.intervals.length === 7)
      .filter((scaleType) => scaleType.name.includes("minor"));

    const majorScales = ScaleType.all()
      .filter((scaleType) => scaleType.intervals.length === 7)
      .filter((scaleType) => scaleType.name.includes("major"));

    return {
      fretboardParametersStore,
      modes,
      majorScales,
      minorScales,
    };
  },
  methods: {
    setScale(scale) {
      this.fretboardParametersStore.scale = scale;
    },
  },
};
</script>

<style scoped lang="scss">
.chord-name {
  text-transform: capitalize;
}
</style>