<template>
  <div class="grid h-20 lg:h-32">
    <SettingsTuningStrings />
  </div>

  <div class="divider my-4">Settings</div>

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
import SettingsTuningGuitarType from "@/modules/settings/components/tuning/SettingsTuningGuitarType.vue";
import SettingsTuningBassType from "@/modules/settings/components/tuning/SettingsTuningBassType.vue";
import SettingsSound from "@/modules/settings/components/SettingsSound.vue";
import BaseTabs from "@/components/base/tabs/BaseTabs.vue";
import BaseTab from "@/components/base/tabs/BaseTab.vue";
import SettingsTuningStrings from "@/modules/settings/components/tuning/SettingsTuningStrings.vue";
</script>

<style scoped lang="scss"></style>
