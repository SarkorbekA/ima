<template>
  <div
    aria-live="assertive"
    class="pointer-events-none z-10 fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
  >
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="props.show"
          class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div class="p-4">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <XCircleIcon
                  v-if="error"
                  class="h-5 w-5 text-red-400"
                  aria-hidden="true"
                />
                <CheckCircleIcon
                  v-else
                  class="h-6 w-6 text-green-400"
                  aria-hidden="true"
                />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">
                  <slot />
                </p>
              </div>
              <div class="ml-4 flex flex-shrink-0">
                <button
                  type="button"
                  @click="$emit('close')"
                  class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { CheckCircleIcon } from "@heroicons/vue/24/outline";
import { XMarkIcon, XCircleIcon } from "@heroicons/vue/20/solid";

const props = defineProps(["show", "error"]);
</script>