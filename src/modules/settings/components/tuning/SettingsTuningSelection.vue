<template>
  <div class="flex flex-row-reverse justify-center gap-5 lg:gap-8">
    <div
      class="flex flex-col gap-1"
      v-for="(note, index) in fretboardParametersStore.fretboard.baseNotes"
      :key="'note-' + index"
    >
      <button
        class="btn btn-square btn-xs lg:btn-sm btn-primary"
        @click="changeStringTuning(index, TuningDirectionEnum.Asc)"
      >
        +
      </button>
      <div class="text-center text-base lg:text-lg">
        {{ note.name }}
      </div>
      <button
        class="btn btn-square btn-xs lg:btn-sm btn-primary"
        @click="changeStringTuning(index, TuningDirectionEnum.Desc)"
      >
        -
      </button>
    </div>
    <div class="flex flex-col gap-1">
      <button class="btn btn-square btn-xs lg:btn-sm" @click="tuneUp">
        +
      </button>
      <div class="text-center text-base lg:text-lg">All</div>
      <button class="btn btn-square btn-xs lg:btn-sm" @click="tuneDown">
        -
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFretboardParametersStore } from "@/modules/settings/stores/fretboardParameters";
import { Note } from "@tonaljs/tonal";
import { TuningDirectionEnum } from "@/modules/settings/enums/TuningDirectionEnum";

const fretboardParametersStore = useFretboardParametersStore();

function tuneUp(): void {
  changeGuitarTuning(TuningDirectionEnum.Asc);
}

function tuneDown(): void {
  changeGuitarTuning(TuningDirectionEnum.Desc);
}

function changeStringTuning(
  stringNumber: number,
  direction: TuningDirectionEnum
): void {
  let interval = direction === TuningDirectionEnum.Asc ? "" : "-";
  interval = `${interval}2m`;

  let newNote = Note.get(
    Note.simplify(
      Note.transpose(
        fretboardParametersStore.fretboard.baseNotes[stringNumber],
        interval
      )
    )
  );
  fretboardParametersStore.fretboard.baseNotes.splice(stringNumber, 1, newNote);
}

function changeGuitarTuning(direction: TuningDirectionEnum) {
  for (let stringNumber = 0; stringNumber < fretboardParametersStore.fretboard.baseNotes.length; stringNumber++) {
    changeStringTuning(stringNumber, direction);
  }
}
</script>

<style scoped lang="scss">
.chord-name {
  text-transform: capitalize;
}
</style>