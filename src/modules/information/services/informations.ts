import { getSampler } from "@/commons/helpers/utils";
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";
import * as Tone from "tone";

const fretboardParameterStore = useFretboardParametersStore();

async function playNotes(notes: Note[]): Promise<void> {
  const sampler = await getSampler(fretboardParameterStore.selectedSoundSample.url);
  const now = Tone.now();
  let increment = 0;

  notes.forEach((note) => {
    sampler.triggerAttackRelease(note, 1, now + increment);

    increment += 0.5;
  });
}

export { playNotes };