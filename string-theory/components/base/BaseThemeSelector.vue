<template>
  <div class="form-control">
    <label class="label cursor-pointer swap swap-rotate">
      <input
        type="checkbox"
        :checked="colorMode.preference === ThemeEnum.Light"
        @change="toggleTheme"
      />

      <SvgIcon
        class="swap-on"
        type="mdi"
        :path="mdiWeatherNight"
        width="24"
        height="24"
      />
      <SvgIcon
        class="swap-off"
        type="mdi"
        :path="mdiWhiteBalanceSunny"
        width="24"
        height="24"
      />
    </label>
  </div>
</template>

<script setup lang="ts">
import { ThemeEnum } from "@/utils/enums/ThemeEnum";
const colorMode = useColorMode();
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiWeatherNight, mdiWhiteBalanceSunny } from "@mdi/js";

function toggleTheme(): void {
  if (colorMode.preference === ThemeEnum.Dark) {
    colorMode.preference = ThemeEnum.Light;
  } else {
    colorMode.preference = ThemeEnum.Dark;
  }
}
</script>

<style scoped></style>
