<template>
  <div class="chord-information flex justify-center">
    <BaseCard v-if="fretboardParametersStore.displayType === DisplayTypeEnum.Chord" :body-classes="['p-6']">
      <template #title>Chord Information</template>
      <ChordInformation></ChordInformation>
    </BaseCard>
    <BaseCard v-else>
      <template #title>Scale Information</template>
      <ScaleInformation></ScaleInformation>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";
import ChordInformation from "@/modules/information/components/ChordInformation.vue";
import ScaleInformation from "@/modules/information/components/ScaleInformation.vue";
import { DisplayTypeEnum } from "@/commons/enums/DisplayTypeEnum";
import BaseCard from "@/components/base/cards/BaseCard.vue";

const fretboardParametersStore = useFretboardParametersStore();
</script>

<style scoped></style>