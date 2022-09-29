import { ref } from "vue";
import { auth } from "@/configs/firebase";

const error = ref(null);
const isPending = ref(null);

const signIn = async (email, password) => {
  isPending.value = true;
  error.value = null;
  try {
    const response = await auth.signInWithEmailAndPassword(email, password);
    return response;
  } catch (err) {
    error.value = err.message;
  } finally {
    isPending.value = false;
  }
};
export const useSignIn = () => {
  return { signIn, error, isPending };
};
