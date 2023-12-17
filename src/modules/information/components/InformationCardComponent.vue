<template>
  <div class="chord-information flex justify-center">
    <BaseCard :body-classes="['p-4', 'lg:p-6']">
      <template #title>
        <template
          v-if="fretboardParametersStore.displayType === DisplayTypeEnum.Chord"
          >Chord Information</template
        >
        <template v-else>Chord Information</template>
        <button
          class="btn btn-primary btn-sm"
          @click="playNotes(notesToPlay)"
        >
          <svg-icon type="mdi" :path="mdiPlay" size="18" /></button
      ></template>

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
          <span>{{ entity.intervals[index] }}</span>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";
import ChordInformation from "@/modules/information/components/ChordInformation.vue";
import { DisplayTypeEnum } from "@/commons/enums/DisplayTypeEnum";
import BaseCard from "@/components/base/cards/BaseCard.vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPlay } from "@mdi/js";
import { playNotes } from "@/modules/information/services/informations";
import { getChord, getChordNotes } from "@/commons/helpers/chords";
import {
  getClassMap,
  getNoteClass,
} from "@/modules/fretboard/services/noteClassMaps";
import { Chord, type NoNote, Note, Scale } from "@tonaljs/tonal";
import { computed, ref } from "vue";
import { getScale, getScaleNotes } from "@/commons/helpers/scales";
import type { NoteClassMap } from "@/modules/fretboard/types/fretboard";

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
</script>

<style scoped></style>
