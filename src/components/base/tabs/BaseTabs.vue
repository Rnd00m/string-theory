<template>
  <TabGroup>
    <div class="grid">
      <TabList class="tabs tabs-boxed justify-self-center">
        <Tab
          as="template"
          v-for="tabTitle in tabTitles"
          :key="tabTitle"
          v-slot="{ selected }"
        >
          <a class="tab" :class="{ 'tab-active': selected }">{{ tabTitle }}</a>
        </Tab>
      </TabList>
      <TabPanels>
        <slot />
      </TabPanels>
    </div>
  </TabGroup>
</template>

<script>
import { TabGroup, TabList, Tab, TabPanels } from "@headlessui/vue";

import { provide, ref } from "vue";

export default {
  components: { TabPanels, Tab, TabList, TabGroup },
  setup(props, { slots }) {
    const tabTitles = slots.default().map((tab) => tab.props.title);
    const selectedTab = ref(tabTitles[0]);

    provide("selectedTab", selectedTab);

    return { tabTitles, selectedTab };
  },
};
</script>

<style scoped lang="scss"></style>
