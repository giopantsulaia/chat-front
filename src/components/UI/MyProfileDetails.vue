<template>
  <div class="flex flex-col gap-6 w-2/3">
    <div
      class="flex flex-col items-center bg-white shadow-xl rounded-lg border py-6"
    >
      <img
        src="https://t3.ftcdn.net/jpg/03/39/45/96/360_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg"
        alt="user profile picture"
        class="w-56 border-2 rounded-full select-none"
      />
      <p class="text-2xl capitalize mt-4 font-semibold">
        {{ firstName + " " + lastName }}
      </p>
      <p class="text-base text-gray-400 font-medium">{{ email }}</p>
      <button
        class="bg-green-600 w-28 h-10 mt-4 rounded-md font-bold text-white border"
        @click="$router.push({ name: 'profile', query: { tab: 'settings' } })"
      >
        Edit Profile
      </button>
    </div>
    <ul class="h-2/5 shadow-xl border bg-white text-gray-500">
      <li class="p-4 border-b flex justify-between">
        <span class="font-medium text-black">Github</span> Link
      </li>
      <li class="p-4 border-b flex justify-between">
        <span class="font-medium text-black">Twitter</span>Link
      </li>
      <li class="p-4 border-b flex justify-between">
        <span class="font-medium text-black">Instagram</span>Link
      </li>
      <li class="p-4 border-b flex justify-between">
        <span class="font-medium text-black">Facebook</span>Link
      </li>
    </ul>
  </div>
  <div class="flex flex-col w-full gap-10 h-fit bg-white shadow-xl">
    <ul class="w-full h-2/5 text-gray-500">
      <li class="flex p-4 border-b capitalize">
        <span class="mr-24 w-36 text-black font-medium">Full Name </span
        >{{ firstName + " " + lastName }}
      </li>
      <li class="flex p-4 border-b">
        <span class="mr-24 w-36 text-black font-medium"> Email </span>
        {{ email }}
      </li>
      <li class="flex p-4 border-b">
        <span class="mr-24 w-36 text-black font-medium">Phone </span>{{ phone }}
      </li>
      <li class="flex p-4 border-b capitalize">
        <span class="mr-24 w-36 text-black font-medium">Gender</span>
        {{ gender }}
      </li>
      <li class="flex p-4 border-b">
        <span class="mr-24 w-36 text-black font-medium">Birth Date</span>
        {{ birthDate }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { mapState } from "pinia";
import { useUserStore } from "../../stores/user";
export default {
  computed: {
    ...mapState(useUserStore, [
      "firstName",
      "lastName",
      "email",
      "birthDate",
      "gender",
      "phone",
    ]),
  },
};
</script>
