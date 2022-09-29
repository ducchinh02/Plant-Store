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
    <div class="product-actions flex items-center justify-between p-5">
      <div
        class="add-to-cart cursor-pointer capitalize py-[11px] px-4 font-bold bg-white whitespace-nowrap rounded-3xl text-xs md:text-base transition-all duration-300"
        @click="addToCart(plant)"
        :class="{
          'text-main_black': !isAdding,
          'text-green pointer-events-none': isAdding,
        }"
      >
        {{ buttonText }}
      </div>
      <div
        class="add-to-wishlist cursor-pointer p-[11px] flex items-center font-bold rounded-full bg-white"
        @click="addToWishList(plant)"
        :class="{
          'text-main_black': !isInWishlist,
          'action-active': isInWishlist,
        }"
      >
        <i
          class="bx bxs-heart"
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
export default {
  props: {
    plant: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { getUser } = useUser();
    const { userData } = getUser();
    const { getCart } = useCart();
    const isAdding = ref(false);
    const buttonText = ref("Add to cart");

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
      const check = wishlist.find((plant) => plant.id === props.plant.id);
      if (check) isInWishlist.value = true;
      else isInWishlist.value = false;
    });

    const addToCart = (plant) => {
      isAdding.value = true;
      buttonText.value = "Added to cart";
      const foundPlant = cart.find((pl) => pl.id === plant.id);
      if (foundPlant) {
        foundPlant.quantity++;
      } else {
        cart.push({
          ...plant,
          quantity: 1,
        });
      }
      localStorage.setItem("cart-" + userData.value.uid, JSON.stringify(cart));
      setTimeout(() => {
        isAdding.value = false;
        buttonText.value = "Add to cart";
      }, 1000);
    };

    const addToWishList = (plant) => {
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
    };

    return {
      addToCart,
      buttonText,
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
