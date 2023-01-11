<template>
  <BaseInput
    v-for="option in options"
    :type="option.type"
    :name="option.name"
    :rules="option.rules"
    :placeholder="option.placeholder"
    :error="option.error"
    :label="option.label"
  ></BaseInput>
</template>
<script lang="ts">
import BaseInput from "@/components/inputs/BaseInput.vue";
import { Options } from "@/types/options.js";
export default {
  components: {
    BaseInput,
  },
  props: {
    options: {
      type: Array<Options>,
      required: true,
    },
  },
};
</script>
