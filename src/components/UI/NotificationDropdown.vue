<template>
  <div class="relative select-none">
    <span
      class="absolute right-6 -top-1 bg-orange-600 rounded-full w-6 text-center cursor-default"
      >{{ notifications.length }}</span
    >
    <p
      class="font-bold flex items-center justify-center capitalize mx-8 h-10 rounded-2xl z-40 cursor-pointer"
    >
      <notification-icon />
    </p>
  </div>
</template>
<script lang="ts">
import NotificationIcon from "@/components/icons/NotificationIcon.vue";
export default {
  components: {
    NotificationIcon,
  },
  data() {
    return {
      notifications: ["1", "2"],
    };
  },
};
</script>
