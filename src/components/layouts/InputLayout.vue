<template>
  <div class="flex items-center w-80">
    <slot></slot>
    <button class="-mb-10 p-2 h-fit" type="button" tabindex="-1">
      <edit-icon class="active:opacity-50" @click="$emit('onEditClick')" />
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
