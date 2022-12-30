<template>
  <main class="flex h-screen">
    <div class="w-1/4 flex flex-col items-center py-24 mt-16">
      <img
        src="https://t3.ftcdn.net/jpg/03/39/45/96/360_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg"
        alt="user profile picture"
        class="w-56 border-2 rounded-full select-none"
      />
      <p class="text-2xl capitalize mt-4 font-semibold">
        {{ name + " " + lastName }}
      </p>
      <p class="text-base text-gray-400 font-medium">{{ email }}</p>
      <button
        class="bg-green-600 w-28 h-10 mt-10 rounded-md font-bold text-white border"
        @click="editProfile"
      >
        {{ inSettings ? "Back" : "Edit Profile" }}
      </button>
    </div>
    <section class="w-full mt-16 border-x-2 border-gray-300">
      <div v-if="$route.query.tab === 'settings'" class="w-1/2 mx-auto mt-16">
        <h1 class="text-3xl text-center my-10">Profile Settings</h1>
        <settings-tab></settings-tab>
      </div>
      <div v-else>profile stuff here</div>
    </section>
  </main>
</template>
<script lang="ts">
import axios from "../config/axios/index";
import { useUserStore } from "../stores/user";
import { mapState } from "pinia";
import SettingsTab from "../components/UI/SettingsTab.vue";
export default {
  computed: {
    ...mapState(useUserStore, ["name", "lastName", "email"]),
    inSettings(): boolean {
      return this.$route.query.tab === "settings";
    },
  },
  data() {
    return {
      isEdditing: false as boolean,
    };
  },
  methods: {
    editProfile(): void {
      if (!this.inSettings) {
        this.$router.push({ name: "profile", query: { tab: "settings" } });
      } else {
        this.$router.replace({ name: "profile" });
      }
    },
  },
  components: {
    SettingsTab,
  },
};
</script>
