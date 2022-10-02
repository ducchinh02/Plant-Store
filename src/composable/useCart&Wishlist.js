import { ref } from "vue";
import { auth } from "@/configs/firebase";

const userData = ref(auth.currentUser);
const CART = ref(null);
const WISHLIST = ref(null);
const USER_ADDRESS = ref(null);

auth.onAuthStateChanged(function (user) {
  if (user) {
    userData.value = user;
    CART.value = JSON.parse(
      localStorage.getItem("cart-" + userData.value.uid) || "[]"
    );
    WISHLIST.value = JSON.parse(
      localStorage.getItem("wishlist-plants-" + userData.value.uid) || "[]"
    );
    USER_ADDRESS.value = JSON.parse(
      localStorage.getItem("user-address-" + userData.value.uid) || "[]"
    );
  }
});

function getCart() {
  return { CART, WISHLIST, USER_ADDRESS };
}

export function useCart() {
  return { getCart };
}
