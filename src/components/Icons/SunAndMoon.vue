<template>
  <div class="icon">
    <img :src="src" alt="Icon" />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: false,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped></style>
