<template>
  <div
    class="page-not-found pt-[30px] px-[30px] pb-[60px] min-h-screen flex flex-col justify-center items-center"
  >
    <div
      class="404-image animate-slide-bottom opacity-0 h-[300px] md:h-[450px] mx-auto"
    >
      <img
        src="@/assets/images/404.webp"
        class="h-full w-full object-contain"
        alt="404 Image"
      />
    </div>
    <div class="text-center text-content pb-[30px]">
      <h1
        class="text-heading animate-slide-bottom opacity-0 pb-3 font-bold text-2xl capitalize"
      >
        404 Not found
      </h1>
      <p
        class="text-main_black animate-slide-bottom opacity-0 animate-delay-200"
      >
        You've found a page that doesn't exist
      </p>
    </div>
    <primary-button
      class="px-6 py-3 animate-slide-bottom opacity-0 animate-delay-400 translate-y-full mx-auto"
    >
      <router-link class="capitalize" :to="{ name: 'home', params: {} }">
        Back to home
      </router-link>
    </primary-button>
  </div>
</template>

<script>
import PrimaryButton from "@/components/PrimaryButton.vue";
export default {
  components: { PrimaryButton },
};
</script>

<style></style>
