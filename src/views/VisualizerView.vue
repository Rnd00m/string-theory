<template>
  <div class="fretboard-visualizer">
    <div class="absolute right-2 top-2 flex-1 gap-1 justify-end lg:hidden sm:inline-flex">
      <label class="p-2" for="information-modal">
        <IconInformation />
      </label>
      <label for="app-drawer" class="drawer-button p-2" @click="globalStore.selectedDrawer = 'settings-tuning'">
        <IconTune />
      </label>
      <label for="app-drawer" class="drawer-button p-2" @click="globalStore.selectedDrawer = 'settings'">
        <IconGear />
      </label>
    </div>
    <div class="grid lg:gap-8">
      <FretboardSettingsLayout></FretboardSettingsLayout>
      <FretboardVisualizer></FretboardVisualizer>
      <InformationComponent></InformationComponent>
    </div>
  </div>
</template>

<script lang="ts">
import FretboardVisualizer from "@/modules/fretboard/components/FretboardVisualizer.vue";
import FretboardSettingsLayout from "@/components/layouts/FretboardSettingsViewLayout.vue";
import InformationComponent from "@/modules/information/components/InformationComponent.vue";
import { useGlobalStore } from "@/stores/globalStore";
import IconInformation from "@/components/icons/IconInformation.vue";
import IconGear from "@/components/icons/IconGear.vue";
import IconTune from "@/components/icons/IconTune.vue";

export default {
  components: {
    FretboardVisualizer,
    FretboardSettingsLayout,
    InformationComponent,
    IconInformation,
    IconGear,
    IconTune,
  },
  setup() {
    const globalStore = useGlobalStore();

    return { globalStore };
  }
};
</script>

<style scoped lang="scss"></style>