<template>
  <div class="hidden portrait:flex lg:flex chord-information justify-center">
    <BaseCard :body-classes="['p-4', 'lg:p-6']">
      <template #title>
        <template
          v-if="fretboardParametersStore.displayType === DisplayTypeEnum.Chord"
          >Chord Information</template
        >
        <template v-else>Chord Information</template>
        <button class="btn btn-primary btn-sm" @click="playNotes(notesToPlay)">
          <svg-icon type="mdi" :path="mdiPlay" size="18" />
        </button>
      </template>

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
            class="px-3 py-1 text-lg rounded-lg"
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
        <template v-else>Chord Information</template>
        <button class="btn btn-primary btn-sm" @click="playNotes(notesToPlay)">
          <svg-icon type="mdi" :path="mdiPlay" size="18" />
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
            class="px-3 py-1 text-lg rounded-lg"
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
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";
import ChordInformation from "@/modules/information/components/ChordInformation.vue";
import { DisplayTypeEnum } from "@/commons/enums/DisplayTypeEnum";
import BaseCard from "@/components/base/cards/BaseCard.vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPlay } from "@mdi/js";
import { getChord, getChordNotes } from "@/commons/helpers/chords";
import {
  getClassMap,
  getNoteClass,
} from "@/modules/fretboard/services/noteClassMaps";
import { Chord, type NoNote, Note, Scale } from "@tonaljs/tonal";
import { computed, ref } from "vue";
import { getScale, getScaleNotes } from "@/commons/helpers/scales";
import type { NoteClassMap } from "@/modules/fretboard/types/fretboard";
import { getSampler } from "@/commons/helpers/utils";

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

async function playNotes(notes: Note[]): Promise<void> {
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
