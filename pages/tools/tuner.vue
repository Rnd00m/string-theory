<template>
  <div id="tuner" class="tuner w-full px-3 md:px-0 md:w-4/5">
    <div class="tuner-interface">
      <TunerDisplay
        :note="foundNote"
      />

      <div class="mt-2 flex justify-center text-base-content font-bold text-8xl">{{ foundNote?.name || '-' }}{{ foundNote ? ' ' + foundNote.octave : '' }}</div>
    </div>

    <canvas
        class="absolute bottom-0 left-0 right-0 w-full h-1/4"
        ref="visualizer"
    />
  </div>
</template>

<script setup lang="ts">
import type {Note} from '@chordbook/tuner'
import {createTuner} from '@chordbook/tuner'
import type {Ref} from "vue";
import {useElementSize} from "@vueuse/core";
import TunerDisplay from "~/components/modules/tuner/components/TunerDisplay.vue";

definePageMeta({
  title: 'Tuner'
})

useSEODescription("Your essential tool for precise tuning on the go. Keep your instrument in perfect pitch with ease.");

const tuner = createTuner({
  // The callback to call when a note is detected.
  onNote: note => {
    foundNote.value = note;
  },

  // Here are some other settings you can fiddle with and their default values.
  // (let us know if you find values that work better).

  // The number of milliseconds between each pitch detection.
  updateInterval: 10,

  // The frequency of middle A. Defaults to 440Hz.
  a4: 440,

  // The minimum clarity threshold. Anything below this will be ignored
  clarityThreshold: 0.9,

  // The minimum volume threshold. -1000 means 1/1000th the volume of the loudest sound.
  minVolumeDecibels: -1000,

  // The minimum and maximum frequencies to detect. To reduce noise, everything else is
  // filtered out using a lowpass and highpass filter.
  minFrequency: 27.5, // A0, Lowest note on a piano
  maxFrequency: 4186.01, // C8, Highest note on a piano

  // The sample rate to use for the audio context.
  // https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/sampleRate
  sampleRate: 44100,

  // The size of buffer to use for frequency analysis, which maps to the `fftSize`:
  // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize
  bufferSize: 8192,

  // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/smoothingTimeConstant
  smoothingTimeConstant: 0.8
})

const visualizer = ref() as Ref<HTMLCanvasElement>;
const foundNote = ref(null) as Ref<Note | null>;

const bufferLength = tuner.analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);
// Just get the low end of the spectrum
const displayLength = Math.sqrt(bufferLength) * 2;

function visualize() {
  const ctx = visualizer.value.getContext("2d")!;
  visualizer.value.width = visualizer.value.offsetWidth
  visualizer.value.height = visualizer.value.offsetHeight

  tuner.analyser.getByteFrequencyData(dataArray);

  ctx.clearRect(0, 0, visualizer.value.width, visualizer.value.height);

  const barWidth = (visualizer.value.width / displayLength);
  let x = 0;

  for (let i = 0; i < displayLength; i++) {
    const barHeight = (visualizer.value.height * (dataArray[i] / 255));

    ctx.fillStyle = `hsl(221, 83%, 55%)`;
    ctx.fillRect(x, visualizer.value.height - barHeight, barWidth, barHeight);

    x += barWidth;
  }
  requestAnimationFrame(visualize);
}

onMounted(() => {
  // Request access to the microphone and begin pitch detection
  tuner.start();

  // visualize();
})

onUnmounted(() => {
  // Stop pitch detection and release the microphone
  tuner.stop();
})
</script>

<style scoped lang="scss">
</style>