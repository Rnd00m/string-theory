<template>
  <div class="card shadow-xl">
    <div class="card-body" :class="props.bodyClasses">
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
interface Props {
  bodyClasses?: string[];
}
const props = defineProps<Props>();
</script>

<style scoped lang="scss">
[data-theme="dark"] .card {
  background: hsl(var(--b2));
}

[data-theme="winter"] .card {
  background: hsl(var(--b3));
}
</style>