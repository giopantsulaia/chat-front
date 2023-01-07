<template>
  <div class="flex flex-col w-full gap-10 h-fit bg-white shadow-xl">
    <ul class="w-full h-2/5 text-gray-500">
      <li class="flex p-4 border-b capitalize">
        <span class="mr-24 w-36 text-black font-medium">Full Name </span
        >{{ user.first_name + " " + user.last_name }}
      </li>
      <li class="flex p-4 border-b">
        <span class="mr-24 w-36 text-black font-medium"> Email </span>
        {{ user.email }}
      </li>
      <li class="flex p-4 border-b">
        <span class="mr-24 w-36 text-black font-medium">Phone </span
        >{{ user.phone }}
      </li>
      <li class="flex p-4 border-b capitalize">
        <span class="mr-24 w-36 text-black font-medium">Gender</span>
        {{ user.gender }}
      </li>
      <li class="flex p-4 border-b">
        <span class="mr-24 w-36 text-black font-medium">Birth Date</span>
        {{ user.birth_date }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>
