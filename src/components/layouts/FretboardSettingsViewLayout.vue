<template>
  <MqResponsive target="lg+">
    <SettingsFretboard></SettingsFretboard>
  </MqResponsive>
</template>

<script>
import { MqResponsive } from "vue3-mq";
import SettingsFretboard from "@/modules/settings/components/layouts/SettingsFretboard.vue";

export default {
  name: "FretboardSettingsViewLayout",
  components: {
    MqResponsive,
    SettingsFretboard,
  }
};
</script>

<style scoped></style>