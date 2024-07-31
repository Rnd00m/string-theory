<script lang="ts" setup>
import {Line} from 'vue-chartjs'
import type {StringTension} from "~/components/modules/guitarTension/services/StringTension";

interface Props {
  stringTensions: StringTension[];
}

const props = defineProps<Props>();

const labels = ref<string[]>(
  props.stringTensions.map((stringTension) => stringTension.note.name)
);

const datasets = computed(() => {
  return [
  {
    label: 'Guitar #1',
    fill: false,
    borderColor: '#f87979',
    data: props.stringTensions.map((stringTension) =>
      stringTension.getTensionInKg()
    ),
  },
    {
      label: 'Guitar #2',
      fill: false,
      borderColor: '#00ff00',
      data: props.stringTensions.map((stringTension) =>
          stringTension.getTensionInKg() + Math.random() * (5 - (-5)) + (-5)
      ),
    }
]});

const chartData = computed(() => {
  return {
    labels: labels.value,
    datasets: datasets.value,
  };
})
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
})
</script>

<template>
  <div>
    <Line
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<style scoped></style>
