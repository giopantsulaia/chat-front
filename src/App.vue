<template>
  <BaseNavbar />
  <router-view> </router-view>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import BaseNavbar from "./components/UI/BaseNavbar.vue";
import { useAuthStore } from "./stores/auth";
export default {
  components: { BaseNavbar },
  computed: {
    ...mapState(useAuthStore, ["authenticated"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["tryLogin"]),
  },

  created() {
    this.tryLogin();
    console.log(this.authenticated);
  },
};
</script>
