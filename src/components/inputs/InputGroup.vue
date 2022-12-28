<template>
  <TextInput
    v-for="option in options"
    :type="option.type"
    :name="option.name"
    :rules="option.rules"
    :placeholder="option.placeholder"
    :error="option.error"
  ></TextInput>
</template>
<script lang="ts">
import TextInput from "./TextInput.vue";
import { Options } from "../types/options.js";
export default {
  props: {
    options: {
      type: Array<Options>,
      required: true,
    },
  },
  components: {
    TextInput,
  },
};
</script>
