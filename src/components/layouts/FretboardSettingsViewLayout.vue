<template>
  <MqResponsive target="md-" class="flex justify-end">
    <label for="settings-drawer" class="drawer-button btn btn-xs btn-primary"
      >Settings</label
    >
  </MqResponsive>
  <MqResponsive target="lg+">
    <FretboardSettings></FretboardSettings>
  </MqResponsive>
</template>

<script>
import { MqResponsive } from "vue3-mq";
import FretboardSettings from "@/components/fretboard/FretboardSettings.vue";

export default {
  name: "FretboardSettingsViewLayout",
  components: {
    MqResponsive,
    FretboardSettings,
  },
};
</script>

<style scoped></style>