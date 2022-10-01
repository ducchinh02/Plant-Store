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
            <div
              v-if="userName"
              class="user-name text-main_black capitalize text-xl font-bold"
            >
              {{ userName }}
            </div>
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
              <div
                class="sale-img w-full left-0 absolute bottom-[-20px] md:w-[170px] md:h-[220px] md:left-1/2 md:-translate-x-1/2"
              >
                <router-link
                  class="flex h-full"
                  :to="{
                    name: 'plant-detail',
                    params: { id: plants[onSaleIndex].id },
                  }"
                >
                  <img
                    class="w-full h-full object-contain"
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
export default {
  name: "HomeView",
  components: {
    HeaderMain,
    SunAndMoon,
    PlantsSlider,
  },
  setup(props, { emit }) {
    const onSaleIndex = 2;
    const salePercent = 30;
    const saleTime = "05-10 Oct";
    // user data
    const { getUser } = useUser();
    const { userData } = getUser();
    const userName = ref(null);

    // display time - icon
    const time = ref("");
    const icon = ref("");
    const date = new Date();
    const hour = date.getHours();
    // display user name
    if (userData.value) {
      const splitName = userData.value.displayName.split(" ");
      userName.value = splitName
        .slice(splitName.length - 2, splitName.length)
        .join(" ");
    }

    const searchValue = ref("");
    const isSearching = ref(false);
    const plants = reactive(PLANTS);

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
</style>
