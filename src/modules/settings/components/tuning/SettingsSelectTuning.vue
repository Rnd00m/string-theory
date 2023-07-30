<template>
  <h1 class="text-xl font-bold hidden lg:block">Tuning</h1>

  <div class="grid h-20 lg:h-32 place-items-center mt-4">
    <SettingsTuningSelection />
  </div>

  <div class="divider">Settings</div>

  <BaseTabs>
    <BaseTab title="Guitar">
      <div class="grid grid-flow-col lg:grid-flow-row">
        <div class="flex justify-center items-center">
          <h1 class="text-center text-sm lg:text-lg font-bold">Type</h1>
        </div>
        <SettingsTuningGuitarType />
      </div>
      <div class="grid grid-flow-col lg:grid-flow-row">
        <div class="flex justify-center items-center">
          <h1 class="text-center text-sm lg:text-lg font-bold">Sound</h1>
        </div>
        <div class="grid grid-flow-col gap-2 lg:gap-3">
          <SettingsSound />
        </div>
      </div>
    </BaseTab>
    <BaseTab title="Bass">
      <div class="grid grid-flow-col lg:grid-flow-row">
        <div class="flex justify-center items-center">
          <h1 class="text-center text-sm lg:text-lg font-bold">Type</h1>
        </div>
        <SettingsTuningBassType />
      </div>
      <div class="grid grid-flow-col lg:grid-flow-row">
        <div class="flex justify-center items-center">
          <h1 class="text-center text-sm lg:text-lg font-bold">Sound</h1>
        </div>
        <div class="grid grid-flow-col gap-2 lg:gap-3">
          <SettingsSound />
        </div>
      </div>
    </BaseTab>
  </BaseTabs>
</template>

<script setup lang="ts">
import SettingsTuningSelection from "@/modules/settings/components/tuning/SettingsTuningSelection.vue";
import SettingsTuningGuitarType from "@/modules/settings/components/tuning/SettingsTuningGuitarType.vue";
import SettingsTuningBassType from "@/modules/settings/components/tuning/SettingsTuningBassType.vue";
import SettingsSound from "@/modules/settings/components/SettingsSound.vue";
import BaseTabs from "@/components/base/tabs/BaseTabs.vue";
import BaseTab from "@/components/base/tabs/BaseTab.vue";
</script>

<style scoped lang="scss">
.chord-name {
  text-transform: capitalize;
}
</style>
