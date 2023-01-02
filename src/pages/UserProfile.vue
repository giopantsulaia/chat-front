<template>
  <main class="flex h-screen">
    <div
      class="w-1/4 flex flex-col items-center py-24 mt-16"
      :class="{ 'blur-[2px] pointer-events-none': emailUpdated }"
    >
      <img
        src="https://t3.ftcdn.net/jpg/03/39/45/96/360_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg"
        alt="user profile picture"
        class="w-56 border-2 rounded-full select-none"
      />
      <p class="text-2xl capitalize mt-4 font-semibold">
        {{ firstName + " " + lastName }}
      </p>
      <p class="text-base text-gray-400 font-medium">{{ email }}</p>
      <button
        class="bg-green-600 w-28 h-10 mt-10 rounded-md font-bold text-white border"
        @click="editProfile"
      >
        {{ inSettings ? "Back" : "Edit Profile" }}
      </button>
    </div>
    <section
      class="w-full mt-16 border-l-2 border-gray-300"
      :class="{ 'blur-[2px] pointer-events-none': emailUpdated }"
    >
      <div
        v-if="$route.query.tab === 'settings'"
        class="w-2/3 mx-auto mt-16 flex flex-col"
      >
        <form-layout @on-submit="submitUpdate">
          <div class="flex gap-16 flex-col">
            <general-info></general-info>
            <contact-info></contact-info>
          </div>
          <div class="flex items-center mt-16 gap-4">
            <button class="border-2 rounded-lg w-24 p-2 bg-blue-300 text-white">
              Save
            </button>
            <Transition name="fade" mode="out-in">
              <p class="text-xl uppercase font-medium" v-if="profileUpdated">
                Profile updated!
              </p></Transition
            >
          </div>
        </form-layout>
      </div>
      <div v-else>profile stuff here</div>
    </section>
    <verification-sent
      v-if="emailUpdated"
      @on-close="closeModal"
      message="New email will be updated as soon as you verify"
    ></verification-sent>
  </main>
</template>
<script lang="ts">
import axios from "../config/axios/index";
import { useUserStore } from "../stores/user";
import { mapState } from "pinia";
import GeneralInfo from "../components/UI/GeneralInfo.vue";
import ContactInfo from "../components/UI/ContactInfo.vue";
import BaseInput from "../components/inputs/BaseInput.vue";
import FormLayout from "../components/layouts/FormLayout.vue";
import { useAuthStore } from "../stores/auth";
import { User } from "../types/user";
import VerificationSent from "../components/UI/modals/VerificationSent.vue";
export default {
  computed: {
    ...mapState(useUserStore, ["firstName", "lastName", "email"]),
    inSettings(): boolean {
      return this.$route.query.tab === "settings";
    },
  },
  data() {
    return {
      emailUpdated: false as boolean,
      profileUpdated: false as boolean,
    };
  },
  methods: {
    closeModal() {
      this.emailUpdated = false;
    },
    editProfile(): void {
      if (!this.inSettings) {
        this.$router.push({ name: "profile", query: { tab: "settings" } });
      } else {
        this.$router.replace({ name: "profile" });
      }
    },
    submitUpdate(values: User) {
      const updating = Object.values(values).filter(
        (value) => value !== undefined
      ).length;
      if (updating) {
        axios
          .put("user", values)
          .then(() => {
            if (values.email) {
              this.emailUpdated = true;
            }
            this.profileUpdated = true;
            const authStore = useAuthStore();
            authStore.getUserData();
          })
          .finally(() => {
            setTimeout(() => {
              this.profileUpdated = false;
            }, 3000);
          });
      }
    },
  },
  mounted() {},
  components: {
    GeneralInfo,
    ContactInfo,
    BaseInput,
    FormLayout,
    VerificationSent,
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
