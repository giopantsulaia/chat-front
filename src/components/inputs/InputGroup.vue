<template>
  <TextInput
    v-for="option in options"
    :type="option.type"
    :name="option.name"
    :rules="option.rules"
    :placeholder="option.placeholder"
  ></TextInput>
</template>
<script lang="ts">
import TextInput from "./TextInput.vue";
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  components: {
    TextInput,
  },
};
</script>
