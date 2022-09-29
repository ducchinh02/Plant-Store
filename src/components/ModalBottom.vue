<template>
  <div
    class="modal-bottom pt-[40px] px-[20px] bg-white rounded-tl-[30px] rounded-tr-[30px] fixed bottom-0 left-0 w-full z-[999999]"
  >
    <div class="text-center text-2xl font-bold capitalize">
      <span v-if="plant"> Remove from cart? </span>
      <slot />
    </div>
    <slot name="actions" />
    <div
      v-if="plant"
      class="grid md:grid-cols-2 grid-cols-1 gap-[30px] mt-[28px] py-7 border-b border-t border-slate-300"
    >
      <cart-item :hideActions="true" :plant="plant" />
      <div class="btn-actions grid md:grid-cols-1 grid-cols-2 gap-[15px]">
        <primary-button
          type="button"
          class="cancel-remove"
          @click="$emit('cancelRemove')"
        >
          Cancel
        </primary-button>
        <primary-button
          type="button"
          class="capitalize"
          @click="$emit('remove-item', plant)"
        >
          Yes, remove
        </primary-button>
      </div>
    </div>
    <div class="text-center font-bold text-xs py-[10px] text-green">
      ©XXDCII
    </div>
  </div>
</template>

<script>
import CartItem from "./CartItem.vue";
import PrimaryButton from "./PrimaryButton.vue";
export default {
  components: { CartItem, PrimaryButton },
  props: {
    plant: {
      type: Object,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-bottom {
  .btn-actions {
    .cancel-remove {
      color: $green !important;
      background: #e6f8ef !important ;
    }
  }
}
</style>
