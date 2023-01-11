<template>
  <main class="flex h-screen justify-center">
    <section class="w-3/5 mt-36 flex items-start justify-center h-3/5 gap-10">
      <profile-details :id="Number(id)"></profile-details>
    </section>
  </main>
</template>
<script lang="ts">
import GeneralInfo from "@/components/UI/GeneralInfo.vue";
import ContactInfo from "@/components/UI/ContactInfo.vue";
import BaseInput from "@/components/inputs/BaseInput.vue";
import FormLayout from "@/components/layouts/FormLayout.vue";
import ProfileDetails from "@/components/UI/ProfileDetails.vue";
import SuccessModal from "@/components/UI/modals/SuccessModal.vue";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    GeneralInfo,
    ContactInfo,
    BaseInput,
    FormLayout,
    SuccessModal,
    ProfileDetails,
  },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
