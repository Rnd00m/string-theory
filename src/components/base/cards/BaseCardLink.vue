<template>
  <RouterLink
    :to="props.to"
    class="card-link relative flex justify-between py-6 px-6 rounded-2xl w-72 md:w-80 lg:w-96 my-4 shadow-xl"
  >
    <div
      class="text-white flex items-center absolute rounded-full p-2 lg:p-4 shadow-xl left-4 -top-6"
      :class="props.iconClass"
    >
      <svg-icon type="mdi" :path="props.iconPath" size="28" />
    </div>
    <div class="mt-2 lg:mt-4">
      <h2 class="sm:text-base md:text-lg lg:text-xl font-semibold lg:my-2 my-1" v-if="!!$slots.title">
        <slot name="title"></slot>
      </h2>
      <div class="flex space-x-2 text-gray-400 text-sm md:text-base" v-if="!!$slots.content">
        <slot name="content" />
      </div>
    </div>
    <div class="w-12 flex items-center align-middle">
      <MqResponsive target="lg+">
        <svg-icon type="mdi" :path="mdiChevronRight" size="48" />
      </MqResponsive>
      <MqResponsive target="xs-md">
        <svg-icon type="mdi" :path="mdiChevronRight" size="32" />
      </MqResponsive>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiChevronRight } from "@mdi/js";
import { MqResponsive } from "vue3-mq";

interface RouterLink {
  name: string;
}

interface Props {
  to: string | RouterLink;
  iconPath: string;
  iconClass: string;
}
const props = defineProps<Props>();
</script>

<style scoped lang="scss">
[data-theme="dark"] .card-link {
  background: hsl(var(--b2));
}

[data-theme="winter"] .card-link {
  background: hsl(var(--b3));
}
</style>