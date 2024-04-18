<template>
 <div class="stat place-items-center">
   <div class="stat-title text-base md:text-lg" v-if="!!$slots.title">
    <slot name="title" />
   </div>
   <div class="stat-value text-2xl md:text-4xl" v-if="!!$slots.value">
    <slot name="value" />
   </div>
   <div class="stat-desc" v-if="!!$slots.desc">
    <slot name="desc" />
   </div>
 </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">

</style>