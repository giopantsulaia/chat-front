<template>
  <main>
    <div class="w-full flex flex-col mt-48">
      <div class="flex flex-col w-96 mx-auto">
        <label for="search">Search profile</label>
        <div>
          <Form @submit="searchUser">
            <Field
              type="search"
              name="search"
              v-model="searchKeyword"
              rules="required|min:2"
              class="border-2 border-blue-400 rounded-lg p-2 outline-none"
            />
            <input type="submit" hidden />
            <button class="px-4 text-2xl">GO</button>
          </Form>
        </div>
      </div>
      <div
        class="w-10/12 h-full mx-auto flex flex-wrap gap-16 justify-center py-16"
      >
        <user-card
          v-for="user in searchedUsers"
          :key="user.id"
          :first_name="user.first_name"
          :last_name="user.last_name"
          :id="user.id"
        />
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { User } from "../types/user";
import { Field, Form } from "vee-validate";
import axios from "../config/axios/index.js";
import UserCard from "../components/UI/cards/UserCard.vue";
const searchKeyword = ref("" as string);
const searchedUsers = ref([] as Array<User>);

function searchUser() {
  axios
    .post("search", { search: searchKeyword.value })
    .then((res) => (searchedUsers.value = res.data.users));
}
</script>
