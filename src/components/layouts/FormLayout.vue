<template>
  <Form
    @submit="submit"
    id="form"
    class="sm:w-9/12 w-full flex flex-col mx-auto"
  >
    <slot></slot>
  </Form>
</template>
<script lang="ts">
import { Form } from "vee-validate";
export default {
  components: { Form },
  emits: ["onSubmit"],
  methods: {
    submit(values: object) {
      this.$emit("onSubmit", values);
    },
  },
};
</script>
