<template>
  <router-link
    :to="{ name: routeName, params: routeParams }"
    class="inline-flex"
  >
    <div
      class="back-icon w-6 h-6 transition-all duration-300 cursor-pointer inline-flex items-center box-content p-[10px] justify-center rounded-full bg-gray"
    >
      <img
        src="@/assets/images/chevron-left.svg"
        class="transition-all duration-300"
        alt="Chevron Left Icon"
      />
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    routeName: {
      type: String,
      required: false,
      default: "intro",
    },
    routeParams: {
      type: Object,
      required: false,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.back-icon:hover {
  img {
    transform: translateX(-5px);
    -webkit-transform: translateX(-5px);
  }
}
</style>
