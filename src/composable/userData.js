import { ref } from "vue";
import { auth } from "@/configs/firebase";

const userData = ref(auth.currentUser);

auth.onAuthStateChanged(function (user) {
  if (user) {
    userData.value = user;
  }
});

function getUser() {
  return { userData };
}

export function useUser() {
  return { getUser };
}
