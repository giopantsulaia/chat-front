<template>
  <section class="sm:w-2/3 mx-auto mt-16 p-8 rounded-lg flex shadow-2xl">
    <div
      class="mx-auto sm:w-1/2"
      :class="{ 'blur-[2px] pointer-events-none': loading || registered }"
    >
      <h1 class="text-3xl font-black mb-10 w-48 mx-auto">Sign Up</h1>
      <form-layout @on-submit="submitForm">
        <input-group :options="options" />
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
      </form-layout>
    </div>
    <div
      class="w-1/2 flex-col sm:flex hidden"
      :class="{ 'blur-[2px] pointer-events-none': loading || registered }"
    >
      <img
        src="src/assets/chat.png"
        alt=""
        class="w-full brightness-110 rounded-3xl"
      />
    </div>
    <verification-sent
      v-if="registered"
      @on-close="closeModal"
    ></verification-sent>
    <div
      class="absolute left-0 right-0 mx-auto mt-48 w-36 flex flex-col items-center"
      v-if="loading"
    >
      <base-loader></base-loader>
      <p class="text-sm -mt-4 text-blue-700">Please wait...</p>
    </div>
  </section>
</template>
<script lang="ts">
import FormLayout from "../layouts/FormLayout.vue";
import InputGroup from "../inputs/InputGroup.vue";
import axios from "../../config/axios";
import VerificationSent from "../UI/modals/VerificationSent.vue";
import BaseLoader from "../UI/BaseLoader.vue";
import { Options } from "../types/options";
export default {
  data() {
    return {
      registered: false,
      loading: false,
      options: [
        {
          name: "name",
          rules: "required|alpha_spaces|min:2|max:16",
          placeholder: "Enter your name",
          type: "text",
        },
        {
          name: "last_name",
          rules: "required|alpha_spaces|min:2|max:32",
          placeholder: "Enter your last name",
          type: "text",
        },
        {
          name: "email",
          rules: "required|email",
          placeholder: "Enter your email",
          type: "email",
          error: "",
        },
        {
          name: "password",
          rules: "required|min:6|max:255",
          placeholder: "Choose password",
          type: "password",
        },
        {
          name: "password_confirmation",
          rules: "confirmed:@password",
          placeholder: "Confirm password",
          type: "password",
        },
      ] as Array<Options>,
    };
  },
  methods: {
    submitForm(values: object) {
      this.loading = true;
      axios
        .post("register", values)
        .then(() => {
          this.loading = false;
          this.registered = true;
        })
        .catch((res) => {
          this.loading = false;
          if (res.response.status === 422) {
            this.options[2]["error"] =
              "Account with this email already exists!";
          }
        });
    },
    closeModal() {
      this.registered = false;
      this.$router.push({ name: "login" });
    },
  },
  components: {
    FormLayout,
    InputGroup,
    VerificationSent,
    BaseLoader,
  },
};
</script>
