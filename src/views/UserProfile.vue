<template>
  <div
    class="profile custom-scroll pb-[60px] md:flex-1 md:w-max md:h-screen md:overflow-auto"
  >
    <transition name="hide-toast">
      <toast-notification v-if="showToast" :toastContent="errorFile" />
    </transition>
    <div class="container md:h-full px-[30px] pt-[30px] mx-auto">
      <div class="grid grid-cols-1 pt-5">
        <div class="user-data text-center">
          <label
            for="uploadFile"
            class="user-avatar cursor-pointer relative block animate-slide-bottom opacity-0"
          >
            <user-avatar class="w-24 h-24 mx-auto pointer-events-none" />
            <input
              type="file"
              id="uploadFile"
              class="absolute w-0 h-0 opacity-0"
              @change="onUploadFile"
            />
          </label>
          <div class="pt-5">
            <form
              @submit.prevent="changeName"
              class="relative flex items-center justify-center gap-2"
            >
              <input
                v-if="editName"
                class="capitalize w-auto text-center font-bold text-2xl"
                id="username"
                type="text"
                placeholder="your name..."
                @input="onInput"
                v-model="userName"
                @blur="editName = false"
              />
              <h1
                v-else
                class="capitalize text-center font-bold text-2xl animate-slide-bottom opacity-0 animate-delay-200 translate-y-full w-max"
              >
                {{ userData.displayName }}
              </h1>
              <label
                @click="changeType"
                for="username"
                class="icon flex cursor-pointer items-center text-2xl"
                ><i class="bx bx-edit-alt"></i
              ></label>
            </form>
          </div>
          <p
            class="pt-1 text-text_gray animate-slide-bottom opacity-0 animate-delay-200 translate-y-full"
          >
            {{ userData.email }}
          </p>
        </div>
        <!-- menu -->
        <div class="user-menu pt-14">
          <ul class="menu flex items-center justify-center gap-[60px]">
            <li
              class="menu-item animate-slide-bottom opacity-0 animate-delay-200 translate-y-full"
              v-for="menu in userMenu"
              :key="menu.route"
            >
              <router-link
                :to="{ name: menu.route, params: {} }"
                class="menu-link font-normal"
              >
                <i
                  :class="menu.icon"
                  class="flex justify-center transition-all duration-300 items-center text-3xl text-main_black opacity-75"
                ></i>
                <span
                  class="capitalize transition-all duration-300 font-normal pt-2"
                >
                  {{ menu.name }}
                </span>
              </router-link>
            </li>
            <li
              class="animate-slide-bottom opacity-0 animate-delay-200 translate-y-full"
            >
              <div @click="showModalLogout" class="cursor-pointer text-error">
                <i
                  class="bx bx-log-out text-3xl flex justify-center items-center"
                ></i
                ><span class="capitalize font-normal pt-2"> Logout </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- modal -->
    <transition name="slide-bottom">
      <modal-bottom v-if="showModal">
        <div class="text-error">Logout</div>
        <template v-slot:actions>
          <div
            class="grid grid-cols-1 gap-[30px] mt-[28px] py-7 border-b border-t border-slate-300"
          >
            <div class="text-center font-bold text-xl">
              Are you sure you want to log out?
            </div>
            <div class="btn-actions grid grid-cols-2 gap-[15px]">
              <primary-button
                type="button"
                class="cancel-logout"
                @click="showModal = false"
              >
                Cancel
              </primary-button>
              <primary-button
                type="button"
                class="capitalize"
                @click="onLogout"
              >
                Yes, Logout
              </primary-button>
            </div>
          </div>
        </template>
      </modal-bottom>
    </transition>
    <!-- overlay -->
    <transition name="fade">
      <overlay @click="showModal = false" v-if="showModal" />
    </transition>
  </div>
</template>

<script>
import { useUser } from "@/composable/userData";
import UserAvatar from "@/components/Icons/UserAvatar.vue";
import { reactive, ref } from "vue";
import ToastNotification from "@/components/ToastNotification.vue";
import { profileMenu } from "@/data";
import ModalBottom from "@/components/ModalBottom.vue";
import Overlay from "@/components/Overlay.vue";
import { useRouter } from "vue-router";
import PrimaryButton from "@/components/PrimaryButton.vue";
export default {
  components: {
    UserAvatar,
    ToastNotification,
    ModalBottom,
    Overlay,
    PrimaryButton,
  },
  setup() {
    const { getUser } = useUser();
    const { userData } = getUser();
    const showToast = ref(false);
    const userName = ref("");
    const editName = ref(false);
    const userMenu = reactive(profileMenu);

    const changeName = async () => {
      await userData.value.updateProfile({
        displayName: userName.value.trim(),
      });
      userName.value = "";
      editName.value = false;
    };

    const changeType = () => {
      editName.value = true;
      userName.value = userData.value.displayName;
    };

    // logout
    const router = useRouter();
    const showModal = ref(false);

    const showModalLogout = () => {
      showModal.value = true;
    };

    const onLogout = () => {
      router.push({ name: "logout", params: {} });
    };
    // upload file
    const file = ref(null);
    const errorFile = ref(null);
    const onUploadFile = (e) => {
      const selected = e.target.files[0];
      const fileType = ["image/jpg", "image/png", "image/jpeg"];
      if (selected && fileType.includes(selected.type)) {
        file.value = selected;
        errorFile.value = null;
      } else {
        file.value = null;
        showToast.value = true;
        errorFile.value = "Can't upload this file.";
        setTimeout(() => {
          showToast.value = false;
        }, 2000);
      }
    };

    console.log(userData.value);

    return {
      userData,
      onUploadFile,
      errorFile,
      showToast,
      changeName,
      userName,
      editName,
      changeType,
      userMenu,
      showModal,
      showModalLogout,
      onLogout,
    };
  },
};
</script>

<style lang="scss" scoped>
.user-menu {
  a:hover {
    i,
    span {
      color: $green;
    }
  }
}

.hide-toast-leave-active {
  animation: hideToast 0.5s ease-in-out;
  -webkit-animation: hideToast 0.5s ease-in-out;
}
@keyframes hideToast {
  from {
    transform: translateX(0);
    -webkit-transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    -webkit-transform: translateX(100%);
    opacity: 0;
  }
}
.modal-bottom {
  .btn-actions {
    .cancel-logout {
      color: $green !important;
      background: #e6f8ef !important ;
    }
  }
}
.fade-enter-active {
  animation: fade 0.5s ease-in-out;
  -webkit-animation: fade 0.5s ease-in-out;
}
.fade-leave-active {
  animation: fade 0.5s ease-in-out reverse;
  -webkit-animation: fade 0.5s ease-in-out reverse;
}
@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.slide-bottom-enter-active {
  animation: slideBottom 0.4s ease-in-out;
  -webkit-animation: slideBottom 0.4s ease-in-out;
}
@keyframes slideBottom {
  0% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
.slide-bottom-leave-active {
  animation: slideBottom 0.4s ease-in-out reverse;
  -webkit-animation: slideBottom 0.4s ease-in-out reverse;
}
</style>
