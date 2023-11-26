<template>
  <button
    type="button"
    @click="openModal"
    class="btn btn-outline btn-primary btn-sm lg:btn-md modal-button"
  >
    Select Tuning
  </button>

  <BaseDialog
    ref="settingsTuningModal"
    title="Tuning"
    :showConfirm="false"
    :showCancel="false"
    modal-box-classes="w-10/12 lg:w-3/5 max-w-5xl"
  >
    <SettingsTuning />
  </BaseDialog>
</template>

<script setup lang="ts">
import BaseDialog from "@/components/BaseDialog.vue";
import { ref } from "vue";
import SettingsTuning from "@/modules/settings/components/tuning/SettingsTuning.vue";

const settingsTuningModal = ref(null);
const openModal = () => {
  settingsTuningModal.value?.open();
};
</script>

<style scoped lang="scss">
.chord-name {
  text-transform: capitalize;
}
</style>
