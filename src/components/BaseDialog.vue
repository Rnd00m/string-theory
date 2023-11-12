<template>
  <dialog
    ref="dialog"
    class="modal modal-bottom sm:modal-middle"
    @close="visible = false"
  >
    <form
      v-if="visible"
      method="dialog"
      :class="{
        'modal-box rounded-none p-4': true,
        [props.classes]: props.classes,
      }"
    >
      <slot />

      <div class="modal-action" v-if="!props.hideConfirm || props.showCancel">
        <slot name="footer" />
        <slot name="actionButtons">
          <button
            v-if="props.showCancel"
            value="false"
            class="btn"
            @click.prevent="cancel"
          >
            {{ props.cancelText }}
          </button>
          <button
            v-if="!props.hideConfirm"
            value="true"
            class="btn btn-primary"
            @click.prevent="confirm"
          >
            {{ props.confirmText }}
          </button>
        </slot>
      </div>
    </form>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const dialog = ref<HTMLDialogElement>();

const props = defineProps({
  confirmText: {
    type: String,
    default: "Confirm",
  },
  cancelText: {
    type: String,
    default: "Cancel",
  },
  hideConfirm: {
    type: Boolean,
    default: false,
  },
  showCancel: {
    type: Boolean,
    default: false,
  },
  classes: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["confirm", "cancel"]);

const cancel = () => {
  dialog.value?.close();
  emit("cancel");
};

const confirm = () => {
  dialog.value?.close();
  emit("confirm");
};

const visible = ref(false);

const showModal = () => {
  dialog.value?.showModal();
  visible.value = true;
};

defineExpose({
  show: showModal,
  close: (returnVal?: string): void => dialog.value?.close(returnVal),
  visible,
});
</script>
