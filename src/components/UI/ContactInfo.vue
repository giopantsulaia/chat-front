<template>
  <div class="w-full">
    <h1 class="text-xl mx-auto w-48">Contact Information</h1>
    <div class="flex gap-24">
      <input-layout @on-edit-click="edit('email')">
        <base-input
          name="email"
          rules="email"
          error=""
          :placeholder="email"
          :disabled="show.includes('email')"
          @input="isEditting = true"
        />
      </input-layout>
      <input-layout @on-edit-click="edit('phone')">
        <base-input
          name="phone"
          rules="numeric"
          :placeholder="phone"
          :disabled="show.includes('phone')"
          @input="isEditting = true"
        />
      </input-layout>
    </div>
    <button
      class="mt-16 bg-blue-400 w-32 py-2 rounded-lg border border-black"
      v-if="isEditting"
    >
      Save
    </button>
  </div>
</template>
<script lang="ts">
import FormLayout from "../layouts/FormLayout.vue";
import BaseInput from "../inputs/BaseInput.vue";
import { useUserStore } from "../../stores/user";
import SaveIcon from "../icons/SaveIcon.vue";
import InputLayout from "../layouts/InputLayout.vue";
export default {
  components: {
    FormLayout,
    BaseInput,
    InputLayout,
    SaveIcon,
  },
  data() {
    return {
      email: "" as string,
      phone: "" as string,
      show: ["email", "phone"],
      isEditting: false,
    };
  },

  mounted() {
    setTimeout(() => {
      const userStore = useUserStore();
      this.phone = userStore.phone;
      this.email = userStore.email;
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
