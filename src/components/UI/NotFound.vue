<template>
  <div class="w-fit mx-auto flex flex-col items-center sm:mt-48 mt-36">
    <h1 class="m-auto text-3xl font-black whitespace-nowrap">
      Page not found!
    </h1>
    <button
      @click="$router.replace({ name: 'home' })"
      class="mt-10 px-4 py-1 border-2 border-blue-400 rounded font-semibold"
    >
      Home
    </button>
  </div>
</template>
<script lang="ts">
export default {};
</script>
