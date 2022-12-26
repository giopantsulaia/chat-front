<template>
  <section class="sm:w-2/3 mx-auto mt-16 p-8 rounded-lg flex shadow-2xl">
    <div class="w-1/2 flex-col sm:flex hidden">
      <img
        src="src/assets/chat.png"
        alt=""
        class="w-full brightness-110 rounded-3xl"
      />
    </div>
    <div class="mx-auto sm:w-1/2">
      <h1 class="text-3xl font-black mb-10 w-48 mx-auto">Sign In</h1>
      <Form
        @submit="submitForm"
        id="form"
        class="sm:w-9/12 w-full flex flex-col mx-auto"
      >
        <InputGroup :options="options" />
        <div
          class="mt-16 flex sm:flex-row flex-col items-center w-1/2 mx-auto sm:gap-10 gap-4"
        >
          <button
            type="submit"
            class="bg-blue-300 w-48 mx-auto px-6 py-3 text-white font-semibold rounded-lg whitespace-nowrap"
          >
            Log in
          </button>
          <p
            class="underline whitespace-nowrap text-sm cursor-pointer w-36 mx-auto"
            @click="$router.replace({ name: 'registration' })"
          >
            Don't have an account?
          </p>
        </div>
      </Form>
    </div>
  </section>
</template>
<script lang="ts">
import { Form } from "vee-validate";
import InputGroup from "../inputs/InputGroup.vue";
import axios from "../../config/axios";
export default {
  data() {
    return {
      options: [
        {
          name: "email",
          rules: "email",
          placeholder: "Enter your email...",
          type: "email",
        },
        {
          name: "password",
          placeholder: "Enter password...",
          type: "password",
        },
      ] as Array<Object>,
    };
  },
  methods: {
    submitForm(values: object) {
      axios.post("login", values).then((res) => console.log(res));
    },
  },
  components: {
    Form,
    InputGroup,
  },
};
</script>
