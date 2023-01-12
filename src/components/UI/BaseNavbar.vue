<template>
  <nav
    class="absolute top-0 left-0 w-full border-b-2 border-gray-300 h-16 items-center flex justify-between bg-[#24252a]"
  >
    <h1
      class="uppercase text-white font-medium text-3xl px-4 cursor-pointer"
      @click="$router.push({ name: 'home' })"
    >
      Logo
    </h1>
    <div class="flex items-center text-white" v-if="authenticated">
      <notification-dropdown />
      <button
        class="font-bold flex items-center justify-center capitalize px-8 hover:bg-[#0288a5] h-10 rounded-2xl"
        tabindex="-1"
        @click="$router.push({ name: 'profile' })"
      >
        Profile
      </button>
      <button
        class="font-bold flex items-center justify-center capitalize px-8 hover:bg-[#0288a5] h-10 rounded-2xl"
        tabindex="-1"
      >
        Contact
      </button>
      <p class="font-black pl-8 text-lg cursor-default">
        {{ formattedFirstName }}
        <span class="font-thin">|</span>
        {{ formattedLastName }}
      </p>
      <button
        class="text-red-600 font-semibold px-4 h-16 text-center hover:bg-slate-200 ml-16"
        tabindex="-1"
        @click="logout"
      >
        Logout
      </button>
    </div>
  </nav>
</template>
<script lang="ts">
import { mapActions, mapState } from "pinia";
import { useUserStore } from "@/stores/user.js";
import { useAuthStore } from "@/stores/auth.js";
import ProfileIcon from "@/components/icons/ProfileIcon.vue";
import NotificationDropdown from "./NotificationDropdown.vue";
export default {
  components: {
    ProfileIcon,
    NotificationDropdown,
  },
  computed: {
    ...mapState(useUserStore, ["firstName", "lastName"]),
    ...mapState(useAuthStore, ["authenticated"]),
    formattedFirstName() {
      return this.firstName.charAt(0).toUpperCase();
    },
    formattedLastName() {
      return this.lastName.charAt(0).toUpperCase();
    },
  },
  methods: {
    ...mapActions(useAuthStore, ["logout"]),
  },
};
</script>
