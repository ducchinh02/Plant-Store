<template>
  <div class="home">
    <transition appear @before-enter="beforeEnter" @enter="enter">
      <h1 class="text-3xl">Home view</h1>
    </transition>
    <p class="text-2xl text-red-500">Red</p>
  </div>
</template>

<script>
// @ is an alias to /src
import { gsap } from "gsap";
export default {
  components: {},
  setup() {
    console.log(gsap);
    const beforeEnter = (el) => {
      console.log("Before enter");
      // el.style.color = "red";
      el.style.opacity = 0;
      el.style.transition = "all .3s ease";
    };

    const enter = (el) => {
      console.log("Enter");
      // el.style.color = "blue";
      el.style.opacity = 1;
    };

    return { beforeEnter, enter };
  },
};
</script>

<style lang="scss" scoped>
h1 {
  // color: $blue;
  @include font-bold;
}
p {
  color: $bg_green;
}
</style>
