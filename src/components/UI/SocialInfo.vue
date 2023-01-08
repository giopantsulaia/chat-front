<template>
  <ul class="h-2/5 shadow-xl border bg-white text-gray-500">
    <li class="p-4 border-b flex justify-between">
      <span class="font-medium text-black">Friends: </span> {{ friendsCount }}
    </li>
  </ul>
</template>
<script lang="ts">
export default {
  props: {
    friendsCount: {
      type: Number,
      required: false,
    },
  },
};
</script>
