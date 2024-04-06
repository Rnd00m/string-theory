<template>
  <div class="hidden portrait:flex lg:flex chord-information justify-center">
    <BaseCard :body-classes="['p-4', 'lg:p-6']">
      <template #title>
        <template
          v-if="fretboardParametersStore.displayType === DisplayTypeEnum.Chord"
          >Chord Information</template
        >
        <template v-else>Scale Information</template>
      </template>

      <ChordInformation
        v-if="fretboardParametersStore.displayType === DisplayTypeEnum.Chord"
      ></ChordInformation>

      <div
        class="grid grid-flow-col justify-center gap-2 md:gap-4 lg:gap-6 items-start"
      >
        <button
          class="btn btn-primary btn-sm h-9"
          @click="playNotes(notesToPlay)"
        >
          <SvgIcon type="mdi" :path="mdiPlay" size="18" />
        </button>
        <div
          v-for="(note, index) in notes"
          :key="'chord-information-note-' + note"
          class="flex flex-col gap-2"
        >
          <div
            class="px-3 text-lg rounded-lg h-9 leading-9"
            :class="[
              getNoteClass(Note.get(note), classMap),
              {
                'highlitghted-note': note.pc === currentPlayedNote,
              },
            ]"
          >
            {{ note.pc }}
          </div>
          <div
            class="information-note text-center"
            :class="{
              'highlitghted-note': note.pc === currentPlayedNote,
            }"
          >
            {{ entity.intervals[index] }}
          </div>
        </div>
      </div>
    </BaseCard>
  </div>

  <input type="checkbox" id="information-modal" class="modal-toggle" />
  <label for="information-modal" class="modal cursor-pointer">
    <label class="modal-box relative w-3/4 max-w-5xl" for="">
      <label
        for="information-modal"
        class="btn btn-sm btn-circle absolute right-2 top-2"
        >✕</label
      >
      <h2 class="card-title mb-2">
        <template
          v-if="fretboardParametersStore.displayType === DisplayTypeEnum.Chord"
          >Chord Information</template
        >
        <template v-else>Scale Information</template>
        <button class="btn btn-primary btn-sm" @click="playNotes(notesToPlay)">
          <SvgIcon type="mdi" :path="mdiPlay" size="18" />
        </button>
      </h2>

      <ChordInformation
        v-if="fretboardParametersStore.displayType === DisplayTypeEnum.Chord"
      ></ChordInformation>

      <div class="flex justify-center gap-2 md:gap-4 lg:gap-8 flex-row">
        <div
          v-for="(note, index) in notes"
          :key="'chord-information-note-' + note"
          class="grid h-20 card place-items-center"
        >
          <span
            class="px-3 py-1 text-lg rounded-lg information-note"
            :class="getNoteClass(Note.get(note), classMap)"
          >
            {{ note.pc }}
          </span>
          <span
            class="information-note"
            :class="{
              'highlitghted-note': note.pc === currentPlayedNote,
            }"
            >{{ entity.intervals[index] }}</span
          >
        </div>
      </div>
    </label>
  </label>
</template>

<script setup lang="ts">
import {
getClassMap,
getNoteClass,
} from "@/components/modules/fretboard/services/noteClassMaps";
import type { NoteClassMap } from "@/components/modules/fretboard/types/fretboard";
import { DisplayTypeEnum } from "@/utils/enums/DisplayTypeEnum";
import { getChord, getChordNotes } from "@/utils/helpers/chords";
import { getScale, getScaleNotes } from "@/utils/helpers/scales";
import { getSampler } from "@/utils/helpers/utils";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPlay } from "@mdi/js";
import { Note, type NoNote } from "@tonaljs/tonal";
import { computed, ref } from "vue";

const fretboardParametersStore = useFretboardParametersStore();

const rootNote = ref<Note | NoNote>(
  Note.get(
    fretboardParametersStore.note + fretboardParametersStore.defaultPitchClass
  )
);

const entity = computed<Chord | Scale>(() => {
  if (fretboardParametersStore.displayType === DisplayTypeEnum.Chord) {
    return getChord(rootNote.value, fretboardParametersStore.chordType);
  }

  return getScale(rootNote.value, fretboardParametersStore.scaleName);
});

const notes = computed<Note[]>(() => {
  if (fretboardParametersStore.displayType === DisplayTypeEnum.Chord) {
    return getChordNotes(entity.value);
  }

  return getScaleNotes(entity.value);
});

const notesToPlay = computed<string[]>(() => {
  let entityNotes = notes.value.map((note) => `${note.pc}4`);

  if (fretboardParametersStore.displayType === DisplayTypeEnum.Chord) {
    return entityNotes;
  }

  entityNotes.push(`${rootNote.value.pc}5`);

  return entityNotes;
});

const classMap = computed<NoteClassMap[]>(() => {
  return getClassMap(entity.value, true, true);
});

const currentPlayedNote = ref<string | null>(null);

async function playNotes(notes: string[]): Promise<void> {
  const sampler = await getSampler(
    fretboardParametersStore.selectedSoundSample.url
  );

  notes.forEach((note, index) => {
    setTimeout(() => {
      currentPlayedNote.value = note.slice(0, -1);

      sampler.triggerAttackRelease(note, 1);
    }, index * 500);
    if (index === notes.length - 1) {
      setTimeout(() => {
        currentPlayedNote.value = null;
      }, (index + 1) * 500);
    }
  });
}
</script>

<style scoped>
.information-note {
  transition: transform 300ms ease;
}

.highlitghted-note {
  transform: translateY(-5px);
  font-weight: bold;
}
</style>
