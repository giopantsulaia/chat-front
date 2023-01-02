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
        />
      </input-layout>
      <input-layout @on-edit-click="edit('phone')">
        <base-input
          type="number"
          name="phone"
          rules="numeric"
          :placeholder="phone"
          :disabled="show.includes('phone')"
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
};
</script>
