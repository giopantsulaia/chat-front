<template>
  <BaseNavbar />
  <router-view> </router-view>
</template>

<script lang="ts">
import BaseNavbar from "./components/UI/BaseNavbar.vue";

export default { components: { BaseNavbar } };
</script>
