import { ref } from "vue";
import { auth } from "@/configs/firebase";

const error = ref(null);

const signOut = async () => {
  try {
    const response = await auth.signOut();
    return response;
  } catch (err) {
    error.value = err.message;
  }
};

export const useSignOut = () => {
  return { error, signOut };
};
