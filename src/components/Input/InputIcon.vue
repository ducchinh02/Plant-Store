<template>
  <div class="icon w-6">
    <img :src="src" :alt="alt" />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: false,
    },
    alt: {
      type: String,
      required: false,
    },
  },
};
</script>

<style></style>
