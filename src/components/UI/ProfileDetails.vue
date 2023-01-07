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
        {{ user.first_name + " " + user.last_name }}
      </p>
      <p class="text-base text-gray-400 font-medium">{{ user.email }}</p>
      <div class="flex gap-4">
        <div>
          <button
            class="bg-green-600 w-28 h-10 mt-4 rounded-md font-bold text-white border flex items-center justify-center"
            @click="showDropdown"
          >
            <friend-pending v-if="friendship === 'pending'" />
            <user-icon v-if="friendship === 'friends'" />
            {{
              friendship === "friends"
                ? "Friends"
                : friendship === "pending"
                ? "Pending"
                : "Add Friend"
            }}
          </button>
          <button
            @click="removeFriend"
            v-if="showFriendDropdown"
            class="w-28 h-10 rounded-md font-bold text-white border flex items-center justify-center absolute bg-red-600 text-sm"
          >
            <remove-friend v-if="friendship === 'friends'" />
            {{ friendship === "pending" ? "Cancel" : "Remove" }}
          </button>
        </div>
        <button
          class="bg-blue-600 w-28 h-10 mt-4 rounded-md font-bold text-white border"
        >
          Message
        </button>
      </div>
    </div>
    <social-links />
  </div>
  <user-info :user="user" />
</template>
<script lang="ts">
import { User } from "../../types/user";
import axios from "../../config/axios/index";
import FriendPending from "../icons/FriendPendingIcon.vue";
import RemoveFriend from "../icons/RemoveFriendIcon.vue";
import UserIcon from "../icons/UserIcon.vue";
import SocialLinks from "./SocialLinks.vue";
import UserInfo from "./UserInfo.vue";
export default {
  emits: ["onAddFriend"],
  data() {
    return {
      user: {} as User,
      friendship: "" as string,
      showFriendDropdown: false as boolean,
    };
  },
  watch: {
    friendship() {
      if (!this.friendship) {
        this.showFriendDropdown = false;
      }
    },
  },
  methods: {
    showDropdown() {
      if (this.friendship) {
        this.showFriendDropdown = !this.showFriendDropdown;
      } else {
        this.addFriend();
      }
    },
    addFriend() {
      axios.post("/friend-request", { friend_id: this.id }).then((res) => {
        console.log(res.data);
        this.friendship = "pending";
      });
    },
    removeFriend() {
      axios.post("/remove-friend", { friend_id: this.id }).then((res) => {
        console.log(res.data);
        this.friendship = "";
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
      this.user = res.data.user;
    });
  },
  components: {
    FriendPending,
    RemoveFriend,
    UserIcon,
    SocialLinks,
    UserInfo,
  },
};
</script>
