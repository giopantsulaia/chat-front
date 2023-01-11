<template>
  <div class="flex flex-col w-full gap-10 h-fit">
    <ul class="w-full h-2/5 text-gray-500 bg-white shadow-xl">
      <li class="flex p-4 border-b capitalize">
        <span class="mr-24 w-36 text-black font-medium">Full Name </span
        >{{ user.first_name + " " + user.last_name }}
      </li>
      <li class="flex p-4 border-b">
        <span class="mr-24 w-36 text-black font-medium"> Email </span>
        {{ user.email }}
      </li>
      <li class="flex p-4 border-b">
        <span class="mr-24 w-36 text-black font-medium">Phone </span
        >{{ user.phone }}
      </li>
      <li class="flex p-4 border-b capitalize">
        <span class="mr-24 w-36 text-black font-medium">Gender</span>
        {{ user.gender }}
      </li>
      <li class="flex p-4 border-b">
        <span class="mr-24 w-36 text-black font-medium">Birth Date</span>
        {{ user.birth_date }}
      </li>
    </ul>
    <div
      class="flex flex-col bg-white shadow-xl w-full h-96 overflow-y-auto"
      id="friends"
    >
      <h2 class="text-2xl font-semibold border-b text-center py-2">Friends</h2>
      <friend-card
        v-for="friend in friends"
        :id="friend.id"
        :firstName="friend.first_name"
        :lastName="friend.last_name"
        :avatar="friend.avatar"
      />
    </div>
  </div>
</template>
<script lang="ts">
import FriendCard from "./cards/FriendCard.vue";
export default {
  components: {
    FriendCard,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
    friends: {
      type: Object,
      required: false,
    },
  },
};
</script>
