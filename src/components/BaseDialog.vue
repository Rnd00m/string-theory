<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="close" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-200 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-100 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center">
          <TransitionChild
            as="template"
            enter="duration-200 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="modal-box text-left"
              :class="{
                [props.modalBoxClasses]: props.modalBoxClasses,
              }"
            >
              <DialogTitle v-if="props.title" as="h3" class="text-lg font-bold">
                {{ props.title }}
              </DialogTitle>
              <slot name="title" v-else />

              <slot />

              <div
                class="modal-action"
                v-if="!props.showConfirm || props.showCancel"
              >
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
                    v-if="props.showConfirm"
                    value="true"
                    class="btn"
                    @click.prevent="confirm"
                  >
                    {{ props.confirmText }}
                  </button>
                </slot>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

const props = defineProps({
  title: {
    type: String,
    default: null,
  },
  confirmText: {
    type: String,
    default: "Confirm",
  },
  cancelText: {
    type: String,
    default: "Cancel",
  },
  showConfirm: {
    type: Boolean,
    default: false,
  },
  showCancel: {
    type: Boolean,
    default: false,
  },
  modalBoxClasses: {
    type: String,
    default: "",
  },
});

const isOpen = ref(false);

const close = () => {
  isOpen.value = false;
};
const open = () => {
  isOpen.value = true;
};

const emit = defineEmits(["confirm", "cancel"]);

const cancel = () => {
  close();
  emit("cancel");
};

const confirm = () => {
  close();
  emit("confirm");
};

defineExpose({
  open,
  close,
  isOpen,
});
</script>

<style scoped lang="scss">
.modal-box::-webkit-scrollbar-thumb {
  border: 6px solid transparent;
  border-radius: var(--rounded-box);
  background-color: hsl(var(--bc) / var(--tw-bg-opacity));
  background-clip: padding-box;
  --tw-bg-opacity: 0.5;
  --tw-border-opacity: 0.2;
}

.modal-box::-webkit-scrollbar {
  width: 20px;
}
</style>
