<template>
  <component
    :is="comp"
    class="cart-item flex px-[20px] py-[15px] rounded-3xl gap-[10px] border-[3px] border-slate-100"
    :class="{ 'gap-[20px]': hideActions }"
  >
    <div
      class="cart-item-image flex items-center justify-center rounded-[inherit] bg-slate-50 w-[90px] h-[90px]"
    >
      <router-link
        :to="{ name: 'plant-detail', params: { id: plant.id } }"
        class="w-full h-full flex items-center"
      >
        <img
          :src="plant.image"
          :alt="plant.name"
          class="object-contain h-4/5 w-full"
        />
      </router-link>
    </div>
    <div class="cart-item-info flex-1 flex capitalize flex-col justify-between">
      <div class="cart-item-name font-bold text-base pb-1">
        {{ plant.name }}
      </div>
      <div
        class="cart-item-price text-base text-green font-bold"
        :class="{ 'pb-2': hideActions }"
      >
        ${{ plant.price * plant.quantity }}
      </div>
      <div
        class="control-quantity font-bold flex w-max gap-[20px] bg-[#F8F8F8] text-green py-1 px-4 rounded-2xl"
        :class="{ 'gap-[5px]': hideActions }"
      >
        <div
          v-if="!hideActions"
          class="desc-quantity cursor-pointer select-none"
          @click="$emit('desc-quantity', plant)"
        >
          -
        </div>
        <div v-if="hideActions" class="flex-1">Quantity :</div>
        <div class="quantity">{{ plant.quantity }}</div>
        <div
          v-if="!hideActions"
          class="incr-quantity cursor-pointer select-none"
          @click="$emit('incr-quantity', plant)"
        >
          +
        </div>
      </div>
    </div>
    <div
      v-if="!hideActions"
      class="remove-item flex cursor-pointer transition-all duration-300 text-2xl items-end select-none"
      @click="$emit('active-remove', plant)"
    >
      <i class="bx bx-trash-alt"></i>
    </div>
  </component>
</template>

<script>
export default {
  props: {
    comp: {
      type: String,
      required: false,
      default: "div",
      validator(value) {
        return [
          "div",
          "p",
          "h1",
          "h2",
          "h3",
          "h4",
          "h4",
          "h5",
          "section",
          "span",
          "input",
          "textarea",
          "header",
          "footer",
          "ul",
          "li",
          "ol",
        ].includes(value);
      },
    },
    plant: {
      type: Object,
      required: true,
    },
    hideActions: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup() {},
};
</script>

<style lang="scss" scoped>
.cart-item {
  .remove-item:hover {
    @apply text-error;
  }
}
</style>
