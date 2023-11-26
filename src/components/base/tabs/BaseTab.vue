<template>
  <TabPanel
    class="tab-content grid w-full gap-3 p-6"
  >
    <slot />
  </TabPanel>
</template>

<script setup lang="ts">
import { TabPanel } from "@headlessui/vue";
import { inject } from "vue";

interface Props {
  title: string;
}

const props = defineProps<Props>();

const selectedTab = inject("selectedTab");
</script>

<style scoped lang="scss">
</style>
