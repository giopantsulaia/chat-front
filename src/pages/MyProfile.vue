<template>
  <main class="flex h-screen justify-center">
    <section
      class="w-3/5 mt-36 flex items-start justify-center h-3/5 gap-10"
      v-if="!inSettings"
    >
      <my-profile-details></my-profile-details>
    </section>
    <section
      class="w-full mt-16 border-l-2 border-gray-300"
      :class="{
        'blur-[2px] pointer-events-none': emailUpdated || emailChanged,
      }"
      v-if="inSettings"
    >
      <div
        v-if="$route.query.tab === 'settings'"
        class="w-2/3 mx-auto mt-16 flex"
      >
        <div class="text-center flex flex-col items-center">
          <img
            :src="
              file_url
                ? file_url
                : avatar
                ? back_url + avatar
                : 'src/assets/avatar.jpg'
            "
            alt="user profile picture"
            class="w-56 border-2 rounded-full select-none mt-10 h-56"
          />
          <label class="font-medium mt-4 cursor-pointer">
            <input
              type="file"
              class="hidden"
              @change="handleImageUpload"
            />Upload Photo
          </label>
          <button
            @click="updateAvatar"
            class="bg-blue-600 rounded-lg text-white p-2 my-2"
            v-if="image"
          >
            Confirm
          </button>
          <button
            class="bg-green-600 w-28 h-10 mt-10 rounded-md font-bold text-white border"
            @click="editProfile"
          >
            Back
          </button>
        </div>
        <form-layout @on-submit="submitUpdate">
          <div class="flex gap-16 flex-col ml-16">
            <general-info></general-info>
            <contact-info :emailExists="emailExists"></contact-info>
          </div>
          <div class="flex flex-col items-center mt-16 gap-4">
            <button
              class="rounded-lg w-24 p-2 bg-[#28292e] text-white mx-auto active:bg-gray-600"
            >
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
    </section>
    <success-modal
      v-if="emailChanged"
      @on-close="closeModal"
      header-message="New email will be updated as soon as you verify"
      message=" Verification link has been sent to your email, please follow instructions
      to proceed."
    ></success-modal>
    <success-modal
      v-if="emailUpdated"
      @on-close="closeModal"
      message="Your email has been updated!"
      header-message="Email updated successfully"
    ></success-modal>
  </main>
</template>
<script lang="ts">
import axios from "@/config/axios/index";
import { useUserStore } from "@/stores/user";
import { mapState } from "pinia";
import GeneralInfo from "@/components/UI/GeneralInfo.vue";
import ContactInfo from "@/components/UI/ContactInfo.vue";
import BaseInput from "@/components/inputs/BaseInput.vue";
import FormLayout from "@/components/layouts/FormLayout.vue";
import { useAuthStore } from "@/stores/auth";
import { User } from "@/types/user";
import MyProfileDetails from "@/components/UI/MyProfileDetails.vue";
import SuccessModal from "@/components/UI/modals/SuccessModal.vue";
export default {
  components: {
    GeneralInfo,
    ContactInfo,
    BaseInput,
    FormLayout,
    SuccessModal,
    MyProfileDetails,
  },
  computed: {
    ...mapState(useUserStore, ["firstName", "lastName", "email", "avatar"]),
    inSettings(): boolean {
      return this.$route.query.tab === "settings";
    },
    imageValid() {
      if (this.image) {
        return this.image.type.slice(0, 5) === "image";
      }
      return true;
    },
  },
  data() {
    return {
      emailChanged: false as boolean,
      emailUpdated: false as boolean,
      profileUpdated: false as boolean,
      emailExists: false as boolean,
      file_url: "" as string,
      image: null as any,
      back_url: import.meta.env.VITE_BACK_BASE_URL,
    };
  },
  methods: {
    handleImageUpload(e) {
      this.image = e.target.files[0];
      this.file_url = URL.createObjectURL(this.image);
    },
    closeModal() {
      this.emailChanged = false;
      this.emailUpdated = false;
    },
    editProfile(): void {
      if (!this.inSettings) {
        this.$router.push({ name: "profile", query: { tab: "settings" } });
      } else {
        this.$router.replace({ name: "profile" });
      }
    },
    updateAvatar() {
      if (this.imageValid) {
        let data = new FormData();
        data.append("avatar", this.image);
        data.append("_method", "put");
        axios
          .post("user", data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            this.image = null;
            this.profileUpdated = true;
            const authStore = useAuthStore();
            authStore.getUserData();
          });
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
              this.emailChanged = true;
            }
            this.profileUpdated = true;
            const authStore = useAuthStore();
            authStore.getUserData();
          })
          .catch((err) => {
            this.emailExists = true;
            setTimeout(() => {
              this.emailExists = false;
            }, 5000);
          })
          .finally(() => {
            setTimeout(() => {
              this.profileUpdated = false;
            }, 3000);
          });
      }
    },
  },
  mounted() {
    if (this.$route.query.email_updated) {
      this.emailUpdated = true;
      this.$router.replace({ query: { tab: "settings" } });
    }
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
