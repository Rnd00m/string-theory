<template>
  <div class="form-control">
    <label class="label cursor-pointer swap swap-rotate">
      <input
        type="checkbox"
        :checked="selectedTheme === ThemeEnum.Dark"
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
const colorMode = useColorMode();
import { getData, setData } from 'nuxt-storage/local-storage';
import SvgIcon from "@jamescoyle/vue-icon";

import { ThemeEnum } from "@/utils/enums/ThemeEnum";
import { mdiWeatherNight, mdiWhiteBalanceSunny } from "@mdi/js";

const themeStorageKey = "user-theme";
const selectedTheme = ref<string | null>(null);


/**
 * Add selected theme to local storage and apply attribute to html element
 */
function setTheme(themeName: string): void {
  setData(themeStorageKey, themeName);
  colorMode.preference = themeName;
}

/**
 * Switch between dark and light theme
 */
function toggleTheme(): void {
  if (getData(themeStorageKey) === ThemeEnum.Dark) {
    setTheme(ThemeEnum.Light);
  } else {
    setTheme(ThemeEnum.Dark);
  }
}

onMounted(() => {
  colorMode.preference = getData(themeStorageKey);

  if (selectedTheme.value === ThemeEnum.Light) {
    setTheme(ThemeEnum.Light);
  } else {
    setTheme(ThemeEnum.Dark);
  }
});
</script>

<style scoped></style>
