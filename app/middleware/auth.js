import { AUTH } from "~/configs/routes/auth";
import { CORE } from "~/configs/routes/core";
import { useCoreAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useCoreAuthStore();
  const router = useRouter();

  if (to.name === AUTH.LOGOUT) {
    authStore.clearTokens();
    return;
  }

  const isAuthenticated = !!authStore.getToken;

  if (
    (to.name === AUTH.SIGN_IN || to.name === AUTH.SIGN_UP) &&
    isAuthenticated
  ) {
    router.push(CORE.ROOT);
    console.log(CORE.ROOT);
    return;
  }

  /* if (to.name.includes(ROOT)) {
    if (isAuthenticated && to.name !== AUTH.ROOT) {
      console.log("3");
    }
  } */

  return true;
});
