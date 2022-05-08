<template>
  <label
    for="settings-drawer"
    class="drawer-button btn btn-sm btn-circle"
  >✕</label>
  <MqResponsive landscape target="md-">
    <FretboardSettings></FretboardSettings>
  </MqResponsive>
</template>

<script>
import { MqResponsive } from "vue3-mq";
import FretboardSettings from "@/components/fretboard/FretboardSettings.vue";

export default {
  name: "FretboardSettingsDrawerLayout",
  components: {
    MqResponsive,
    FretboardSettings,
  },
};
</script>

<style scoped></style>