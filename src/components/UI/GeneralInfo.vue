<template>
  <div class="w-full">
    <h1 class="text-xl mx-auto w-1/3 border-b text-center">
      General Information
    </h1>

    <div class="flex flex-wrap gap-x-40 px-8 items-center">
      <input-layout @on-edit-click="handleEdit('first_name')">
        <base-input
          name="first_name"
          rules="alpha_spaces|min:2|max:16"
          :placeholder="firstName"
          :disabled="edit.includes('first_name')"
          :label="true"
        />
      </input-layout>
      <input-layout @on-edit-click="handleEdit('last_name')">
        <base-input
          name="last_name"
          rules="alpha_spaces|min:2|max:32"
          :placeholder="lastName"
          :disabled="edit.includes('last_name')"
          :label="true"
        />
      </input-layout>
      <input-layout @on-edit-click="handleEdit('birthDate')">
        <div class="flex flex-col w-full">
          <label for="birthDate" class="mt-4 font-medium"> Birth Date </label>
          <Field
            class="outline-none border-b-2 border-gray-400 border-opacity-50 my-1 rounded p-2"
            type="text"
            name="birth_date"
            onfocus="(this.type = 'date')"
            onblur="(this.type = 'text')"
            :placeholder="birthDate || 'mm/dd/yy'"
            :disabled="edit.includes('birthDate')"
            min="1920-01-01"
            :max="today"
          />
        </div>
      </input-layout>
      <div class="w-72 flex flex-col relative">
        <label for="gender" class="font-medium mt-4">Gender</label>
        <p class="absolute z-50 bottom-3 left-1 capitalize">
          {{ !isEditting ? gender : "" }}
        </p>
        <Field
          as="select"
          class="h-10 w-full outline-none my-1"
          name="gender"
          id="gender"
          @change="isEditting = true"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </Field>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import FormLayout from "@/components/layouts/FormLayout.vue";
import BaseInput from "@/components/inputs/BaseInput.vue";
import { useUserStore } from "@/stores/user";
import SaveIcon from "@/components/icons/SaveIcon.vue";
import InputLayout from "@/components/layouts/InputLayout.vue";
import { Field } from "vee-validate";
import { mapState } from "pinia";
export default {
  components: {
    FormLayout,
    BaseInput,
    InputLayout,
    SaveIcon,
    Field,
  },
  data() {
    return {
      edit: ["first_name", "last_name", "birthDate"],
      isEditting: false as boolean,
    };
  },
  computed: {
    ...mapState(useUserStore, ["firstName", "lastName", "birthDate", "gender"]),
    today() {
      let date = new Date();
      date.toISOString().split("T")[0];
      const offset = date.getTimezoneOffset();
      date = new Date(date.getTime() - offset * 60 * 1000);
      return date.toISOString().split("T")[0];
    },
  },
  methods: {
    handleEdit(name: string) {
      if (this.edit.includes(name)) {
        this.edit = this.edit.filter(function (e) {
          return e !== name;
        });
      } else {
        this.edit.push(name);
      }
    },
  },
};
</script>
