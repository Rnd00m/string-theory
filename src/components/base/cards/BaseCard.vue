<template>
  <div class="card shadow-xl bg-base-300" v-if="isDisplayed">
    <div class="card-body" :class="props.bodyClasses">
      <div class="card-actions justify-end" v-if="props.showCloseButton">
        <button class="btn btn-square btn-sm">
          <svg-icon type="mdi" :path="mdiClose" size="24" />
        </button>
      </div>
      <h2 class="card-title" v-if="!!$slots.title">
        <slot name="title"></slot>
      </h2>
      <slot></slot>
      <div class="card-actions grid" v-if="!!$slots['card-actions']">
        <slot name="card-actions"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiClose } from "@mdi/js";
import { ref } from "vue";

interface Props {
  bodyClasses?: string[];
  showCloseButton?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  showCloseButton: false,
});

const isDisplayed = ref<boolean>(true);
</script>

<style scoped lang="scss"></style>
