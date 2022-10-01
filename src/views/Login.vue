<template>
  <div class="login min-h-screen">
    <!-- toast -->
    <transition name="hide-toast">
      <toast-notification :error="err" v-if="showToast" :toastContent="err" />
    </transition>
    <div
      class="container px-[30px] pt-[58px] mx-auto md:pb-[58px] md:flex md:flex-col md:h-screen"
    >
      <!-- header -->
      <header-main>
        <template v-slot:content-left>
          <back-icon />
        </template>
      </header-main>
      <div
        class="md:flex md:justify-around md:items-center md:gap-10 md:flex-1"
      >
        <div class="md:w-[40%]">
          <!-- from image -->
          <div class="form-image mx-auto py-[20px]">
            <router-link :to="{ name: 'intro', params: {} }">
              <img src="@/assets/images/PlantLogo.svg" alt="form image" />
            </router-link>
          </div>
          <!-- heading -->
          <div
            class="heading-text text-center capitalize flex flex-col gap-[5px]"
          >
            <span class="text-xl text-black font-medium"> Welcome back </span>
            <h1
              class="text-green text-[35px] md:leading-[60px] font-medium"
              style="font-family: 'Playfair Display', serif"
            >
              Sweetest
            </h1>
          </div>
        </div>
        <!-- form sign up -->
        <form
          @submit.prevent="loginAction"
          class="md:w-[50%]"
          :class="{ 'pointer-events-none': showToast }"
        >
          <div class="flex flex-col gap-[22px] py-6">
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
                    :class="[
                      'bx',
                      { 'bx-show': !showPass, 'bx-hide': showPass },
                    ]"
                  ></i>
                </div>
              </template>
            </input-field>
          </div>
          <div
            class="flex flex-col items-center md:grid md:grid-cols-2 md:gap-[22px] gap-[18px] pb-[58px]"
          >
            <primary-button
              class="w-full transition-all duration-300"
              type="submit"
              :class="{ 'bg-greenBold pointer-events-none': showToast }"
            >
              <span v-if="!isPending">Login</span>
              <circle-loading v-else />
            </primary-button>
            <div class="text-text_gray font-medium text-center">
              Don’t have an account?
              <router-link
                class="text-green font-medium decoration-green underline"
                :to="{ name: 'register', params: {} }"
              >
                Sign up
              </router-link>
            </div>
          </div>
        </form>
      </div>
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
import { onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useSignIn } from "@/composable/useSignIn";
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
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const err = ref(null);
    const showToast = ref(false);
    const showPass = ref(false);
    const { error, isPending, signIn } = useSignIn();

    const loginAction = async () => {
      if (!showToast.value) {
        await signIn(email.value, password.value);
        if (!error.value) {
          err.value = null;
          toggleToast();
          router.push({ name: "home", params: {} });
        } else err.value = error.value;
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
      email,
      password,
      loginAction,
      router,
      err,
      showToast,
      isPending,
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
