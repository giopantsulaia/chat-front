<template>
  <div class="flex justify-between px-4 items-center w-full h-20 border-b py-8">
    <div
      class="h-fit flex items-center gap-4 font-medium cursor-pointer hover:brightness-90"
      @click="goToUser"
    >
      <img
        :src="avatar ? back_url + avatar : '/src/assets/avatar.jpg'"
        alt="profile picture"
        class="w-16 rounded-full border"
      />
      {{ firstName + " " + lastName }}
    </div>
    <div class="font-black text-xl tracking-widest cursor-pointer">...</div>
  </div>
</template>
<script lang="ts">
import { useUserStore } from "@/stores/user";
import { mapState } from "pinia";

export default {
  props: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState(useUserStore, ["auth_id"]),
  },
  methods: {
    goToUser() {
      if (this.id === Number(this.auth_id)) {
        this.$router.push({ name: "profile" });
      } else {
        this.$router.push({ name: "user-profile", params: { id: this.id } });
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
