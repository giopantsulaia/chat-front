<template>
  <BaseNavbar v-if="$route.name !== 'not-found'" />
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
  },
};
</script>
<style scoped>
body,
html {
  margin: 0;
  padding: 0;
}
* {
  box-sizing: border-box;
}
</style>
