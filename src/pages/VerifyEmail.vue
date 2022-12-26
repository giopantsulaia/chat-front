<template>
  <div>Verifying Email...</div>
</template>
<script lang="ts">
import axios from "../config/axios/index.js";
export default {
  mounted() {
    if (this.$route.query.hash && this.$route.query.hash.length < 30) {
      this.$router.replace({ name: "registration" });
    } else {
      axios
        .post("verify-email", {
          hash: this.$route.query.hash,
        })
        .then(() => this.$router.replace({ name: "registration" }))
        .catch((error) => this.$router.replace({ name: "registration" }));
    }
  },
};
</script>
