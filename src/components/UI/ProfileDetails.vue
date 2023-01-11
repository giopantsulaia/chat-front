<template>
  <div class="flex w-full gap-6">
    <div class="flex flex-col gap-6 w-2/3">
      <div
        class="flex flex-col items-center bg-white shadow-xl rounded-lg border py-6"
      >
        <img
          :src="user.avatar ? back_url + user.avatar : '/src/assets/avatar.jpg'"
          alt="user profile picture"
          class="w-56 border-2 rounded-full select-none"
        />
        <p class="text-2xl capitalize mt-4 font-semibold" v-if="user">
          {{ user.first_name + " " + user.last_name }}
        </p>
        <p class="text-base text-gray-400 font-medium">{{ user.email }}</p>
        <div class="flex gap-4">
          <div>
            <button
              class="bg-green-600 w-28 h-10 mt-4 rounded-md font-bold text-white border flex items-center justify-center"
              @click="showDropdown"
            >
              <friend-pending-icon v-if="friend === 'pending'" />
              <user-icon v-if="friend === 'friends'" />
              <add-friend-icon v-if="friend === 'incoming'" />
              {{
                friend === "friends"
                  ? "Friends"
                  : friend === "pending"
                  ? "Pending"
                  : friend === "incoming"
                  ? "Accept"
                  : "Add Friend"
              }}
            </button>
            <button
              @click="removeFriend"
              v-if="showFriendDropdown"
              class="w-28 h-10 rounded-md font-bold text-white border flex items-center justify-center absolute bg-red-600 text-sm"
            >
              <remove-friend-icon v-if="friend === 'friends'" />
              {{ friend === "pending" ? "Cancel" : "Remove" }}
            </button>
          </div>
          <button
            class="bg-blue-600 w-28 h-10 mt-4 rounded-md font-bold text-white border"
          >
            Message
          </button>
        </div>
      </div>
      <social-info :friends-count="friendsCount" />
    </div>
    <user-info :user="user" :friends="friends" />
  </div>
</template>
<script lang="ts">
import { User } from "@/types/user";
import axios from "@/config/axios/index";
import FriendPendingIcon from "@/components/icons/FriendPendingIcon.vue";
import RemoveFriendIcon from "@/components/icons/RemoveFriendIcon.vue";
import UserIcon from "@/components/icons/UserIcon.vue";
import SocialInfo from "./SocialInfo.vue";
import UserInfo from "./UserInfo.vue";
import AddFriendIcon from "@/components/icons/AddFriendicon.vue";
export default {
  emits: ["onAddFriend"],
  data() {
    return {
      user: {} as User,
      friend: "" as string,
      showFriendDropdown: false as boolean,
      friendsCount: 0 as number,
      friends: [] as Array<User>,
      back_url: import.meta.env.VITE_BACK_BASE_URL,
    };
  },
  watch: {
    friend() {
      if (!this.friend) {
        this.showFriendDropdown = false;
      }
    },
    user() {
      if (this.user) {
        this.fetchFriends();
      }
    },
  },
  methods: {
    fetchFriends() {
      axios
        .post("/friends", { id: this.user.id })
        .then((res) => (this.friends = res.data.friends));
    },
    showDropdown() {
      if (this.friend && this.friend !== "incoming") {
        this.showFriendDropdown = !this.showFriendDropdown;
      } else {
        this.addFriend();
      }
    },
    addFriend() {
      if (this.friend === "incoming") {
        this.acceptFriend();
      } else {
        axios.post("/friend-request", { friend_id: this.id }).then((res) => {
          console.log(res.data);
          this.friend = "pending";
        });
      }
    },
    removeFriend() {
      axios.post("/remove-friend", { friend_id: this.id }).then((res) => {
        console.log(res.data);
        this.friend = "";
      });
    },
    acceptFriend() {
      axios.post("/accept-friend", { user_id: this.id }).then((res) => {
        this.friend = "friends";
      });
    },
    fetchUser() {
      axios.get(`users/${this.id}`).then((res) => {
        this.user = res.data.user;
        this.friend = res.data.friend;
        this.friendsCount = res.data.user.number_of_friends;
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
    this.fetchUser();
  },
  components: {
    FriendPendingIcon,
    RemoveFriendIcon,
    UserIcon,
    SocialInfo,
    UserInfo,
    AddFriendIcon,
  },
};
</script>
