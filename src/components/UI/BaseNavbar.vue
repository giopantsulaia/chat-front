<template>
  <nav
    class="absolute top-0 left-0 w-full border-b-2 border-gray-300 h-16 items-center flex justify-between"
  >
    <h1
      class="uppercase text-blue-600 font-medium text-3xl px-4 cursor-pointer"
      @click="$router.push({ name: 'home' })"
    >
      Chatem
    </h1>
    <div class="flex" v-if="authenticated">
      <button
        class="text-2xl font-bold text-blue-600 flex items-center border-4 rounded-full w-10 border-blue-500 justify-center capitalize"
        tabindex="-1"
        @click="$router.push({ name: 'profile' })"
      >
        {{ name.charAt(0) }}
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
