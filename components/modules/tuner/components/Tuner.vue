<template>
  <div class="tuner-interface">
    <TunerDisplay
        :note="foundNote"
    />

    <div class="mt-2 flex justify-center text-base-content font-bold text-7xl sm:text-8xl">{{ foundNote?.name || '-' }}<span class="ml-1 text-3xl sm:text-4xl">{{ foundNote?.octave }}</span></div>
  </div>
</template>

<script setup lang="ts">
import type {Note} from '@chordbook/tuner'
import {createTuner} from '@chordbook/tuner'
import type {Ref} from "vue";
import TunerDisplay from "~/components/modules/tuner/components/TunerDisplay.vue";

let resetInterval: Interval;

/**
 * This interval is used to reset the found note after a certain amount of time.
 */
function updateOrResetInterval() {
  if (resetInterval) {
    clearInterval(resetInterval);
    resetInterval = null;
  }

  resetInterval = setInterval(() => {
    foundNote.value = null;
  }, 2500);
}

const tuner = createTuner({
  // The callback to call when a note is detected.
  onNote: note => {
    foundNote.value = note;
    updateOrResetInterval();
  },

  // Here are some other settings you can fiddle with and their default values.
  // (let us know if you find values that work better).

  // The number of milliseconds between each pitch detection.
  updateInterval: 25,

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

onMounted(() => {
  // Request access to the microphone and begin pitch detection
  tuner.start();
})

onUnmounted(() => {
  // Stop pitch detection and release the microphone
  tuner.stop();
})
</script>

<style scoped lang="scss">

</style>