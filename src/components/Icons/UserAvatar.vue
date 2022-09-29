<template>
  <router-link to="" class="flex">
    <div class="user-avatar w-12 h-12 overflow-hidden rounded-full">
      <img
        :src="userAvatar"
        v-if="userAvatar"
        alt=""
        class="object-cover h-full"
      />
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    userAvatar: {
      type: String,
      required: false,
      default: require("@/assets/images/Indoor.svg"),
    },
  },
};
</script>

<style></style>
