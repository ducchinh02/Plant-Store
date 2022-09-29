<template>
  <div
    class="input-group transition-all relative duration-300 border-[2px] flex gap-3 p-[18px] rounded-[5px] bg-[#F0F0F0]"
    :class="{
      active: isFocus,
      borderError: error,
      'border-transparent': !isFocus && !error,
    }"
  >
    <label :for="id" class="flex justify-center items-center">
      <slot />
    </label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="flex-1 bg-transparent font-bold text-green w-full"
      @focus="inputFocus"
      @blur="checkInputValue(modelValue)"
    />
    <slot name="custom" />
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    id: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
      default: "text",
      validator(value) {
        return [
          "text",
          "email",
          "password",
          "checkbox",
          "radio",
          "number",
          "file",
          "date",
          "range",
          "color",
          "button",
          "hidden",
          "image",
          "reset",
        ].includes(value);
      },
    },
    placeholder: {
      type: String,
      required: false,
    },
    modelValue: {
      type: String,
      required: false,
    },
  },
  setup() {
    const isFocus = ref(false);
    const error = ref(false);
    const inputFocus = () => {
      isFocus.value = true;
      error.value = false;
    };
    const checkInputValue = (value) => {
      isFocus.value = false;
      if (!value) {
        error.value = true;
      } else error.value = false;
    };
    return { isFocus, checkInputValue, error, inputFocus };
  },
};
</script>

<style lang="scss" scoped>
.input-group {
  border-color: transparent;
  input {
    &::placeholder {
      @apply font-normal;
    }
  }
  &.active {
    @apply border-green;
    input {
      &::placeholder {
        color: $text_gray_bold !important;
      }
    }
  }
  &.borderError {
    border-color: $error !important;
    input {
      &::placeholder {
        @apply text-error;
      }
    }
  }
}
</style>
