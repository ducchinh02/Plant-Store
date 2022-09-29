import { ref } from "vue";
import { auth } from "@/configs/firebase";

const userData = ref(auth.currentUser);
const CART = ref(null);
const WISHLIST = ref(null);

auth.onAuthStateChanged(function (user) {
  if (user) {
    userData.value = user;
    CART.value = JSON.parse(
      localStorage.getItem("cart-" + userData.value.uid) || "[]"
    );
    WISHLIST.value = JSON.parse(
      localStorage.getItem("wishlist-plants-" + userData.value.uid) || "[]"
    );
  }
});

function getCart() {
  return { CART, WISHLIST };
}

export function useCart() {
  return { getCart };
}
