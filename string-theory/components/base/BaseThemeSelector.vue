<template>
  <div class="form-control">
    <label class="label cursor-pointer swap swap-rotate">
      <input
        type="checkbox"
        :checked="selectedTheme === ThemeEnum.Dark"
        @change="toggleTheme"
      />

      <svg-icon
        class="swap-on"
        type="mdi"
        :path="mdiWeatherNight"
        width="24"
        height="24"
      />
      <svg-icon
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
import { getData, setData } from "nuxt-storage/local-storage";
const themeStorageKey = "user-theme";
const dataThemeKey = "data-theme";
const selectedTheme = ref<string | null>(null);
// const HTMLElement = ref<HTMLElement>(document.getElementsByTagName("html")[0]);

/**
 * Add selected theme to local storage and apply attribute to html element
 */
function setTheme(themeName: string): void {
  window.localStorage.setItem(themeStorageKey, themeName);
  HTMLElement.value.setAttribute(dataThemeKey, themeName);
  selectedTheme.value = themeName;
}

/**
 * Switch between dark and light theme
 */
function toggleTheme(): void {
  if (getLocalStorageTheme() === ThemeEnum.Dark) {
    setTheme(ThemeEnum.Light);
  } else {
    setTheme(ThemeEnum.Dark);
  }
}

/**
 * Return the current value in local storage of selected theme
 */
function getLocalStorageTheme(): string | null {
  return window.localStorage.getItem(themeStorageKey.value);
}

onMounted(() => {
  selectedTheme.value = getLocalStorageTheme();

  if (selectedTheme.value === ThemeEnum.Light) {
    setTheme(ThemeEnum.Light);
  } else {
    setTheme(ThemeEnum.Dark);
  }
});
</script>

<style scoped></style>
