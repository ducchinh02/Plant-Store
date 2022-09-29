<template>
  <div
    class="relative min-h-screen overflow-hidden md:h-screen md:pb-0 md:flex"
  >
    <transition name="fade-translate" appear mode="out-in">
      <slot />
    </transition>
    <div
      class="container px-[10px] mx-auto fixed right-0 w-100% left-0 bottom-0 z-[99999] md:relative md:w-max"
    >
      <navigation v-if="!onFocus" />
    </div>
  </div>
</template>

<script>
import Navigation from "../components/Navigation.vue";
export default {
  components: { Navigation },
  props: {
    onFocus: {
      type: Boolean,
      required: false,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.fade-translate-enter-active {
  animation: fadeTransform 0.4s ease-in-out;
  -webkit-animation: fadeTransform 0.4s ease-in-out;
}
@keyframes fadeTransform {
  0% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
.fade-translate-leave-active {
  animation: fadeTransformLeave 0.4s ease-in-out;
  -webkit-animation: fadeTransformLeave 0.4s ease-in-out;
}

@keyframes fadeTransformLeave {
  to {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    opacity: 0;
  }
}
</style>
