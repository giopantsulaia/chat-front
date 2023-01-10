<template>
  <div class="flex w-full gap-6">
    <div class="flex flex-col gap-6 w-2/3">
      <div
        class="flex flex-col items-center bg-white shadow-xl rounded-lg border py-6"
      >
        <img
          :src="avatar ? back_url + avatar : 'src/assets/avatar.jpg'"
          alt="user profile picture"
          class="w-56 border-2 rounded-full select-none h-56"
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
      <social-info :friends-count="friendsAmount" />
    </div>
    <div class="flex flex-col w-full gap-10 h-fit">
      <ul class="w-full h-2/5 text-gray-500 bg-white shadow-xl">
        <li class="flex p-4 border-b capitalize">
          <span class="mr-24 w-36 text-black font-medium">Full Name </span
          >{{ firstName + " " + lastName }}
        </li>
        <li class="flex p-4 border-b">
          <span class="mr-24 w-36 text-black font-medium"> Email </span>
          {{ email }}
        </li>
        <li class="flex p-4 border-b">
          <span class="mr-24 w-36 text-black font-medium">Phone </span
          >{{ phone }}
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
      <div
        class="flex flex-col bg-white shadow-xl w-full h-96 overflow-y-auto"
        id="friends"
      >
        <h2 class="text-2xl font-semibold border-b text-center py-2">
          Friends
        </h2>
        <friend-card
          v-for="friend in friends"
          :id="friend.id"
          :firstName="friend.first_name"
          :lastName="friend.last_name"
          :avatar="friend.avatar"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { mapState } from "pinia";
import { useUserStore } from "../../stores/user";
import SocialInfo from "./SocialInfo.vue";
import FriendCard from "./cards/FriendCard.vue";
import { User } from "../../types/user";
import axios from "../../config/axios/index";
export default {
  computed: {
    ...mapState(useUserStore, [
      "firstName",
      "lastName",
      "email",
      "birthDate",
      "gender",
      "phone",
      "friendsAmount",
      "auth_id",
      "avatar",
    ]),
  },
  components: {
    SocialInfo,
    FriendCard,
  },
  data() {
    return {
      friends: [] as Array<User>,
      back_url: import.meta.env.VITE_BACK_BASE_URL,
    };
  },

  methods: {
    fetchFriends() {
      axios.get("/friends").then((res) => (this.friends = res.data.friends));
    },
  },
  beforeMount() {
    this.fetchFriends();
  },
};
</script>
<style scoped>
#friends {
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-y: scroll;
}

#friends::-webkit-scrollbar {
  display: none;
}
</style>
