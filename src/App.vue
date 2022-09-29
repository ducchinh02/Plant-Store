<template>
  <transition name="loading" appear mode="out-in">
    <loading-screen v-if="isLoading" />
  </transition>
  <div v-if="!isLoading">
    <transition name="fade-translate" appear mode="out-in">
      <component :is="layout" :onFocus="onFocus">
        <router-view
          @onFocusInput="onFocusInput"
          @endFocusInput="endFocusInput"
          v-slot="{ Component }"
          ref="routerView"
        >
          <transition name="fade-translate" appear mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </component>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import LoadingScreen from "./components/LoadingScreen.vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const isLoading = ref(true);
    const route = useRoute();
    const onFocus = ref(false);
    onMounted(() => {
      setTimeout(() => {
        isLoading.value = false;
      }, 2000);
    });
    const onFocusInput = (data) => {
      onFocus.value = data;
    };
    const endFocusInput = (data) => {
      onFocus.value = data;
    };
    return {
      isLoading,
      onFocusInput,
      onFocus,
      endFocusInput,
      layout: computed(() => (route.meta.layout || "default") + "-layout"),
    };
  },
  components: { LoadingScreen },
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease;
}

.fade-translate-enter-active {
  animation: fadeTransform 0.4s ease-in-out;
  -webkit-animation: fadeTransform 0.4s ease-in-out;
}
.fade-translate-leave-active {
  animation: fadeTransformLeave 0.4s ease-in-out;
  -webkit-animation: fadeTransformLeave 0.4s ease-in-out;
}

.loading-enter-active {
  animation: scaleLoading 1s ease-in-out;
  -webkit-animation: scaleLoading 1s ease-in-out;
}
.loading-leave-active {
  animation: scaleLoading 0.5s reverse;
  -webkit-animation: scaleLoading 0.5s reverse;
}

@keyframes scaleLoading {
  0% {
    clip-path: circle(0% at 50% 50%);
  }
  100% {
    clip-path: circle(100% at 50% 50%);
  }
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
@keyframes fadeTransformLeave {
  to {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    opacity: 0;
  }
}
</style>
