<template>
  <div class="product-item bg-bgGreen rounded-3xl pt-[30px]">
    <router-link
      :to="{ name: 'plant-detail', params: { id: plant.id } }"
      class="flex justify-center"
    >
      <div class="product-image h-[200px]">
        <img
          :src="plant.image"
          :alt="plant.name"
          class="h-full w-full object-contain"
        />
      </div>
    </router-link>
    <div class="product-actions relative flex items-center justify-between p-5">
      <div
        class="add-to-cart-icon z-10 relative cursor-pointer p-[9px] rounded-full overflow-hidden bg-white"
        @click="addToCart(plant)"
        :class="{
          'pointer-events-none added': isAdding,
        }"
      >
        <svg
          class="cart-icon transition-all duration-300 w-5 h-5"
          :class="{
            'translate-y-full opacity-0 pointer-events-none': isAdding,
          }"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#000"
          stroke="#000"
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
          class="tick absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path
            fill="#01B763"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29L5.7 12.7c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.59 7.59c-.38.39-1.02.39-1.41 0z"
          />
        </svg>
      </div>
      <div
        class="add-to-wishlist z-10 cursor-pointer p-[11px] flex items-center font-bold rounded-full bg-white"
        @click="addToWishList(plant)"
        :class="{
          'text-main_black': !isInWishlist,
          'action-active': isInWishlist,
        }"
      >
        <i
          class="bx bxs-heart transition-all duration-300"
          :class="{
            'text-error': isInWishlist,
          }"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import { useCart } from "@/composable/useCart&Wishlist";
import { reactive, ref, onBeforeMount } from "vue";
import { useUser } from "@/composable/userData";
import { useRouter } from "vue-router";
export default {
  props: {
    plant: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const { getUser } = useUser();
    const { userData } = getUser();
    const { getCart } = useCart();
    const isAdding = ref(false);

    const cart = reactive(getCart().CART.value);
    const wishlist = reactive(getCart().WISHLIST.value);
    const isInWishlist = ref(false);

    const checkinWishlist = (plant) => {
      const checkIndex = wishlist.indexOf(plant);
      if (checkIndex != -1) {
        isInWishlist.value = true;
        return checkIndex;
      } else {
        isInWishlist.value = false;
        return checkIndex;
      }
    };

    onBeforeMount(() => {
      if (userData.value) {
        const check = wishlist.find((plant) => plant.id === props.plant.id);
        if (check) isInWishlist.value = true;
        else isInWishlist.value = false;
      }
    });

    const addToCart = (plant) => {
      if (userData.value) {
        isAdding.value = true;
        const foundPlant = cart.find((pl) => pl.id === plant.id);
        if (foundPlant) {
          foundPlant.quantity++;
        } else {
          cart.push({
            ...plant,
            quantity: 1,
          });
        }
        localStorage.setItem(
          "cart-" + userData.value.uid,
          JSON.stringify(cart)
        );
        setTimeout(() => {
          isAdding.value = false;
        }, 1000);
      } else router.push({ name: "login", params: {} });
    };

    const addToWishList = (plant) => {
      if (userData.value) {
        if (isInWishlist.value) {
          wishlist.splice(checkinWishlist(plant), 1);
          isInWishlist.value = false;
        } else {
          isInWishlist.value = true;
          wishlist.push(plant);
        }
        localStorage.setItem(
          "wishlist-plants-" + userData.value.uid,
          JSON.stringify(wishlist)
        );
      } else router.push({ name: "login", params: {} });
    };

    return {
      addToCart,
      isAdding,
      addToWishList,
      isInWishlist,
    };
  },
};
</script>

<style lang="scss" scoped>
.product-item {
  animation: activeOpacity 0.5s ease-in-out;
  -webkit-animation: activeOpacity 0.5s ease-in-out;
  .add-to-wishlist {
    &.action-active {
      animation: scaleActive 0.3s ease-in-out;
      -webkit-animation: scaleActive 0.3s ease-in-out;
    }
  }
}

.add-to-cart-icon.added {
  .tick {
    opacity: 1;
    animation: grow 0.6s ease-in-out forwards;
    -webkit-animation: grow 0.6s ease-in-out forwards;
  }
}
@-webkit-keyframes grow {
  0% {
    -webkit-transform: scale(0) translate(-50%, -100%);
  }
  50% {
    -webkit-transform: scale(1.2) translate(-50%, -50%);
  }
  100% {
    -webkit-transform: scale(1) translate(-50%, -50%);
  }
}

@keyframes grow {
  0% {
    -webkit-transform: scale(0) translate(-50%, -100%);
  }
  50% {
    -webkit-transform: scale(1.2) translate(-50%, -50%);
  }
  100% {
    -webkit-transform: scale(1) translate(-50%, -50%);
  }
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
@keyframes slideBottom {
  to {
    opacity: 1;
    transform: translateY(0);
    -webkit-transform: translateY(0);
  }
}
@keyframes activeOpacity {
  0% {
    opacity: 0;
    transform: translateX(50px);
    -webkit-transform: translateX(50px);
  }
  100% {
    transform: translateX(0);
    -webkit-transform: translateX(0);
    opacity: 1;
  }
}
</style>
