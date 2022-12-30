<template>
  <form-layout @on-submit="submitUpdate">
    <div v-for="(option, index) in options" class="flex flex-col relative">
      <div
        class="w-full border-2 rounded-lg h-16 flex items-center justify-between relative my-4 cursor-pointer hover:bg-gray-100"
        @click="editColumn(index)"
        v-if="option.show === false"
      >
        <p class="capitalize w-1/3 mx-2 text-gray-500">
          {{ option.name.split("_").join(" ") }} :
        </p>
        <div class="w-1/3">
          <p class="">
            {{ option.placeholder }}
          </p>
        </div>
        <edit-icon class="mx-6" />
      </div>
      <text-input
        :type="option.type"
        :name="option.name"
        :rules="option.rules"
        :placeholder="option.placeholder"
        :error="option.error"
        v-if="option.show"
      />
      <button
        class="mt-4 mx-auto absolute right-0 bottom-1 p-2"
        @click="submitUpdate(index)"
        v-if="option.show === true"
      >
        <save-icon />
      </button>
    </div>
  </form-layout>
</template>
<script lang="ts">
import FormLayout from "../layouts/FormLayout.vue";
import TextInput from "../inputs/TextInput.vue";
import { mapState } from "pinia";
import { useUserStore } from "../../stores/user";
import { Options } from "../types/options";
import { useAuthStore } from "../../stores/auth";
import EditIcon from "../icons/EditIcon.vue";
import SaveIcon from "../icons/SaveIcon.vue";
export default {
  components: {
    FormLayout,
    TextInput,
    EditIcon,
    SaveIcon,
  },
  data() {
    return {
      options: [
        {
          name: "name",
          rules: "alpha_spaces|min:2|max:16",
          type: "text",
          show: false,
        },
        {
          name: "last_name",
          rules: "alpha_spaces|min:2|max:32",
          type: "text",
          show: false,
        },
        {
          name: "email",
          rules: "email",
          type: "email",
          error: "",
          show: false,
        },
        // {
        //   name: "phone_number",
        //   rules: "",
        //   type: "number",
        //   show: false,
        // },
      ] as Array<Options>,
    };
  },

  mounted() {
    setTimeout(() => {
      const userStore = useUserStore();
      this.options[0]["placeholder"] = userStore.name;
      this.options[1]["placeholder"] = userStore.lastName;
      this.options[2]["placeholder"] = userStore.email;
    }, 200);
  },
  methods: {
    submitUpdate(index: number, values: object) {
      console.log(values);
      this.options[index]["show"] = false;
    },
    editColumn(index: number) {
      this.options[index]["show"] = true;
    },
  },
};
</script>
