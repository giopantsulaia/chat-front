<template>
  <main>
    <div class="w-96 mx-auto flex flex-col mt-48">
      <label for="search">Search profile</label>
      <div>
        <input
          type="search"
          name="search"
          v-model="searchKeyword"
          class="border-2 border-blue-400 rounded-lg p-2 outline-none"
        />
        <button @click="searchUser" class="px-4 text-2xl">GO</button>
      </div>
      <p>{{ searchKeyword }}</p>
    </div>
  </main>
</template>
<script setup lang="ts">
import { ref } from "vue";
import axios from "../config/axios/index.js";
const searchKeyword = ref(null);
function searchUser() {
  axios
    .post("search", { keyWord: searchKeyword.value })
    .then((res) => console.log(res));
}
</script>
