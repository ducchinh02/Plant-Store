<template>
  <h1></h1>
</template>

<script>
import { useSignOut } from "@/composable/useLogout";
import { useRouter } from "vue-router";
export default {
  setup() {
    const { error, signOut } = useSignOut();
    const router = useRouter();
    const onSignOut = async () => {
      await signOut();
      if (!error.value) {
        router.push({ name: "login", params: {} });
      }
    };
    onSignOut();
  },
};
</script>

<style></style>
