<template>
  <nav
    class="relative top-0 left-0 w-full border-b-2 h-16 items-center flex justify-between"
  >
    <h1 class="uppercase text-blue-600 font-medium text-3xl px-4">Chatem</h1>
    <div class="flex" v-if="authenticated">
      <button
        class="text-2xl font-bold text-blue-600 flex items-center"
        tabindex="-1"
        @click="$router.push({ name: 'settings' })"
      >
        <profile-icon class="text-green-300" />
        {{ name.charAt(0).toUpperCase() + name.slice(1) }}
      </button>
      <button
        class="text-red-500 font-semibold mx-10"
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
import { useUserStore } from "../../stores/user.js";
import { useAuthStore } from "../../stores/auth.js";
import ProfileIcon from "../icons/ProfileIcon.vue";
export default {
  computed: {
    ...mapState(useUserStore, ["name", "last_name"]),
    ...mapState(useAuthStore, ["authenticated"]),
  },
  components: {
    ProfileIcon,
  },
  methods: {
    ...mapActions(useAuthStore, ["logout"]),
  },
};
</script>
