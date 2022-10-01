<template>
  <router-link :to="{ name: 'profile', params: {} }" class="flex">
    <div class="user-avatar w-100 h-100 overflow-hidden rounded-full">
      <img
        :src="imageURL"
        alt="User avatar"
        class="object-cover w-full h-full"
      />
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    imageURL: {
      type: String,
      required: false,
      default: require("@/assets/images/Indoor.svg"),
    },
  },
};
</script>

<style></style>
