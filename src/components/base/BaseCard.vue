<template>
  <div class="card shadow-xl">
    <div class="card-body" :class="props.bodyPadding">
      <h2 class="card-title" v-if="!!$slots.title">
        <slot name="title"></slot>
      </h2>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">

interface Props {
  bodyPadding: string;
}
const props = withDefaults(defineProps<Props>(), {
  bodyPadding: "",
});

</script>

<style scoped lang="scss">
[data-theme="dark"] .card {
  background: hsl(var(--b2));
}

[data-theme="winter"] .card {
  background: hsl(var(--b3));
}
</style>