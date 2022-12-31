<template>
  <div class="w-full">
    <h1 class="text-xl mx-auto w-48">General Information</h1>

    <div class="flex flex-wrap gap-x-24 items-center">
      <input-layout @on-edit-click="handleEdit('first_name')">
        <base-input
          name="first_name"
          rules="alpha_spaces|min:2|max:16"
          :placeholder="first_name"
          :disabled="edit.includes('first_name')"
          @input="isEditting = true"
        />
      </input-layout>
      <input-layout @on-edit-click="handleEdit('last_name')">
        <base-input
          name="last_name"
          rules="alpha_spaces|min:2|max:32"
          :placeholder="last_name"
          :disabled="edit.includes('last_name')"
          @input="isEditting = true"
        />
      </input-layout>
      <input-layout @on-edit-click="handleEdit('birthDate')">
        <div class="flex flex-col w-full">
          <label for="birthDate" class="mt-4 font-medium"> Birth Date </label>
          <Field
            class="outline-none border-b-2 border-gray-400 border-opacity-50 my-1 rounded p-2"
            type="date"
            name="birthDate"
            :placeholder="birthDate || 'mm/dd/yy'"
            :disabled="edit.includes('birthDate')"
            v-model="birthDate"
            min="1920-01-01"
            :max="today"
            @change="isEditting = true"
          />
        </div>
      </input-layout>
      <div class="w-72 flex flex-col relative">
        <label for="gender" class="font-medium mt-4">Gender</label>
        <p class="absolute z-50 bottom-3 left-1">
          {{ gender ? "" : "Choose gender..." }}
        </p>
        <select
          class="h-10 w-full outline-none my-1"
          name="gender"
          v-model="gender"
          id="gender"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <label for="about" class="mt-10">About me</label>
      <textarea
        name=""
        id="about"
        maxlength="420"
        rows="5"
        class="resize-none w-11/12 outline-none rounded border-2"
      >
      </textarea>
    </div>
  </div>
</template>
<script lang="ts">
import FormLayout from "../layouts/FormLayout.vue";
import BaseInput from "../inputs/BaseInput.vue";
import { useUserStore } from "../../stores/user";
import SaveIcon from "../icons/SaveIcon.vue";
import InputLayout from "../layouts/InputLayout.vue";
import { Field } from "vee-validate";
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
      first_name: "" as string,
      last_name: "" as string,
      birthDate: "" as string,
      gender: "",
      edit: ["first_name", "last_name", "birthDate"],
      isEditting: false as boolean,
    };
  },
  computed: {
    today() {
      let date = new Date();
      date.toISOString().split("T")[0];
      const offset = date.getTimezoneOffset();
      date = new Date(date.getTime() - offset * 60 * 1000);
      return date.toISOString().split("T")[0];
    },
  },
  mounted() {
    setTimeout(() => {
      const userStore = useUserStore();
      this.first_name = userStore.name;
      this.last_name = userStore.lastName;
      // this.birthDate = userStore.birthDate;
    }, 200);
  },
  methods: {
    async submitUpdate(values: object) {
      // await axios.post("/update-user", values).then();
      console.log(values);
    },

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
<style scoped>
::placeholder {
  color: black;
}
</style>
