<template>
  <div
    class="my-wallet custom-scroll pb-[60px] md:flex-1 md:w-max md:h-screen md:overflow-auto"
  >
    <div class="container flex flex-col md:h-full px-[30px] pt-[30px] mx-auto">
      <header-main class="pb-[40px]">
        <template v-slot:content-left>
          <div class="flex items-center gap-2 my-cart">
            <div class="logo w-8">
              <img src="@/assets/images/PlantLogo.svg" alt="" />
            </div>
            <div class="capitalize text-main_black font-bold text-xl">
              My wallet
            </div>
          </div>
        </template>
      </header-main>
      <div class="flex flex-1 flex-col md:gap-[40px] gap-[20px]">
        <div
          class="credit-card animate-slide-bottom opacity-0 translate-x-full max-w-[400px] w-full mx-auto brightness-75"
        >
          <img src="@/assets/images/credit-card.webp" alt="" />
        </div>
        <div class="text-center capitalize">
          <h1
            class="font-bold animate-slide-bottom opacity-0 animate-delay-200 translate-y-full text-2xl pb-3"
          >
            Coming Soon...
          </h1>
          <p
            class="text-main_black animate-slide-bottom opacity-0 animate-delay-400 translate-y-full"
          >
            Online payment functionality is being developed. We will be back
            shortly.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderMain from "@/components/Header/HeaderMain.vue";
export default {
  components: { HeaderMain },
};
</script>

<style></style>
