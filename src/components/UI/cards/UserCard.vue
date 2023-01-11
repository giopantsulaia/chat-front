<template>
  <div
    class="w-48 h-48 rounded-xl text-center cursor-pointer hover:brightness-110 border shadow-md"
    @click="openUserProfile"
  >
    <img
      :src="avatar ? back_url + avatar : '/src/assets/avatar.jpg'"
      alt="user profile picture"
      class="rounded-xl w-full h-full"
    />
    <p class="font-medium w-full">{{ first_name + " " + last_name }}</p>
  </div>
</template>
<script lang="ts">
import { useUserStore } from "@/stores/user";
import { mapState } from "pinia";

export default {
  computed: {
    ...mapState(useUserStore, ["auth_id"]),
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
  },
  methods: {
    openUserProfile() {
      if (this.auth_id !== this.id) {
        this.$router.push({ name: "user-profile", params: { id: this.id } });
      } else {
        this.$router.push({ name: "profile" });
      }
    },
  },
  data() {
    return {
      back_url: import.meta.env.VITE_BACK_BASE_URL,
    };
  },
};
</script>
