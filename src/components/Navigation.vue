<template>
  <nav
    class="nav-bottom md:w-max md:h-screen bg-[#EEEEEE] px-8 py-[15px] rounded-[20px]"
  >
    <ul
      class="menu md:flex-col md:h-full flex items-center justify-between md:justify-around"
    >
      <li>
        <router-link
          :to="{ name: 'home', params: {} }"
          class="flex items-center text text-3xl text-text_gray_bold transition-all duration-300"
          ><i class="bx bxs-home-alt-2"></i>
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'cart', params: {} }"
          class="flex items-center relative cart-icon text text-3xl text-text_gray_bold transition-all duration-300"
          ><i class="bx bxs-cart"></i>
          <transition name="scale-fade">
            <span
              class="flex items-center justify-center text-[10px] translate-x-1/2 font-bold text-white bg-error w-4 h-4 absolute top-0 right-0 rounded-full"
              v-if="cart.length > 0"
            >
              {{ cart.length }}
            </span>
          </transition>
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'wishlist', params: {} }"
          class="flex items-center text text-3xl text-text_gray_bold transition-all duration-300"
          ><i class="bx bxs-heart"></i>
        </router-link>
      </li>
      <!-- <li>
        <router-link
          :to="{ name: 'wallet', params: {} }"
          class="flex items-center text text-3xl text-text_gray_bold transition-all duration-300"
          ><i class="bx bxs-wallet"></i>
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'logout', params: {} }"
          class="flex items-center text text-3xl text-text_gray_bold transition-all duration-300"
          ><i class="bx bx-log-out"></i>
        </router-link>
      </li> -->
      <user-avatar />
    </ul>
  </nav>
</template>

<script>
import { reactive } from "vue";
import { useCart } from "@/composable/useCart&Wishlist";
import UserAvatar from "./Icons/UserAvatar.vue";
export default {
  components: { UserAvatar },
  setup() {
    const { getCart } = useCart();
    const cart = reactive(getCart().CART);

    return { cart };
  },
};
</script>

<style lang="scss" scoped>
.nav-bottom {
  opacity: 0;
  transform: translateY(100%);
  -webkit-transform: translateY(100%);
  animation: slideBottom 0.5s 0.3s ease-in-out forwards;
  -webkit-animation: slideBottom 0.5s 0.3s ease-in-out forwards;
  a {
    &.router-link-exact-active {
      color: $green;
      animation: scaleActive 0.3s ease-in-out;
      -webkit-animation: scaleActive 0.3s ease-in-out;
    }
  }
  // .cart-icon {
  //   span {
  //     @apply bg-error;
  //   }
  // }
}
.scale-fade-enter-active {
  animation: scaleFade 0.3s ease-in-out;
  -webkit-animation: scaleFade 0.3s ease-in-out;
}
.scale-fade-leave-active {
  animation: scaleFade 0.3s ease-in-out reverse;
  -webkit-animation: scaleFade 0.3s ease-in-out reverse;
}
@keyframes scaleActive {
  0%,
  100% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
  50% {
    transform: scale(1.2);
    -webkit-transform: scale(1.2);
  }
}
@keyframes scaleFade {
  0% {
    transform: scale(0) translateX(50%);
    -webkit-transform: scale(0) translateX(50%);
    opacity: 0;
  }
  100% {
    transform: scale(1) translateX(50%);
    -webkit-transform: scale(1) translateX(50%);
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
</style>
