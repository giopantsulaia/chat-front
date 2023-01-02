<template>
  <div
    class="sm:w-1/4 w-3/4 absolute left-0 right-0 mx-auto bg-white rounded-xl flex flex-col items-center mt-16 shadow-2xl pb-10 border border-gray-300"
  >
    <h1 class="text-blue-700 text-3xl font-medium pt-4">Success!</h1>
    <p class="text-xs">{{ message }}</p>
    <success-check class="my-6"></success-check>
    <p class="px-10 text-sm uppercase font-black text-center">
      Verification link has been sent to your email, please follow instructions
      to proceed.
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
import SuccessCheck from "../../icons/SuccessCheck.vue";
export default {
  emits: ["onClose"],
  components: {
    SuccessCheck,
  },
  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>
