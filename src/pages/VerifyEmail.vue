<template>
  <div>Verifying Email...</div>
</template>
<script lang="ts">
import axios from "@/config/axios/index.js";
import { useAuthStore } from "@/stores/auth";
export default {
  mounted() {
    if (this.$route.query.hash && this.$route.query.hash.length < 30) {
      this.$router.replace({ name: "registration" });
    } else {
      axios
        .post("verify-email", {
          hash: this.$route.query.hash,
          token: this.$route.query.token || null,
          email: this.$route.query.email || null,
        })
        .then(() => {
          if (this.$route.query.email) {
            const store = useAuthStore();
            store.getUserData();
            this.$router.replace({
              name: "profile",
              query: { tab: "settings", email_updated: "true" },
            });
          } else {
            this.$router.replace({ name: "login" });
          }
        })
        .catch((error) => this.$router.replace({ name: "login" }));
    }
  },
};
</script>
