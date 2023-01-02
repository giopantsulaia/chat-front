<template>
  <div class="flex flex-col w-full">
    <label :for="name" class="mt-4 font-medium" v-if="label"
      >{{ name.charAt(0).toUpperCase() + name.slice(1).split("_").join(" ") }}
      <span class="text-red-600 text-sm">{{
        rules && rules.substring(0, 8) === "required" ? "*" : ""
      }}</span></label
    >
    <Field
      :id="name"
      :type="type"
      :name="name"
      :rules="rules"
      class="outline-none border-b-2 border-gray-400 border-opacity-50 my-1 bg-white rounded p-3"
      :class="{ 'mt-6': !label }"
      :placeholder="placeholder"
      :disabled="disabled"
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
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    error: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    label: {
      type: Boolean,
      required: false,
    },
  },

  components: {
    Field,
    ErrorMessage,
  },
};
</script>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
input::-webkit-input-placeholder {
  color: #999;
}
input:focus::-webkit-input-placeholder {
  color: black;
}

/* Firefox < 19 */
input:-moz-placeholder {
  color: #999;
}
input:focus:-moz-placeholder {
  color: black;
}

/* Firefox > 19 */
input::-moz-placeholder {
  color: #999;
}
input:focus::-moz-placeholder {
  color: black;
}

/* Internet Explorer 10 */
input:-ms-input-placeholder {
  color: #999;
}
input:focus:-ms-input-placeholder {
  color: black;
}
</style>
