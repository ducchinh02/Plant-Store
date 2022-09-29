<template>
  <swiper
    grab-cursor
    :slides-per-view="1.5"
    :loop="true"
    :space-between="35"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: true,
      pauseOnMouseEnter: true,
      stopOnLastSlide: false,
    }"
    :modules="modules"
    :breakpoints="{
      '480': {
        slidesPerView: 1.5,
      },
      '576': {
        slidesPerView: 2,
      },
      '768': {
        slidesPerView: 2.5,
        spaceBetween: 50,
      },
      '991': {
        slidesPerView: 3,
      },
      '1024': {
        slidesPerView: 3.5,
      },
      '1191': {
        slidesPerView: 4,
      },
    }"
  >
    <swiper-slide class="slide-item" v-for="item in array" :key="item.id">
      <product-item :plant="item" />
    </swiper-slide>
  </swiper>
</template>

<script>
import ProductItem from "./ProductItem.vue";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/scss";
export default {
  components: {
    Swiper,
    SwiperSlide,
    ProductItem,
  },
  props: {
    array: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
  setup(props, { emit }) {
    const onSwiper = () => {};
    const onSlideChange = () => {};
    const addToCart = () => {
      emit("ProductAdded");
    };
    return {
      onSwiper,
      onSlideChange,
      addToCart,
      modules: [Autoplay],
    };
  },
};
</script>

<style lang="scss" scoped>
.swiper {
  .swiper-slide {
    // transform: scale(0.8);
    // -webkit-transform: scale(0.8);
    // transition: all 0.3s ease;
    // -webkit-transition: all 0.3s ease;
    // opacity: 0.7;
    // transform-origin: left;
    // @media screen and (min-width: 768px) {
    //   & {
    //     transform: scale(1);
    //     opacity: 1;
    //   }
    // }
  }
  .swiper-slide-active {
    transform: scale(1);
    -webkit-transform: scale(1);
    opacity: 1;
  }
}
</style>
