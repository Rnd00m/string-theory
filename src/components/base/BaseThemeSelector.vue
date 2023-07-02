<template>
  <div class="form-control">
    <label class="label cursor-pointer">
      <span v-if="props.showLabel" class="label-text">Dark Mode</span>
      <input
        type="checkbox"
        class="toggle"
        :checked="selectedTheme === ThemeEnum.Dark"
        @change="toggleTheme"
      />
    </label>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ThemeEnum } from "@/commons/enums/ThemeEnum";

interface Props {
  showLabel: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  showLabel: true,
});

const themeStorageKey = ref<string>("user-theme");
const dataThemeKey = ref<string>("data-theme");
const selectedTheme = ref<string | null>(null);
const HTMLElement = ref<HTMLElement>(document.getElementsByTagName("html")[0]);

/**
 * Add selected theme to local storage and apply attribute to html element
 *
 * @param themeName
 */
function setTheme(themeName: string): void {
  window.localStorage.setItem(themeStorageKey.value, themeName);
  HTMLElement.value.setAttribute(dataThemeKey.value, themeName);
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