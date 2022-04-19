<template>
  <div class="select-scale-modal">
    <label for="select-scale-modal" class="btn btn-primary modal-button"
      >Scales</label
    >

    <input type="checkbox" id="select-scale-modal" class="modal-toggle" />
    <label for="select-scale-modal" class="modal cursor-pointer">
      <label class="modal-box relative w-9/12 max-w-5xl" for="">
        <label
          for="select-scale-modal"
          class="btn btn-sm btn-circle absolute right-2 top-2"
          >✕</label
        >
        <h1 class="text-xl font-bold">Scales</h1>

        <div class="grid grid-cols-3 mt-4 gap-6">
          <div>
            <h2 class="text-md font-bold">Modes</h2>
            <ul class="menu mode">
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
            <h2 class="text-md font-bold">Major scales</h2>
            <ul class="menu mode">
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
            <h2 class="text-md font-bold">Minor scales</h2>
            <ul class="menu mode">
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
      </label>
    </label>
  </div>
</template>

<script>
import { Mode, ScaleType } from "@tonaljs/tonal";
import { useFretboardParametersStore } from "@/stores/fretboardParameters";

export default {
  name: "SelectScaleModal",
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
