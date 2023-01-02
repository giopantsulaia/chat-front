<template>
  <div class="flex items-center w-80">
    <slot></slot>
    <button
      class="-mb-10 p-2 h-fit hover:bg-gray-200 rounded-full"
      type="button"
      tabindex="-1"
      @click="$emit('onEditClick')"
    >
      <edit-icon class="active:opacity-50" />
    </button>
  </div>
</template>
<script lang="ts">
import EditIcon from "../icons/EditIcon.vue";
export default {
  components: {
    EditIcon,
  },
  emits: ["onEditClick"],
};
</script>
