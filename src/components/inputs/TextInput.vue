<template>
  <div class="flex flex-col">
    <label :for="name" class="mt-4 font-black"
      >{{ name.charAt(0).toUpperCase() + name.slice(1).split("_").join(" ") }}
      <span class="text-red-600 text-sm">{{
        rules && rules.substring(0, 8) === "required" ? "*" : ""
      }}</span></label
    >
    <Field
      :type="type"
      :name="name"
      :rules="rules"
      class="py-2 outline-none border-b-2 border-gray-400 border-opacity-50 my-1"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    ></Field>
    <ErrorMessage :name="name" class="text-red-600 text-sm" />
    <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
  </div>
</template>
<script lang="ts">
import { Field, ErrorMessage } from "vee-validate";
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    rules: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    error: {
      type: String,
      required: false,
    },
  },

  components: {
    Field,
    ErrorMessage,
  },
};
</script>
