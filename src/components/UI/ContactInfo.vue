<template>
  <div class="w-full">
    <h1 class="text-xl mx-auto w-1/3 border-b text-center">
      Contact Information
    </h1>
    <div class="flex gap-x-40 px-8">
      <input-layout @on-edit-click="edit('email')" class="relative">
        <base-input
          name="email"
          rules="email"
          error=""
          :placeholder="email"
          :disabled="show.includes('email')"
          :label="true"
        />
        <p v-if="emailExists" class="absolute -bottom-6 text-sm text-red-500">
          Email already used
        </p>
      </input-layout>
      <input-layout @on-edit-click="edit('phone')">
        <base-input
          type="number"
          name="phone"
          rules="numeric"
          :placeholder="phone"
          :disabled="show.includes('phone')"
          :label="true"
        />
      </input-layout>
    </div>
  </div>
</template>
<script lang="ts">
import FormLayout from "../layouts/FormLayout.vue";
import BaseInput from "../inputs/BaseInput.vue";
import { useUserStore } from "../../stores/user";
import SaveIcon from "../icons/SaveIcon.vue";
import InputLayout from "../layouts/InputLayout.vue";
import { mapState } from "pinia";
export default {
  components: {
    FormLayout,
    BaseInput,
    InputLayout,
    SaveIcon,
  },
  data() {
    return {
      show: ["email", "phone"],
    };
  },

  computed: {
    ...mapState(useUserStore, ["email", "phone"]),
  },
  methods: {
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
  props: {
    emailExists: {
      type: Boolean,
      required: false,
    },
  },
};
</script>
