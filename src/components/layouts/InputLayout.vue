<template>
  <div class="flex">
    <slot></slot>
    <button class="-mb-10 p-2" type="button">
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
