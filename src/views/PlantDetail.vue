<template>
  <div class="plant-detail bg-[#f8f8f8] h-screen flex flex-col md:flex-row">
    <div
      class="container px-[30px] pt-[30px] mx-auto flex flex-col md:w-1/2 md:h-full h-2/5 overflow-hidden"
    >
      <header-main>
        <template v-slot:content-left>
          <router-link
            :to="{ name: routeName || 'home', params: {} }"
            class="flex items-center md:text-3xl text-xl text-main_black transition-all duration-300 hover:-translate-x-2 hover:text-green"
          >
            <i class="bx bx-arrow-back"></i>
          </router-link> </template
      ></header-main>
      <div
        class="plant-image animate-slide-bottom opacity-0 animate-delay-200 translate-y-full flex-1 h-full overflow-hidden pb-5"
      >
        <img
          :src="plant_item.image"
          :alt="plant_item.name"
          class="w-full h-full object-contain md:w-1/2"
        />
      </div>
    </div>
    <main class="flex-1 bg-white p-5 md:p-10">
      <div class="plant-details">
        <div
          class="plant-overview border-b pb-5 border-slate-200 flex justify-between"
        >
          <div>
            <div
              class="plant-name animate-slide-bottom opacity-0 animate-delay-200 translate-y-full font-bold text-2xl text-main_black capitalize"
            >
              {{ plant_item.name }}
            </div>
            <div
              class="plant-rate animate-slide-bottom opacity-0 animate-delay-400 translate-y-full pt-3 flex items-center gap-5"
            >
              <div
                class="sold bg-[#EBFAF3] py-1 px-2 font-bold rounded-[8px] text-xs text-green"
              >
                0 Sold
              </div>
              <div class="flex-1 flex items-center font-medium gap-2">
                <span class="text-green text-base"
                  ><i class="bx bxs-star"></i
                ></span>
                <span>0 (0 review)</span>
              </div>
            </div>
          </div>
          <div
            class="wishlist cursor-pointer transition-all duration-300 text-[26px] items-center h-max inline-flex"
            @click="addToWishList(plant_item)"
            :class="{ inWishList: isInWishList }"
          >
            <i class="bx bxs-heart"></i>
          </div>
        </div>
        <!-- plant desc -->
        <div class="plant-desc py-4">
          <div
            class="heading font-semibold text-xl capitalize animate-slide-bottom opacity-0 animate-delay-200 translate-y-full"
          >
            Description
          </div>
          <div
            class="desc text-sm text-main_black mt-1 translate-y-full animate-slide-bottom opacity-0 animate-delay-400"
          >
            I will update the description about of this plant soon. Thank you
          </div>
        </div>
        <!-- plant quantity -->
        <div
          class="plant-quantity pb-5 animate-slide-bottom opacity-0 animate-delay-200 translate-y-full border-b border-slate-200 flex items-center gap-[20px]"
        >
          <div class="heading font-semibold text-xl capitalize">Quantity</div>
          <div
            class="control-quantity text-lg font-bold flex w-max gap-[20px] bg-[#F8F8F8] text-green py-2 px-6 rounded-2xl"
          >
            <div
              @click="descQuantity"
              class="desc-quantity cursor-pointer select-none"
            >
              -
            </div>
            <div class="quantity">{{ quantity }}</div>
            <div
              @click="incrQuantity"
              class="incr-quantity cursor-pointer select-none"
            >
              +
            </div>
          </div>
        </div>
        <!-- plant add to cart -->
        <div class="add-to-cart-container gap-[40px] pt-5 flex items-center">
          <div class="total-price text-center">
            <div
              class="subtitle capitalize text-base font-normal animate-slide-bottom opacity-0 animate-delay-200 translate-y-full text-text_gray pb-1"
            >
              Price
            </div>
            <div
              class="total font-bold animate-slide-bottom opacity-0 animate-delay-400 translate-y-full text-main_black text-2xl"
            >
              ${{ plant_item.price * quantity }}
            </div>
          </div>
          <button
            @click="addToCart(plant_item)"
            class="add-to-cart-button overflow-hidden relative bg-green animate-slide-bottom opacity-0 animate-delay-200 translate-y-full flex items-center justify-center gap-7 p-3 font-semibold text-white capitalize rounded-3xl flex-1 before:opacity-0 before:pointer-events-none"
            :class="{
              'added pointer-events-none': isAdding,
              'pointer-events-none before:opacity-100': quantity === 0,
            }"
          >
            <div class="icon relative">
              <svg
                class="cart-icon transition-all duration-300"
                :class="{
                  'translate-y-full opacity-0 pointer-events-none': isAdding,
                }"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path
                  d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
                ></path>
              </svg>
              <svg
                class="tick absolute top-0 -translate-y-full opacity-0 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path fill="none" d="M0 0h24v24H0V0z" />
                <path
                  fill="#ffffff"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29L5.7 12.7c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.59 7.59c-.38.39-1.02.39-1.41 0z"
                />
              </svg>
            </div>
            <span class="add-to-cart">{{
              isAdding ? "added to cart" : "add to cart"
            }}</span>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import HeaderMain from "@/components/Header/HeaderMain.vue";
import { useCart } from "@/composable/useCart&Wishlist";
import { onBeforeMount, reactive, onUnmounted } from "vue";
import { useUser } from "@/composable/userData";
import { ref } from "vue";
import { PLANTS } from "@/data";
import { useRoute } from "vue-router";

export default {
  components: { HeaderMain },
  setup() {
    const { getCart } = useCart();
    const { getUser } = useUser();
    const { userData } = getUser();
    const cart = reactive(getCart().CART.value);
    const wishlist = reactive(getCart().WISHLIST.value);
    const plant_item = ref(null);
    const plants = reactive(PLANTS);
    const route = useRoute();
    const quantity = ref(1);
    const isAdding = ref(false);
    const isInWishList = ref(false);

    const routeName = ref(null);

    onUnmounted(() => {
      plant_item.value = null;
    }),
      onBeforeMount(() => {
        plant_item.value = plants.find((pl) => pl.id === route.params.id);
        const checkinWishlist = wishlist.find(
          (pl) => pl.id === plant_item.value.id
        );
        if (checkinWishlist) {
          return (isInWishList.value = true);
        }
        isInWishList.value = false;
      });

    const descQuantity = () => {
      if (quantity.value > 0) {
        return quantity.value--;
      }
      quantity.value = 0;
    };
    const incrQuantity = () => {
      quantity.value++;
    };

    const addToCart = (plant) => {
      isAdding.value = true;
      const foundPlant = cart.find((pl) => pl.id === plant.id);
      if (foundPlant) {
        foundPlant.quantity += quantity.value;
      } else {
        cart.push({
          ...plant,
          quantity: quantity.value,
        });
      }
      routeName.value = "cart";
      localStorage.setItem("cart-" + userData.value.uid, JSON.stringify(cart));
      setTimeout(() => {
        isAdding.value = false;
      }, 1000);
    };

    const addToWishList = (plant) => {
      if (isInWishList.value) {
        wishlist.splice(checkinWishlist(plant), 1);
        isInWishList.value = false;
      } else {
        isInWishList.value = true;
        wishlist.push(plant);
      }
      routeName.value = "wishlist";

      localStorage.setItem(
        "wishlist-plants-" + userData.value.uid,
        JSON.stringify(wishlist)
      );
    };

    const checkinWishlist = (plant) => {
      const checkIndex = wishlist.indexOf(plant);
      let index;
      if (checkIndex != 1) {
        index = checkIndex;
      }
      return index;
    };

    return {
      plant_item,
      quantity,
      descQuantity,
      incrQuantity,
      isAdding,
      addToCart,
      isInWishList,
      addToWishList,
      routeName,
    };
  },
};
</script>

<style lang="scss" scoped>
.add-to-cart-button {
  &::before {
    content: "";
    inset: 0;
    position: absolute;
    background: transparentize($color: $main_black, $amount: 0.8);
    z-index: 99999;
    transition: all 0.4s ease-in-out;
    -webkit-transition: all 0.4s ease;
  }
}
.add-to-cart-button.added {
  .tick {
    opacity: 1;
    animation: grow 0.6s ease-in-out forwards;
    -webkit-animation: grow 0.6s ease-in-out forwards;
  }
}

.wishlist.inWishList {
  color: $green;
  animation: bounce 0.5s ease-in-out forwards;
  -webkit-animation: bounce 0.5s ease-in-out forwards;
}

@-webkit-keyframes grow {
  0% {
    -webkit-transform: scale(0) translateY(-100%);
  }
  50% {
    -webkit-transform: scale(1.2) translateY(0);
  }
  100% {
    -webkit-transform: scale(1) translateY(0);
  }
}

@keyframes grow {
  0% {
    -webkit-transform: scale(0) translateY(-100%);
  }
  50% {
    -webkit-transform: scale(1.2) translateY(0);
  }
  100% {
    -webkit-transform: scale(1) translateY(0);
  }
}

@-webkit-keyframes bounce {
  0% {
    -webkit-transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1.3);
  }
  100% {
    -webkit-transform: scale(1);
  }
}

@keyframes bounce {
  0% {
    -webkit-transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1.3);
  }
  100% {
    -webkit-transform: scale(1);
  }
}
</style>
