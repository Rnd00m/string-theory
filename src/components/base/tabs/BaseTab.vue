<template>
  <div
    v-show="selectedTab === props.title"
    class="tab-content grid w-full flex-grow gap-3 rounded-xl rounded-tl-none rounded-tr-none p-6 shadow-xl"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";

interface Props {
  title: string;
}

const props = defineProps<Props>();

const selectedTab = inject("selectedTab");
</script>

<style scoped lang="scss">
[data-theme="dark"] .tab-content {
  background: hsl(var(--b2));
}

[data-theme="winter"] .tab-content {
  background: hsl(var(--b3));
}
</style>
