<template>
  <form-layout @on-submit="submitUpdate">
    <div class="flex flex-col">
      <input-layout @on-edit-click="edit('first_name')">
        <text-input
          name="first_name"
          rules="alpha_spaces|min:2|max:16"
          :placeholder="first_name"
          :disabled="show.includes('first_name')"
          @input="isEditting = true"
        />
      </input-layout>
      <input-layout @on-edit-click="edit('last_name')">
        <text-input
          name="last_name"
          rules="alpha_spaces|min:2|max:32"
          :placeholder="last_name"
          :disabled="show.includes('last_name')"
          @input="isEditting = true"
        />
      </input-layout>
      <input-layout @on-edit-click="edit('email')">
        <text-input
          name="email"
          rules="email"
          error=""
          :placeholder="email"
          :disabled="show.includes('email')"
          @input="isEditting = true"
        />
      </input-layout>
    </div>
    <button class="mt-16 bg-blue-400" v-if="isEditting">Save</button>
  </form-layout>
</template>
<script lang="ts">
import FormLayout from "../layouts/FormLayout.vue";
import TextInput from "../inputs/TextInput.vue";
import { useUserStore } from "../../stores/user";
import SaveIcon from "../icons/SaveIcon.vue";
import InputLayout from "../layouts/InputLayout.vue";
export default {
  components: {
    FormLayout,
    TextInput,
    InputLayout,
    SaveIcon,
  },
  data() {
    return {
      first_name: "" as string,
      last_name: "" as string,
      email: "" as string,
      show: ["first_name", "last_name", "email"],
      isEditting: false,
    };
  },

  mounted() {
    setTimeout(() => {
      const userStore = useUserStore();
      this.first_name = userStore.name;
      this.last_name = userStore.lastName;
      this.email = userStore.email;
      console.log(this.first_name);
    }, 200);
  },
  methods: {
    async submitUpdate(values: object) {
      // await axios.post("/update-user", values).then();
      console.log(values);
    },

    edit(name: string) {
      if (this.show.includes(name)) {
        this.show = this.show.filter(function (e) {
          return e !== name;
        });
      } else {
        this.show.push(name);
      }
    },
  },
};
</script>
