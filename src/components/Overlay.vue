<template>
  <div class="fixed inset-0 overlay z-[999998]"></div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.overlay {
  background: transparentize($color: $main_black, $amount: 0.5);
}
</style>
