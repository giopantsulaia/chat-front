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
      <div class="flex gap-4">
        <button
          class="bg-green-600 w-28 h-10 mt-4 rounded-md font-bold text-white border"
          @click="addFriend"
        >
          {{
            friendship === true
              ? "Friends"
              : friendship === "pending"
              ? "Pending"
              : "Add Friend"
          }}
        </button>
        <button
          class="bg-blue-600 w-28 h-10 mt-4 rounded-md font-bold text-white border"
        >
          Message
        </button>
      </div>
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
import axios from "../../config/axios/index";
export default {
  emits: ["onAddFriend"],
  data() {
    return {
      firstName: "" as string,
      lastName: "" as string,
      email: "" as string,
      gender: "" as string,
      birthDate: "" as string,
      phone: "" as string,
      friendship: "" as string | boolean,
    };
  },
  methods: {
    addFriend() {
      axios.post("/friend-request", { friend_id: this.id }).then((res) => {
        console.log(res.data);
        this.friendship = "pending";
      });
    },
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  beforeMount() {
    axios.get(`users/${this.id}`).then((res) => {
      this.firstName = res.data.user.first_name;
      this.lastName = res.data.user.last_name;
      this.email = res.data.user.email;
      this.phone = res.data.user.phone;
      this.birthDate = res.data.user.birth_date;
      this.gender = res.data.user.gender;
      this.friendship = res.data.friend;
    });
  },
};
</script>
