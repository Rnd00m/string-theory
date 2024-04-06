<template>
  <button
    type="button"
    @click="openModal"
    class="btn btn-sm sm:btn-md btn-outline modal-button"
  >
    Select Tuning
  </button>

  <BaseDialog
    ref="settingsTuningModal"
    title="Tuning"
    :showConfirm="false"
    :showCancel="false"
  >
    <SettingsTuning />
  </BaseDialog>
</template>

<script setup lang="ts">
const settingsTuningModal = ref(null);
const openModal = () => {
  settingsTuningModal.value?.open();
};
</script>

<style scoped lang="scss"></style>
