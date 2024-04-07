import type { Sampler } from "tone";
import * as Tone from "tone";

/**
 * Get a random integer the minimum (inclusive) and  between maximum (exclusive)
 */
function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Get a random integer between the minimum (inclusive) and maximum (inclusive)
 */
function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Return a new Tone.Sampler from the given sampleUrl path
 * Samples paths are stored in SoundSampleList.ts
 */
function getSampler(sampleUrl?: string): Promise<Sampler> {
  if (!sampleUrl) {
    sampleUrl = "/sound-samples/acoustic_guitar_steel_mp3/";
  }

  return new Promise((resolve) => {
    const sampler: Sampler = new Tone.Sampler({
      urls: {
        A1: "A1.mp3",
        D1: "D1.mp3",
        A2: "A2.mp3",
        D2: "D2.mp3",
        A3: "A3.mp3",
        D3: "D3.mp3",
        A4: "A4.mp3",
        D4: "D4.mp3",
        A5: "A5.mp3",
        D5: "D5.mp3",
        A6: "A6.mp3",
        D6: "D6.mp3",
        A7: "A7.mp3",
        D7: "D7.mp3",
      },
      baseUrl: sampleUrl,
    }).toDestination();

    Tone.loaded().then(() => {
      resolve(sampler);
    });
  });
}

export { getRandomInt, getRandomIntInclusive, getSampler };
