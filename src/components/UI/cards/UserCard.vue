<template>
  <div
    class="w-48 h-48 rounded-xl text-center cursor-pointer hover:brightness-110"
    @click="$router.push({ name: 'user-profile', params: { id: id } })"
  >
    <img
      src="https://t3.ftcdn.net/jpg/03/39/45/96/360_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg"
      alt="user profile picture"
      class="rounded-xl w-48 h-48"
    />
    <p class="font-medium w-full">{{ first_name + " " + last_name }}</p>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
  },
};
</script>
