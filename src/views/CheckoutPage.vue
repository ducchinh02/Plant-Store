<template>
  <div class="checkout-page flex min-h-screen flex-col md:flex-row">
    <div
      class="container px-[30px] py-[30px] mx-auto"
      :class="{ 'h-screen flex flex-col gap-[30px]': isPayment }"
    >
      <header-main>
        <template v-slot:content-left>
          <div class="flex items-center gap-2 my-cart">
            <router-link
              :to="{ name: 'cart', params: {} }"
              class="flex items-center md:text-3xl text-2xl text-main_black transition-all duration-300 hover:-translate-x-2 hover:text-green"
            >
              <i class="bx bx-arrow-back"></i>
            </router-link>
            <div class="capitalize text-main_black font-bold text-2xl">
              Checkout
            </div>
          </div>
        </template>
      </header-main>
      <!-- main content -->
      <transition name="fade" appear mode="out-in">
        <main
          v-if="!isPayment"
          class="grid grid-cols-1 md:grid-cols-2 gap-[30px] md:gap-[50px] pt-[35px] md:pt-[50px]"
        >
          <div class="shipping-address">
            <h1
              class="text-lg font-bold animate-slide-bottom opacity-0 translate-y-full"
            >
              Shipping address
            </h1>
            <form @submit.prevent="updateAddress" class="pt-5">
              <div
                class="flex item-center gap-6 animate-slide-bottom opacity-0 animate-delay-200 translate-y-full"
              >
                <label for="location" class="location-icon w-5 h-[25px]">
                  <img
                    src="@/assets/images/Location.svg"
                    class="w-full h-full object-contain"
                    alt="Location icon"
                  />
                </label>
                <div class="address flex-1">
                  <input
                    type="text"
                    placeholder="Enter your shipping address"
                    id="location"
                    class="w-full"
                    v-model="inputAddress"
                  />
                </div>
              </div>
              <!-- address options -->
              <div
                class="list-options pt-[30px] animate-slide-bottom opacity-0 animate-delay-400 translate-y-full flex flex-col gap-5"
                v-if="addressOptions.length > 0"
              >
                <label
                  v-for="addressItem in addressOptions"
                  :key="addressItem.address"
                  class="option transition-all duration-300 border-[2px] border-transparent flex relative items-center justify-between bg-slate-100 cursor-pointer px-5 py-3 rounded-xl"
                >
                  <span>{{ addressItem.address }}</span>
                  <input
                    class="absolute pointer-events-none opacity-0"
                    type="radio"
                    :value="addressItem.address"
                    v-model="selectAddress"
                  />
                  <div class="tick-icon">
                    <svg
                      class="tick pointer-events-none"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path fill="none" d="M0 0h24v24H0V0z" />
                      <path
                        fill="#999898"
                        class="path-fill transition-all duration-300"
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29L5.7 12.7c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.59 7.59c-.38.39-1.02.39-1.41 0z"
                      />
                    </svg>
                  </div>
                </label>
              </div>
            </form>
          </div>
          <!-- order list -->
          <div class="order-list">
            <h1
              class="text-lg font-bold animate-slide-bottom opacity-0 translate-y-full"
            >
              Order list
            </h1>
            <ul
              v-if="cart.length > 0"
              class="order-items animate-slide-bottom opacity-0 animate-delay-200 translate-y-full mt-4 py-5 max-h-80 md:max-h-96 overflow-scroll -mx-5 px-5 flex flex-col gap-[30px]"
            >
              <li class="rounded-3xl" v-for="item in cart" :key="item.id">
                <router-link
                  :to="{ name: 'plant-detail', params: { id: item.id } }"
                >
                  <cart-item
                    class="border-none items-center"
                    :plant="item"
                    :hideActions="true"
                  />
                </router-link>
              </li>
            </ul>
          </div>
          <div class="blank hidden md:block"></div>
          <!-- make payment -->
          <div class="make-payment" v-if="cart.length > 0">
            <div
              class="grid items-center grid-cols-1 md:grid-cols-2 gap-10 md:gap-[60px]"
            >
              <div class="total-price">
                <div class="Subtotal flex flex-col gap-3">
                  <div
                    class="total-price-items text-lg animate-slide-bottom opacity-0 translate-y-full flex justify-between items-center"
                  >
                    <span class="total font-bold">Subtotal</span>
                    <span>${{ totalPriceItem }}</span>
                  </div>
                  <div
                    class="shipping-cost text-lg animate-slide-bottom opacity-0 animate-delay-200 translate-y-full flex justify-between items-center"
                  >
                    <span class="total font-bold">Shipping</span>
                    <span>{{ shipping > 0 ? "$" + shipping : "Free" }}</span>
                  </div>
                  <div
                    class="text-lg flex animate-slide-bottom opacity-0 animate-delay-400 translate-y-full justify-between items-center"
                  >
                    <span class="total font-bold">Total</span>
                    <span>${{ shipping + totalPriceItem }}</span>
                  </div>
                </div>
              </div>
              <div
                class="payment flex animate-slide-bottom opacity-0 translate-y-full"
              >
                <primary-button @click="makePayment" class="flex-1 capitalize">
                  Payment
                </primary-button>
              </div>
            </div>
          </div>
        </main>
        <!-- successfully payment -->
        <div
          class="payment-success flex-1 flex items-center flex-col justify-center"
          v-else
        >
          <div class="tick-icon w-24 h-w-24">
            <svg
              class="tick pointer-events-none w-full h-full object-contain"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path
                fill="#01B763"
                class="path-fill transition-all duration-300"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29L5.7 12.7c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.59 7.59c-.38.39-1.02.39-1.41 0z"
              />
            </svg>
          </div>
          <div class="text-center pt-5">
            <h1
              class="text-heading capitalize text-xl animate-slide-bottom opacity-0 translate-y-full font-bold text-green pb-2"
            >
              Order Successfully Placed.
            </h1>
            <p
              class="desc capitalize animate-slide-bottom opacity-0 animate-delay-200 translate-y-full text-text_gray text-sm"
            >
              Your payment was successfully! Just wait Plantfresher arrive at
              home asap.
            </p>
            <primary-button
              class="px-5 animate-slide-bottom opacity-0 animate-delay-400 translate-y-full mx-auto mt-5"
            >
              <router-link
                class="capitalize"
                :to="{ name: 'home', params: {} }"
              >
                Continue shopping
              </router-link>
            </primary-button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import HeaderMain from "@/components/Header/HeaderMain.vue";
import CartItem from "@/components/CartItem.vue";
import { useUser } from "@/composable/userData";
import { reactive, ref, computed, onUnmounted } from "vue";
import { useCart } from "@/composable/useCart&Wishlist";
import PrimaryButton from "../components/PrimaryButton.vue";
export default {
  components: { HeaderMain, CartItem, PrimaryButton },
  setup() {
    const { getCart } = useCart();
    const { getUser } = useUser();
    const { userData } = getUser();
    const inputAddress = ref("");
    const selectAddress = ref("");
    const shipping = 0;
    const isPayment = ref(false);

    const addressOptions = reactive(getCart().USER_ADDRESS.value);
    const getValueChecked = (value) => {
      inputAddress.value = value;
    };
    const cart = reactive(getCart().CART);
    const totalPriceItem = computed(() => {
      let total = 0;
      cart.value.forEach((item) => {
        total += item.price * item.quantity;
      });
      return total;
    });
    const updateAddress = () => {
      addressOptions.push({
        address: inputAddress.value,
      });
      localStorage.setItem(
        "user-address-" + userData.value.uid,
        JSON.stringify(addressOptions)
      );
      inputAddress.value = "";
    };

    const makePayment = () => {
      isPayment.value = true;
      cart.value = [];
      localStorage.setItem(
        "cart-" + userData.value.uid,
        JSON.stringify(cart.value)
      );
    };
    onUnmounted(() => {
      isPayment.value = false;
    });
    return {
      cart,
      inputAddress,
      updateAddress,
      addressOptions,
      getValueChecked,
      selectAddress,
      totalPriceItem,
      shipping,
      makePayment,
      isPayment,
    };
  },
};
</script>

<style lang="scss" scoped>
.checkout-page {
  .payment-success {
    .tick-icon {
      animation: bounce 0.5s ease-in-out;
      -webkit-animation: bounce 0.5s ease-in-out;
    }
  }
  main {
    .list-options {
      .tick-icon {
        flex-shrink: 0;
      }
      label:has(input:checked) {
        border-color: $green;
      }
      label input:checked ~ .tick-icon {
        svg {
          .path-fill {
            fill: $green;
          }
        }
      }
    }
    .order-list {
      .order-items {
        & {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        &::-webkit-scrollbar {
          display: none;
        }
      }
      li {
        box-shadow: 0 0 15px transparentize($color: $main_black, $amount: 0.95);
      }
    }
  }
}
.fade-enter-active {
  animation: fade 0.5s ease-in-out;
  -webkit-animation: fade 0.5s ease-in-out;
}
.fade-leave-active {
  animation: fade 0.5s ease-in-out reverse;
  -webkit-animation: fade 0.5s ease-in-out reverse;
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes bounce {
  0% {
    scale: 0;
  }
  100% {
    scale: 1;
  }
}
</style>
