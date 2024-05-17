<template>
  <div id="tuner" class="tuner w-full px-3 md:px-0 md:w-4/5 lg:w-3/5">
    <div class="tuner-interface">
      <div v-if="foundNote" class="flex justify-between mb-4 px-2 h-hull items-end">
        <div class="text-sm text-base-content text-left w-20">{{ foundNote.frequency.toFixed(0) }} Hz</div>

        <div class="text-3xl" :class="{
          'text-error': precision === -2 || precision === 2,
          'text-warning': precision === -1 || precision === 1,
          'text-success': precision === 0,
        }">
          <span v-if="precision === 0">Perfect</span>
          <span v-else-if="precision === 1">High</span>
          <span v-else-if="precision === -1">Low</span>
          <span v-else-if="precision === 2">Too high</span>
          <span v-else-if="precision === -2">Too low</span>
        </div>

        <div class="text-sm text-base-content text-right w-20">{{ foundNote.cents }} cents</div>
      </div>

      <svg width="680" height="220" viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg">
        <text
            x="39.9999"
            y="50"
            dominant-baseline="middle"
            text-anchor="middle"
        >
          12 000 Hz
        </text>
        <g>
          <path d="M39.9999 92L40.0002 167" stroke="#818181" stroke-linecap="round"/>
        </g>
        <text
            x="39.9999"
            y="210"
            dominant-baseline="middle"
            text-anchor="middle"
        >
          -40
        </text>
        <g>
          <path d="M54.9998 105L55 155" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M69.9998 105L70 155" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M84.9998 105L85 155" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M99.9998 105L100 155" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M115 92L115 167" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M130 105L130 155" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M145 105L145 155" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M160 105L160 155" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M175 105L175 155" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M190 92L190 167" stroke="#818181" stroke-linecap="round"/>
        </g>
        <text
            x="190"
            y="210"
            dominant-baseline="middle"
            text-anchor="middle"
        >
          -20
        </text>
        <g>
          <path d="M205 105L205 155" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M220 105L220 155" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M235 105L235 155" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M250 105L250 155" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M265 92L265 167" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M280 105L280 155" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M295 105L295 155" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M310 105L310 155" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M325 105L325 155" stroke="#818181" stroke-linecap="round"/>
        </g>
        <text
            x="340"
            y="50"
            dominant-baseline="middle"
            text-anchor="middle"
        >
          Perfect!
        </text>
        <g>
          <path d="M340 72L340 187" stroke="#818181" stroke-linecap="round"/>
        </g>
        <text
            x="340"
            y="210"
            dominant-baseline="middle"
            text-anchor="middle"
        >
          0
        </text>
        <g>
          <path d="M355 105L355 155" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M370 105L370 155" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M385 105L385 155" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M400 105L400 155" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M415 92L415 167" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M430 105L430 155" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M445 105L445 155" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M460 105L460 155" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M475 105L475 155" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M490 92L490 167" stroke="#818181" stroke-linecap="round"/>
        </g>
        <text
            x="490"
            y="210"
            dominant-baseline="middle"
            text-anchor="middle"
        >
          20
        </text>
        <g>
          <path d="M505 105L505 155" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M520 105L520 155" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M535 105L535 155" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M550 105L550 155" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M565 92L565 167" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M580 105L580 155" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M595 105L595 155" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M610 105L610 155" stroke="#818181" stroke-linecap="round"/>
        </g>
        <g>
          <path d="M625 105L625 155" stroke="#818181" stroke-linecap="round"/>
        </g>
        <text
            x="640"
            y="50"
            dominant-baseline="middle"
            text-anchor="middle"
        >
          -40 cents
        </text>
        <g>
          <path d="M640 92L640 167" stroke="#818181" stroke-linecap="round"/>
        </g>
        <text
            x="640"
            y="210"
            dominant-baseline="middle"
            text-anchor="middle"
        >
          40
        </text>
        <g opacity="1">
          <path d="M40.0049 70L40.0054 190" stroke="#00E676" stroke-linecap="round"/>
        </g>
      </svg>


      <div class="graduations-container flex justify-between items-center relative" ref="graduationsContainer">
        <span
          class="needle-indicator absolute h-[9.5rem] w-[0.20rem] top-0"
          :class="{
            'bg-error': precision === -2 || precision === 2,
            'bg-warning': precision === -1 || precision === 1,
            'bg-success': precision === 0,
          }"
          :style="{left: `${cursorPosition}px`}"
        />
        <div
          v-for="i in 17" key="i"
          class="graduation-wrapper flex flex-col items-center flex-1"
        >
          <div v-if="isMultipleOf(graduationMarker(i), 20)" class="graduation h-[9rem] w-[0.20rem] bg-base-content"></div>
          <div v-else-if="isMultipleOf(graduationMarker(i), 10)" class="graduation h-[7rem] w-[0.20rem] bg-base-content"></div>
          <div v-else class="graduation h-[6rem] w-[0.125rem] bg-base-content"></div>

          <div
            class="graduation-label text-sm mt-3 text-base-content select-none"
          >{{ (graduationMarker(i)) % 20 === 0 ? graduationMarker(i) : '&nbsp;' }}</div>
        </div>
      </div>


      <div class="mt-2 flex justify-center text-base-content font-bold text-8xl">{{ foundNote?.name || '-' }}</div>
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

definePageMeta({
  title: 'Tuner'
})

useSEODescription("Your essential tool for precise tuning on the go. Keep your instrument in perfect pitch with ease.");

const tuner = createTuner({
  // The callback to call when a note is detected.
  onNote: note => {
    console.log('Note:', note)
    foundNote.value = note;

    // let position = (note.cents / 40) * (width.value / 2) + (width.value / 2) + (49 / 2);
    let position = (0 / 40) * (width.value / 2) + (width.value / 2) + 49 / 2;
    if (position < 0) position = 0;
    if (position > width.value) position = width.value;
    cursorPosition.value = position;
    console.log({cursorPosition: cursorPosition.value});
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

const graduationMarker = (i: number) => -40 + ((i - 1) * 5);
const isMultipleOf = (n: number, m: number) => n % m === 0;

const graduationsContainer = ref() as Ref<HTMLDivElement>;
const cursor = ref() as Ref<HTMLSpanElement>;
const { width } = useElementSize(graduationsContainer);

const cursorPosition = ref(0);

const precision = computed(() => {
  if (foundNote.value === null) return;
  if (foundNote.value.cents > -5 && foundNote.value.cents < 5) return 0;
  if (foundNote.value.cents <= -5 && foundNote.value.cents > -20) return -1;
  if (foundNote.value.cents >= 5 && foundNote.value.cents < 20) return 1;
  if (foundNote.value.cents < -20) return -2;
  if (foundNote.value.cents > 20) return 2;
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
.needle-indicator {
  transition: all .1s ease-in-out;
}
</style>