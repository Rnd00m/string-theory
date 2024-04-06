<template>
  <RouterLink
    :to="props.to"
    class="card-link relative flex justify-between bg-base-100 border border-neutral-content shadow py-6 px-6 rounded-2xl w-72 md:w-80 lg:w-96 my-4"
  >
    <div
      class="text-white flex items-center absolute rounded-full p-2 lg:p-4 shadow-xl left-4 -top-6"
      :class="props.iconClass"
    >
      <SvgIcon type="mdi" :path="props.iconPath" size="28" />
    </div>
    <div class="mt-2 lg:mt-4">
      <h2
        class="sm:text-base md:text-lg lg:text-xl font-semibold lg:my-2 my-1"
        v-if="!!$slots.title"
      >
        <slot name="title"></slot>
      </h2>
      <div
        class="flex space-x-2 text-gray-400 text-sm md:text-base"
        v-if="!!$slots.content"
      >
        <slot name="content" />
      </div>
    </div>
    <div class="w-12 flex items-center align-middle">
      <SvgIcon
        type="mdi"
        :path="mdiChevronRight"
        class="hidden lg:block"
        size="48"
      />
      <SvgIcon
        type="mdi"
        :path="mdiChevronRight"
        class="block lg:hidden"
        size="32"
      />
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiChevronRight } from "@mdi/js";

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

<style scoped lang="scss"></style>
