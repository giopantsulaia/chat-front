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
      <form-layout @on-submit="submitForm">
        <InputGroup :options="options" />
        <p class="text-red-600 text-sm">{{ error }}</p>
        <div
          class="mt-16 flex xl:flex-row flex-col justify-center items-center mx-auto sm:gap-10 gap-4 w-fit"
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
      </form-layout>
    </div>
  </section>
</template>
<script lang="ts">
import FormLayout from "@/components/layouts/FormLayout.vue";
import InputGroup from "@/components/inputs/InputGroup.vue";
import axios from "@/config/axios";
import { useAuthStore } from "@/stores/auth.js";
import { Options } from "@/types/options.js";
export default {
  components: {
    FormLayout,
    InputGroup,
  },
  data() {
    return {
      error: "",
      options: [
        {
          name: "email",
          rules: "email",
          placeholder: "Email",
          type: "email",
        },
        {
          name: "password",
          placeholder: "Password",
          type: "password",
        },
      ] as Array<Options>,
    };
  },
  mounted() {
    window.addEventListener("access_token_set", () => {
      this.$router.push({ name: "home" });
    });
  },
  methods: {
    submitForm(values: object) {
      axios
        .post("login", values)
        .then((res) => {
          localStorage.setItem("access_token", res.data.token);
          localStorage.setItem("expires_at", res.data.expires_at);
        })
        .catch((e) => {
          if (e.response.status === 403) {
            this.error = "Account is not verified";
          } else {
            this.error = "Email or password is incorrect.";
          }
        })
        .finally(() => {
          const authStore = useAuthStore();
          authStore.tryLogin();
          this.redirectIfTokenSet();
        });
    },
    redirectIfTokenSet() {
      window.dispatchEvent(
        new CustomEvent("access_token_set", {
          detail: {
            storage: localStorage.getItem("access_token"),
          },
        })
      );
    },
  },
};
</script>
