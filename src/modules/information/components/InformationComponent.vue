<template>
  <MqResponsive target="lg+">
    <div class="chord-information flex items-center justify-center">
      <div class="card w-10/12 bg-base-200 shadow-xl">
        <div class="card-body">
          <template v-if="fretboardParametersStore.displayType === DisplayTypeEnum.Chord">
            <h2 class="card-title">Chord Information</h2>
            <ChordInformation></ChordInformation>
          </template>
          <template v-else>
            <h2 class="card-title">Scale Information</h2>
            <ScaleInformation></ScaleInformation>
          </template>
        </div>
      </div>
    </div>
  </MqResponsive>
  <MqResponsive target="lg-">
    <input type="checkbox" id="information-modal" class="modal-toggle" />
    <label for="information-modal" class="modal cursor-pointer">
      <label class="modal-box relative modal-box w-3/4 max-w-5xl" for="">
        <label for="information-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <template v-if="fretboardParametersStore.displayType === DisplayTypeEnum.Chord">
          <h2 class="card-title mb-2">Chord Information</h2>
          <ChordInformation></ChordInformation>
        </template>
        <template v-else>
          <h2 class="card-title mb-2">Scale Information</h2>
          <ScaleInformation></ScaleInformation>
        </template>
      </label>
    </label>
  </MqResponsive>
</template>

<script>
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";
import ChordInformation from "@/modules/information/components/ChordInformation.vue";
import ScaleInformation from "@/modules/information/components/ScaleInformation.vue";
import { MqResponsive } from "vue3-mq";
import {DisplayTypeEnum} from "@/scripts/enums/DisplayTypeEnum";

export default {
  name: "InformationComponent",
  components: {
    MqResponsive,
    ChordInformation,
    ScaleInformation
  },
  setup() {
    const fretboardParametersStore = useFretboardParametersStore();

    return { fretboardParametersStore, DisplayTypeEnum };
  },
};
</script>

<style scoped></style>