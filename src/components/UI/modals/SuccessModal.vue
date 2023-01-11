<template>
  <div
    class="sm:w-1/4 w-3/4 absolute left-0 right-0 mx-auto bg-white rounded-xl flex flex-col items-center mt-16 shadow-2xl pb-10 border border-gray-300 top-36"
  >
    <h1 class="text-blue-700 text-3xl font-medium pt-4">Success!</h1>
    <p class="text-xs">{{ headerMessage }}</p>
    <success-check class="my-6"></success-check>
    <p class="px-10 text-sm uppercase font-black text-center">
      {{ message }}
    </p>
    <button
      class="bg-blue-200 text-blue-800 px-4 py-2 mt-16 w-24 rounded-lg border"
      @click="$emit('onClose')"
    >
      Close
    </button>
  </div>
</template>
<script lang="ts">
import SuccessCheck from "@/components/icons/SuccessCheck.vue";
export default {
  components: {
    SuccessCheck,
  },
  props: {
    headerMessage: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  emits: ["onClose"],
};
</script>
