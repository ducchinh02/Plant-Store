<template>
  <div
    class="home custom-scroll pb-[60px] md:flex-1 md:w-max md:h-screen md:overflow-auto"
  >
    <div class="container md:h-full px-[30px] pt-[30px] mx-auto">
      <header-main>
        <template v-slot:content-left>
          <div class="user-info">
            <div class="status flex items-center gap-2">
              <span class="font-medium capitalize text-text_gray_bold"
                >Good {{ time }}</span
              >
              <sun-and-moon
                :src="require('@/assets/images/' + icon + '.svg')"
                class="w-8 h-8"
              />
            </div>
            <div class="user-name text-main_black capitalize text-xl font-bold">
              {{ userName }}
            </div>
          </div>
        </template>
        <template v-slot:content-right>
          <div
            @click="showModalLogout"
            class="flex items-center cursor-pointer hover:text-green text-3xl text-main_black transition-all duration-300"
          >
            <i class="bx bx-log-out"></i>
          </div>
        </template>
      </header-main>
      <div
        class="input-group relative transition-all duration-300 flex mt-6 px-[18px] py-[14px] rounded-xl bg-[#f6f6f6]"
      >
        <label
          for="search"
          class="flex justify-center text-2xl transition-all duration-300 items-center absolute top-1/2 left-[18px] -translate-y-1/2"
          :class="{ 'opacity-0 -translate-x-full': isSearching }"
        >
          <i class="bx bx-search"></i>
        </label>
        <input
          id="search"
          type="text"
          placeholder="Find your plants..."
          class="flex-1 font-bold bg-transparent transition-all duration-300"
          :class="{ 'pl-8': !isSearching, 'pl-0 pr-8': isSearching }"
          @input="onSearch"
          v-model="searchValue"
        />
        <div
          class="end-input flex justify-center text-2xl transition-all duration-300 items-center absolute top-1/2 right-[18px] -translate-y-1/2 translate-x-full"
          :class="{
            'opacity-1 translate-x-0': isSearching,
            'opacity-0': !isSearching,
          }"
          @click="endInputValue"
        >
          <i class="bx bx-x"></i>
        </div>
      </div>
      <div class="main-content" v-if="!isSearching">
        <!-- sale off -->
        <div
          class="sale-off-banner mt-12 bg-bgGreen py-[34px] px-6 rounded-3xl"
        >
          <div class="flex">
            <div class="sale-details w-1/2">
              <div
                class="sale-percent font-bold text-2xl text-main_black uppercase"
              >
                {{ salePercent }}% off
              </div>
              <div
                class="sale-time capitalize font-medium text-lg text-[#526251]"
              >
                {{ saleTime }}
              </div>
            </div>
            <div class="sale-thumb relative flex-[0 0 50%] w-1/2">
              <div class="sale-img w-full left-0 absolute bottom-[-20px]">
                <router-link
                  :to="{
                    name: 'plant-detail',
                    params: { id: plants[onSaleIndex].id },
                  }"
                >
                  <img
                    :src="plants[onSaleIndex].image"
                    :alt="plants[onSaleIndex].name"
                  />
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <!-- popular plants -->
        <div class="popular-plants py-10">
          <div class="text-heading pb-7 font-bold text-2xl capitalize">
            Popular Plants
          </div>
          <plants-slider :array="plants" />
        </div>
      </div>
      <div class="search-result" v-else>
        <ul class="list flex flex-col gap-4 mt-5">
          <li
            class="list-item transition-all duration-300 font-medium capitalize"
            v-for="item in listResult"
            :key="item.id"
          >
            <router-link
              :to="{ name: 'plant-detail', params: { id: item.id } }"
              class="block"
            >
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <!-- modal -->
    <transition name="slide-bottom">
      <modal-bottom v-if="showModal">
        <div class="text-error">Logout</div>
        <template v-slot:actions>
          <div
            class="grid grid-cols-1 gap-[30px] mt-[28px] py-7 border-b border-t border-slate-300"
          >
            <div class="text-center font-bold text-xl">
              Are you sure you want to log out?
            </div>
            <div class="btn-actions grid grid-cols-2 gap-[15px]">
              <primary-button
                type="button"
                class="cancel-logout"
                @click="showModal = false"
              >
                Cancel
              </primary-button>
              <primary-button
                type="button"
                class="capitalize"
                @click="onLogout"
              >
                Yes, Logout
              </primary-button>
            </div>
          </div>
        </template>
      </modal-bottom>
    </transition>
    <!-- overlay -->
    <transition name="fade">
      <overlay @click="showModal = false" v-if="showModal" />
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import { useUser } from "@/composable/userData";
import HeaderMain from "@/components/Header/HeaderMain.vue";
import SunAndMoon from "@/components/Icons/SunAndMoon.vue";
import PlantsSlider from "@/components/PlantsSlider.vue";
import { ref, reactive, computed, onUnmounted } from "vue";
import { PLANTS } from "@/data";
import ModalBottom from "@/components/ModalBottom.vue";
import Overlay from "@/components/Overlay.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import { useRouter } from "vue-router";
export default {
  name: "HomeView",
  components: {
    HeaderMain,
    ModalBottom,
    Overlay,
    SunAndMoon,
    PlantsSlider,
    PrimaryButton,
  },
  setup(props, { emit }) {
    const onSaleIndex = 2;
    const salePercent = 30;
    const saleTime = "05-10 Oct";
    // user data
    const { getUser } = useUser();
    const { userData } = getUser();

    // display time - icon
    const time = ref("");
    const icon = ref("");
    const date = new Date();
    const hour = date.getHours();
    // display user name
    const splitName = userData.value.displayName.split(" ");
    const userName = splitName
      .slice(splitName.length - 2, splitName.length)
      .join(" ");

    const searchValue = ref("");
    const isSearching = ref(false);
    const plants = reactive(PLANTS);

    const router = useRouter();
    const showModal = ref(false);

    const showModalLogout = () => {
      showModal.value = true;
    };

    const onLogout = () => {
      router.push({ name: "logout", params: {} });
    };

    const listResult = computed(() =>
      plants.filter(
        (plant) =>
          plant.name
            .toLowerCase()
            .includes(searchValue.value.toLowerCase().trim()) ||
          plant.type
            .toLowerCase()
            .includes(searchValue.value.toLowerCase().trim()) ||
          plant.price <= searchValue.value
      )
    );

    const onSearch = () => {
      isSearching.value = true;
      if (searchValue.value == "") isSearching.value = false;
      emit("onFocusInput", isSearching.value);
    };

    const endInputValue = () => {
      searchValue.value = "";
      isSearching.value = false;
      emit("endFocusInput", isSearching.value);
    };

    onUnmounted(() => {
      isSearching.value = false;
      emit("endFocusInput", isSearching.value);
    }),
      hour >= 18
        ? ((time.value = "Evening"), (icon.value = "half-moon"))
        : hour >= 12
        ? ((time.value = "Afternoon"), (icon.value = "sunset"))
        : ((time.value = "Morning"), (icon.value = "sun"));

    return {
      userName,
      time,
      icon,
      isSearching,
      searchValue,
      endInputValue,
      plants,
      salePercent,
      saleTime,
      onSaleIndex,
      listResult,
      onSearch,
      showModal,
      showModalLogout,
      onLogout,
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  .sale-off-banner {
    .sale-thumb {
      .sale-img {
        opacity: 0;
        animation: activeOpacity 0.5s 0.3s ease-in-out forwards;
        -webkit-animation: activeOpacity 0.5s 0.3s ease-in-out forwards;
      }
    }
  }

  .input-group {
    border-color: transparent;
    input {
      &::placeholder {
        @apply font-normal;
      }
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 30px #f6f6f6 inset;
      -webkit-text-fill-color: $main_black !important;
    }
  }
  .search-result {
    .list-item:hover {
      color: $green;
    }
  }
}
@keyframes activeOpacity {
  to {
    opacity: 1;
  }
}
.modal-bottom {
  .btn-actions {
    .cancel-logout {
      color: $green !important;
      background: #e6f8ef !important ;
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
