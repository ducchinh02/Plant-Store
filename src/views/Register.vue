<template>
  <div class="register min-h-screen">
    <!-- toast -->
    <transition name="hide-toast">
      <toast-notification v-if="showToast" :toastContent="err" />
    </transition>
    <div
      class="bg-image opacity-[0.7] pointer-events-none fixed right-0 top-8 isolate"
    >
      <img src="@/assets/images/Tree.svg" alt="" />
    </div>
    <div class="container px-[30px] pt-[58px] mx-auto">
      <!-- header -->
      <header-main>
        <template v-slot:content-left>
          <back-icon />
        </template>
      </header-main>
      <!-- heading -->
      <div class="heading-text text-center capitalize flex flex-col gap-[5px]">
        <h1 class="text-[42px] pt-20 leading-[60px] text-black font-medium">
          Register
        </h1>
        <p class="text-text_gray_bold font-medium text-xl">
          Create your new account
        </p>
      </div>
      <!-- form sign up -->
      <form @submit.prevent="submitSignUp">
        <div class="flex flex-col md:grid md:grid-cols-2 gap-[22px] py-6">
          <!-- input field -->
          <input-field
            type="text"
            placeholder="Full Name"
            id="full-name"
            v-model="fullName"
          >
            <input-icon
              :src="require('@/assets/images/user.svg')"
              alt="user icon"
            />
          </input-field>
          <!-- input field -->
          <input-field
            type="email"
            placeholder="Email"
            id="email"
            v-model="email"
          >
            <div class="icon text-2xl flex items-center">
              <i class="bx bx-envelope"></i>
            </div>
          </input-field>
          <!-- input field -->
          <input-field
            :type="showPass ? 'text' : 'password'"
            placeholder="Password"
            id="password"
            v-model="password"
            class="py-[18px] pl-[18px] pr-[60px]"
          >
            <input-icon
              :src="require('@/assets/images/lock.svg')"
              alt="lock icon"
            />
            <template v-slot:custom>
              <div
                class="toggle-show-password absolute top-1/2 -translate-y-1/2 right-[18px] flex items-center text-[26px] select-none cursor-pointer"
                @click="showPass = !showPass"
              >
                <i
                  :class="['bx', { 'bx-show': !showPass, 'bx-hide': showPass }]"
                ></i>
              </div>
            </template>
          </input-field>
          <!-- input field -->
          <input-field
            :type="showPass ? 'text' : 'password'"
            placeholder="Confirm Password"
            id="confirm-password"
            v-model="confirmPassword"
            class="py-[18px] pl-[18px] pr-[60px]"
          >
            <input-icon
              :src="require('@/assets/images/lock.svg')"
              alt="lock icon"
            />
            <template v-slot:custom>
              <div
                class="toggle-show-password absolute top-1/2 -translate-y-1/2 right-[18px] flex items-center text-[26px] select-none cursor-pointer"
                @click="showPass = !showPass"
              >
                <i
                  :class="['bx', { 'bx-show': !showPass, 'bx-hide': showPass }]"
                ></i>
              </div>
            </template>
          </input-field>
        </div>
        <div class="text-center px-8 font-medium text-sm text-text_gray">
          <span class="text-green"> By signing you agree to our </span> term of
          use and privacy notice
        </div>
        <div class="form-image mx-auto py-[20px]">
          <img src="@/assets/images/form-image.svg" alt="form image" />
        </div>
        <div
          class="flex flex-col items-center md:grid md:grid-cols-2 md:gap-[22px] gap-[18px] pb-[58px]"
        >
          <primary-button
            class="w-full capitalize cursor-pointer transition-all duration-300"
            type="submit"
            :class="{ 'bg-greenBold pointer-events-none': showToast }"
          >
            <span v-if="!isPending">Sign up</span>
            <circle-loading v-else />
          </primary-button>
          <div class="text-text_gray font-medium text-center">
            Already have an account
            <router-link
              class="text-green font-medium decoration-green underline"
              :to="{ name: 'login', params: {} }"
            >
              Login
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import HeaderMain from "@/components/Header/HeaderMain.vue";
import BackIcon from "@/components/Header/BackIcon.vue";
import InputField from "@/components/Input/InputField.vue";
import InputIcon from "@/components/Input/InputIcon.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import ToastNotification from "@/components/ToastNotification.vue";
import CircleLoading from "@/components/CircleLoading.vue";
import { ref, onUnmounted } from "vue";
import { useSignUp } from "@/composable/useSignUp";
import { useRouter } from "vue-router";
export default {
  components: {
    HeaderMain,
    BackIcon,
    InputField,
    InputIcon,
    PrimaryButton,
    ToastNotification,
    CircleLoading,
  },
  setup() {
    const fullName = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const showToast = ref(false);
    const err = ref(null);
    const router = useRouter();
    const showPass = ref(false);
    const { error, isPending, signUp } = useSignUp();

    const submitSignUp = async () => {
      if (!showToast.value) {
        if (
          !fullName.value ||
          !email.value ||
          !password.value ||
          !confirmPassword.value
        ) {
          err.value = "All field are required!";
        } else {
          if (password.value.length < 8) {
            err.value = "Password is Required Minimum 8 characters";
            toggleToast();
            return;
          } else {
            if (password.value === confirmPassword.value) {
              await signUp(email.value, password.value, fullName.value.trim());
              if (!error.value) {
                toggleToast();
                err.value = null;
                setTimeout(() => {
                  router.push({ name: "login", params: {} });
                }, 500);
              } else err.value = error.value;
            } else {
              err.value = "Both passwords are not matching";
            }
          }
        }
        toggleToast();
      }
    };

    const toggleToast = () => {
      showToast.value = true;
      setTimeout(() => {
        showToast.value = false;
      }, 2000);
    };
    onUnmounted(() => {
      showPass.value = false;
    });

    return {
      fullName,
      email,
      password,
      confirmPassword,
      submitSignUp,
      err,
      isPending,
      signUp,
      showToast,
      toggleToast,
      showPass,
    };
  },
};
</script>

<style lang="scss" scoped>
.hide-toast-leave-active {
  animation: hideToast 0.5s ease-in-out;
  -webkit-animation: hideToast 0.5s ease-in-out;
}
@keyframes hideToast {
  from {
    transform: translateX(0);
    -webkit-transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    -webkit-transform: translateX(100%);
    opacity: 0;
  }
}
</style>
