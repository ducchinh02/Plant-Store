<template>
  <div
    class="toast flex items-center gap-2 max-w-fit fixed top-10 right-[30px] z-[9999] overflow-hidden transition-all duration-300 px-4 py-3 text-white font-medium rounded-xl leading-none"
    :class="{ 'bg-greenLight': !toastContent, 'bg-error': toastContent }"
  >
    <div class="icon text-2xl flex items-center">
      <ion-icon
        :name="
          (toastContent ? 'alert-circle-' : 'checkmark-circle-') + 'outline'
        "
      ></ion-icon>
    </div>
    <span class="flex-1 inline-block leading-[20px]"
      >{{ toastContent ? toastContent : "Successfully" }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    toastContent: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.toast {
  width: calc(100% - 60px);
  transform: translateX(100%);
  -webkit-transform: translateX(100%);
  opacity: 0;
  animation: appear 0.5s ease-in-out forwards;
  -webkit-animation: appear 0.5s ease-in-out forwards;
}

@keyframes appear {
  from {
    transform: translateX(100%);
    -webkit-transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    -webkit-transform: tr1nslateX(0);
    opacity: 1;
  }
}
</style>
