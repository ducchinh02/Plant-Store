<template>
  <div
    class="intro-screen p-5 relative overflow-hidden h-screen flex flex-col md:flex-row items-center"
  >
    <div class="img-thumb w-full flex-1 md:w-1/2 h-full"></div>
    <div
      class="container fixed md:relative right-0 md:w-1/2 bottom-0 w-full left-0 flex-1 px-[30px] z-10 py-[30px] mx-auto"
    >
      <div
        class="text-content max-w-[211px] md:max-w-full md:text-center md:text-main_black font-medium text-white text-2xl leading-[36px] pb-7"
      >
        Buy Your Favorite Plants, Only Here!
      </div>
      <div class="btn-options md:grid md:grid-cols-2 flex flex-col gap-[30px]">
        <router-link :to="{ name: 'login', params: '' }" class="block">
          <primary-button
            class="w-full transition-all duration-300"
            type="button"
          >
            Login
          </primary-button>
        </router-link>
        <router-link :to="{ name: 'register', params: '' }" class="block">
          <primary-button
            class="w-full transition-all duration-300"
            type="button"
          >
            Sign up
          </primary-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import PrimaryButton from "@/components/PrimaryButton.vue";
export default {
  components: { PrimaryButton },
};
</script>

<style lang="scss" scoped>
.intro-screen {
  .img-thumb {
    background-image: url("@/assets/images/intro.webp");
    background-position: 0 30%;
    background-size: contain;
    background-repeat: no-repeat;
    @media screen and (min-width: 768px) {
      background-position: center;
    }
  }
  .text-content {
    text-shadow: 0 0 2px $main_black;
    transform: translateY(30px);
    opacity: 0;
    -webkit-transform: translateY(30px);
    animation: slideBottom 0.5s ease-in-out 0.3s forwards;
    -webkit-animation: slideBottom 0.5s ease-in-out 0.3s forwards;
    @media screen and (min-width: 768px) {
      text-shadow: unset;
    }
  }
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    height: 60%;
    left: 0;
    width: 100%;
    opacity: 0;
    background: linear-gradient(
      180deg,
      rgba(1, 24, 7, 0.01) 0%,
      #011807 70.62%
    );
    animation: activeOpacity 0.5s ease-in-out forwards;
    -webkit-animation: activeOpacity 0.5s ease-in-out forwards;
    @media screen and (min-width: 768px) {
      display: none;
    }
  }
  @keyframes activeOpacity {
    to {
      opacity: 1;
    }
  }
  @keyframes slideBottom {
    to {
      opacity: 1;
      transform: translateY(0);
      -webkit-transform: translateY(0);
    }
  }
}
</style>
