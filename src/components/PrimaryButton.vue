<template>
  <button
    :type="type"
    class="primary-button block font-bold py-4 bg-green text-white rounded-[50px] text-center"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: "button",
      validator(value) {
        return ["submit", "reset", "button"].includes(value);
      },
    },
  },
};
</script>

<style></style>
