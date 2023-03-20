import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global-store", {
  state: () => {
    return {
      selectedDrawer: null as string | null,
    };
  },
  actions: {},
  getters: {},
});