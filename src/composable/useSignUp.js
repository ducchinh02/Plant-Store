import { ref } from "vue";
import { auth } from "@/configs/firebase";

const error = ref(null);
const isPending = ref(false);

const signUp = async (email, password, fullName) => {
  isPending.value = true;
  error.value = null;
  try {
    const response = await auth.createUserWithEmailAndPassword(email, password);
    if (!response) throw new Error("Something went wrong...");
    // update name
    await response.user.updateProfile({ displayName: fullName });
    // return response
    return response;
  } catch (err) {
    error.value = err.message;
  } finally {
    isPending.value = false;
  }
};

export const useSignUp = () => {
  return { isPending, error, signUp };
};
