<template>
  <div class="flex flex-shrink-0 flex-col xl:mx-0 xl:w-full">
    <div class="bg-opacity-100">
      <div class="tabs w-full flex-grow-0">
        <button
          v-for="tabTitle in tabTitles"
          :key="'tab-' + tabTitle"
          @click="selectedTab = tabTitle"
          class="tab tab-lifted tab-border-none tab-lg flex-1"
          :class="{'tab-active': selectedTab === tabTitle}"
        >
          {{ tabTitle }}
        </button>
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
import {provide, ref} from "vue";

export default {
  setup(props, { slots }) {
    const tabTitles = slots.default().map(tab => tab.props.title)
    const selectedTab = ref(tabTitles[0]);

    provide("selectedTab", selectedTab);

    return { tabTitles, selectedTab };
  }
}
</script>

<style scoped lang="scss">
[data-theme="dark"] .tab-active {
  background: hsl(var(--b2));
}

[data-theme="winter"] .tab-active {
  background: hsl(var(--b3));
}
</style>