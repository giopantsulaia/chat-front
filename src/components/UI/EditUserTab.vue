<template>
  <form-layout @on-submit="submitUpdate">
    <input-group :options="options" />
    <button class="mt-24 bg-blue-400 w-24 mx-auto py-2 rounded-lg">Save</button>
  </form-layout>
</template>
<script lang="ts">
import FormLayout from "../layouts/FormLayout.vue";
import InputGroup from "../inputs/InputGroup.vue";
import { mapState } from "pinia";
import { useUserStore } from "../../stores/user";
import { Options } from "../types/options";
import { useAuthStore } from "../../stores/auth";
export default {
  components: {
    FormLayout,
    InputGroup,
  },
  data() {
    return {
      settings: "",
      options: [
        {
          name: "name",
          rules: "alpha_spaces|min:2|max:16",
          placeholder: "",
          type: "text",
        },
        {
          name: "last_name",
          rules: "alpha_spaces|min:2|max:32",
          placeholder: "",
          type: "text",
        },
        {
          name: "email",
          rules: "email",
          placeholder: "",
          type: "email",
          error: "",
        },
        {
          name: "phone_number",
          rules: "",
          placeholder: "",
          type: "number",
        },
        {
          name: "birth_date",
          rules: "",
          placeholder: "",
          type: "date",
        },
      ] as Array<Options>,
    };
  },

  mounted() {
    setTimeout(() => {
      const userStore = useUserStore();
      this.options[0]["placeholder"] = userStore.name;
      this.options[1]["placeholder"] = userStore.last_name;
      this.options[2]["placeholder"] = userStore.email;
    }, 200);
  },
  methods: {
    submitUpdate(values: object) {
      console.log(values);
    },
  },
};
</script>
