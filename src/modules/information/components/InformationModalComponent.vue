<template>
  <input type="checkbox" id="information-modal" class="modal-toggle" />
  <label for="information-modal" class="modal cursor-pointer">
    <label class="modal-box relative w-3/4 max-w-5xl" for="">
      <label
        for="information-modal"
        class="btn btn-sm btn-circle absolute right-2 top-2"
        >✕</label
      >
      <template
        v-if="fretboardParametersStore.displayType === DisplayTypeEnum.Chord"
      >
        <h2 class="card-title mb-2">Chord Information</h2>
        <ChordInformation></ChordInformation>
      </template>
      <template v-else>
        <h2 class="card-title mb-2">Scale Information</h2>
        <ScaleInformation></ScaleInformation>
      </template>
    </label>
  </label>
</template>

<script setup lang="ts">
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";
import ChordInformation from "@/modules/information/components/ChordInformation.vue";
import ScaleInformation from "@/modules/information/components/ScaleInformation.vue";
import { DisplayTypeEnum } from "@/commons/enums/DisplayTypeEnum";

const fretboardParametersStore = useFretboardParametersStore();
</script>

<style scoped></style>
