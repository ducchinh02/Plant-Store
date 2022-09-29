<template>
  <div class="wishlist md:h-screen custom-scroll md:flex-1">
    <div
      class="container main-contain overflow-scroll relative h-screen md:h-full md:px-[30px] px-5 pt-[30px] mx-auto flex flex-col"
    >
      <header-main class="pb-[20px]">
        <template v-slot:content-left>
          <div class="flex items-center gap-2 my-wishlist">
            <div class="logo text-4xl flex text-green items-center">
              <i class="bx bxs-bookmark-heart"></i>
            </div>
            <div class="capitalize text-main_black font-bold text-xl">
              My Wishlist
            </div>
          </div>
        </template>
        <template v-slot:content-right>
          <div
            class="font-bold bg-green text-white flex items-center justify-center rounded-full w-[40px] h-[40px]"
          >
            {{ wishlist.length }}
          </div>
        </template>
      </header-main>
      <!-- wishlist item -->
      <transition name="fade" appear mode="out-in">
        <transition-group
          tag="ul"
          name="list"
          appear
          v-if="wishlist.length > 0"
          class="wish-contain grid md:gap-[30px] gap-5 pt-8 overflow-auto pb-[200px] md:pb-[100px] relative"
        >
          <li
            class="wish-item relative"
            v-for="plant in wishlist"
            :key="plant.id"
          >
            <router-link
              :to="{ name: 'plant-detail', params: { id: plant.id } }"
              class="flex items-center"
            >
              <div
                class="plant-thumb w-full h-[160px] flex items-center bg-[#f8f8f8] rounded-3xl"
              >
                <img
                  :src="plant.image"
                  :alt="plant.name"
                  class="w-4/5 h-full py-3 object-contain"
                />
              </div>
            </router-link>
            <div
              class="wishlist cursor-pointer transition-all absolute top-3 right-3 duration-300 text-2xl items-center inline-flex text-green"
              @click="removeFromWishList(plant)"
            >
              <i class="bx bxs-heart"></i>
            </div>
            <div class="plant-detail flex flex-col">
              <div
                class="plant-name py-2 font-bold capitalize text-main_black text-base whitespace-nowrap"
              >
                {{ plant.name }}
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center font-medium gap-1 text-base">
                  <i class="bx bxs-star text-green"></i>
                  <span>0</span>
                </div>
                <div class="plant-price font-medium text-green">
                  ${{ plant.price }}
                </div>
              </div>
            </div>
          </li>
        </transition-group>
        <div
          v-else
          class="empty-wishlist flex-1 py-[100px] md:py-0 items-center flex flex-col gap-5"
        >
          <div class="empty-wishlist-img md:-mt-20">
            <img
              src="@/assets/images/empty-wishlist.webp"
              alt="Empty Wishlist"
            />
          </div>
          <div class="text-center text-content pb-[30px]">
            <h1 class="text-heading pb-3 font-bold text-2xl capitalize">
              Your wishlist is empty
            </h1>
            <p class="text-main_black px-4">Do you truly adore plants?</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { useCart } from "@/composable/useCart&Wishlist";
import { reactive } from "vue";
import HeaderMain from "@/components/Header/HeaderMain.vue";
import { useUser } from "@/composable/userData";
export default {
  components: { HeaderMain },
  setup() {
    const { getCart } = useCart();
    const wishlist = reactive(getCart().WISHLIST.value);
    const { getUser } = useUser();
    const { userData } = getUser();
    const removeFromWishList = (plant) => {
      wishlist.splice(wishlist.indexOf(plant), 1);
      localStorage.setItem(
        "wishlist-plants-" + userData.value.uid,
        JSON.stringify(wishlist)
      );
    };
    return { wishlist, removeFromWishList };
  },
};
</script>
<style lang="scss" scoped>
.wishlist {
  .main-contain,
  .wish-contain {
    & {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .wish-contain {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    @media screen and (max-width: 567px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  .empty-wishlist {
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
.fade-enter-active {
  animation: fade 0.5s ease-in-out;
  -webkit-animation: fade 0.5s ease-in-out;
}
.fade-leave-active {
  animation: fade 0.5s ease-in-out;
  -webkit-animation: fade 0.5s ease-in-out;
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
</style>
