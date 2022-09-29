<template>
  <div class="cart md:h-screen custom-scroll md:flex-1">
    <div
      class="container relative main-contain overflow-scroll h-screen md:h-full px-[30px] pt-[30px] mx-auto flex flex-col"
    >
      <header-main class="pb-[20px]">
        <template v-slot:content-left>
          <div class="flex items-end gap-2 my-cart">
            <div class="logo w-8">
              <img src="@/assets/images/PlantLogo.svg" alt="" />
            </div>
            <div class="capitalize text-main_black font-bold text-xl">
              My cart
            </div>
          </div>
        </template>
        <template v-slot:content-right>
          <div class="total-price text-center">
            <div
              class="subtitle capitalize font-normal text-sm text-text_gray pb-1"
            >
              Total price
            </div>
            <div class="total font-bold text-main_black text-xl">
              ${{ totalPrice }}
            </div>
          </div>
        </template>
      </header-main>
      <!-- cart item -->
      <transition name="fade" appear mode="out-in">
        <div
          v-if="cart.length > 0"
          class="cart-contain flex-1 pt-8 overflow-auto pb-[200px]"
        >
          <div class="flex flex-col gap-[30px]">
            <transition-group
              tag="ul"
              class="cart-list flex flex-col gap-[30px] relative md:grid md:grid-cols-2"
              name="list"
              appear
            >
              <cart-item
                comp="li"
                :plant="plant"
                v-for="plant in cart"
                :key="plant.id"
                @incr-quantity="incrQuantity"
                @desc-quantity="descQuantity"
                @active-remove="activeRemove"
              />
            </transition-group>
            <router-link to="" class="flex">
              <div
                class="payment-btn flex items-center justify-center capitalize flex-1 gap-1 px-5 py-4 text-center font-medium bg-green rounded-3xl text-white"
              >
                <span>Checkout</span>
                <div
                  class="icon flex items-center transition-all duration-300 text-2xl"
                >
                  <i class="bx bx-right-arrow-alt"></i>
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <div
          v-else
          class="empty-cart flex-1 py-[100px] md:py-0 items-center flex flex-col gap-5"
        >
          <div class="empty-cart-img md:pt-0 md:-mt-10">
            <img src="@/assets/images/empty-cart.webp" alt="Empty Cart" />
          </div>
          <div class="text-center text-content pb-[30px]">
            <h1 class="text-heading pb-3 font-bold text-2xl capitalize">
              Your cart is empty
            </h1>
            <p class="text-main_black px-4">
              You don't have any items added to cart yet.
            </p>
          </div>
        </div>
      </transition>
    </div>
    <!-- modal -->
    <transition name="slide-bottom">
      <modal-bottom
        @remove-item="removePlant"
        :plant="plantSelected"
        @cancelRemove="(showModal = false), (plantSelected = null)"
        v-if="showModal"
      />
    </transition>
    <!-- overlay -->
    <transition name="fade">
      <overlay @click="showModal = false" v-if="showModal" />
    </transition>
  </div>
</template>

<script>
import { useCart } from "@/composable/useCart&Wishlist";
import { reactive, computed } from "vue";
import HeaderMain from "@/components/Header/HeaderMain.vue";
import { useUser } from "@/composable/userData";
import CartItem from "@/components/CartItem.vue";
import ModalBottom from "@/components/ModalBottom.vue";
import { ref } from "vue";
import Overlay from "@/components/Overlay.vue";
export default {
  components: {
    HeaderMain,
    CartItem,
    ModalBottom,
    Overlay,
  },
  setup() {
    const { getCart } = useCart();
    const { getUser } = useUser();
    const { userData } = getUser();
    const cart = reactive(getCart().CART);
    const showModal = ref(false);
    const plantSelected = ref(null);
    const descQuantity = (plant) => {
      plant.quantity--;
      localStorage.setItem(
        "cart-" + userData.value.uid,
        JSON.stringify(cart.value)
      );
      if (plant.quantity === 0) {
        removePlant(plant);
      }
    };
    const incrQuantity = (plant) => {
      plant.quantity++;
      localStorage.setItem(
        "cart-" + userData.value.uid,
        JSON.stringify(cart.value)
      );
    };
    const removePlant = (plant) => {
      cart.value = cart.value.filter((pl) => pl.id != plant.id);
      localStorage.setItem(
        "cart-" + userData.value.uid,
        JSON.stringify(cart.value)
      );
      plantSelected.value = null;
      showModal.value = false;
    };
    const activeRemove = (plant) => {
      plantSelected.value = plant;
      showModal.value = true;
    };
    const totalPrice = computed(() => {
      let total = 0;
      cart.value.forEach((plant) => {
        total += plant.quantity * plant.price;
      });
      return total;
    });
    return {
      cart,
      descQuantity,
      incrQuantity,
      removePlant,
      totalPrice,
      showModal,
      plantSelected,
      activeRemove,
    };
  },
};
</script>

<style lang="scss" scoped>
.cart {
  .main-contain,
  .cart-contain {
    & {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    &::-webkit-scrollbar {
      display: none;
    }
    .cart-list {
    }
    .payment-btn:hover {
      @apply transition-all duration-300;
      @apply bg-greenBold;
      .icon {
        transform: translateX(5px);
        -webkit-transform: translateX(5px);
      }
    }
  }
  .empty-cart {
    &-img {
      transform: translateY(20px);
      -webkit-transform: translateY(20px);
      opacity: 0;
      animation: slideBottomFade 0.5s 0.3s ease-in-out forwards;
      -webkit-animation: slideBottomFade 0.5s 0.3s ease-in-out forwards;
    }
    .text-content {
      h1 {
        transform: translateY(20px);
        -webkit-transform: translateY(20px);
        opacity: 0;
        animation: slideBottomFade 0.5s 0.4s ease-in-out forwards;
        -webkit-animation: slideBottomFade 0.5s 0.4s ease-in-out forwards;
      }
      p {
        transform: translateY(20px);
        -webkit-transform: translateY(20px);
        opacity: 0;
        animation: slideBottomFade 0.5s 0.5s ease-in-out forwards;
        -webkit-animation: slideBottomFade 0.5s 0.5s ease-in-out forwards;
      }
    }
  }
}
.list-enter-from {
  transform: scale(0);
  -webkit-transform: scale(0);
  opacity: 0;
}
.list-enter-to {
  transform: scale(1);
  -webkit-transform: scale(1);
  opacity: 1;
}
.list-leave-from {
  transform: scale(1);
  -webkit-transform: scale(1);
  opacity: 1;
}
.list-leave-to {
  transform: scale(0);
  -webkit-transform: scale(0);
  opacity: 0;
}
.list-move,
.list-enter-active,
.list-leave-active {
  @apply transition-all duration-500;
}
.list-leave-active {
  position: absolute;
}
.fade-enter-active {
  animation: fade 0.5s ease-in-out;
  -webkit-animation: fade 0.5s ease-in-out;
}
.fade-leave-active {
  animation: fade 0.5s ease-in-out reverse;
  -webkit-animation: fade 0.5s ease-in-out reverse;
}
@keyframes slideBottomFade {
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}
@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.slide-bottom-enter-active {
  animation: slideBottom 0.4s ease-in-out;
  -webkit-animation: slideBottom 0.4s ease-in-out;
}
@keyframes slideBottom {
  0% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
.slide-bottom-leave-active {
  animation: slideBottom 0.4s ease-in-out reverse;
  -webkit-animation: slideBottom 0.4s ease-in-out reverse;
}
</style>
