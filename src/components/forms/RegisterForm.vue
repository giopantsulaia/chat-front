<template>
  <section class="sm:w-2/3 mx-auto mt-16 p-8 rounded-lg flex shadow-2xl">
    <div class="mx-auto sm:w-1/2">
      <h1 class="text-3xl font-black mb-10 w-48 mx-auto">Sign Up</h1>
      <Form
        @submit="submitForm"
        id="form"
        class="sm:w-10/12 w-full flex flex-col"
      >
        <InputGroup :options="options" />
        <div
          class="mt-16 flex sm:flex-row flex-col items-center w-1/2 mx-auto sm:gap-10 gap-4"
        >
          <button
            type="submit"
            class="bg-blue-300 w-36 mx-auto px-6 py-3 text-white font-semibold rounded-lg"
          >
            Register
          </button>
          <p
            class="underline whitespace-nowrap text-sm cursor-pointer w-36 mx-auto"
            @click="$router.replace({ name: 'login' })"
          >
            Already have an account
          </p>
        </div>
      </Form>
    </div>
    <div class="w-1/2 flex-col sm:flex hidden">
      <img
        src="src/assets/chat.png"
        alt=""
        class="w-full brightness-110 rounded-3xl"
      />
    </div>
  </section>
</template>
<script lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
import InputGroup from "../inputs/InputGroup.vue";
export default {
  data() {
    return {
      options: [
        {
          name: "name",
          rules: "required|alpha_num",
          placeholder: "Enter your name",
          type: "text",
          iconPath: "src/assets/user.svg",
        },
        {
          name: "last_name",
          rules: "required",
          placeholder: "Enter your last name",
          type: "text",
        },
        {
          name: "email",
          rules: "required",
          placeholder: "Enter your email",
          type: "email",
        },
        {
          name: "password",
          rules: "required",
          placeholder: "Choose password",
          type: "password",
        },
        {
          name: "password_confirmation",
          rules: "required|confirmed:@password",
          placeholder: "Confirm password",
          type: "password",
        },
      ] as Array<Object>,
    };
  },
  methods: {
    submitForm(values: object) {
      console.log(values);
    },
  },
  components: {
    Form,
    Field,
    ErrorMessage,
    InputGroup,
  },
};
</script>
