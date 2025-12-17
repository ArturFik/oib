import AUTH from "~/configs/routes/auth";
import { CORE } from "~/configs/routes/core";
import { useCoreAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const { KEY } = useRuntimeConfig().public;
  const AUTH_TOKEN = useCookie(KEY);
  const router = useRouter();

  if (to.name === AUTH.LOGOUT) {
    AUTH_TOKEN.value = null;
    useCoreAuthStore().setTokens(AUTH_TOKEN.value);
    return;
  }

  if (import.meta.server) {
    useCoreAuthStore().setTokens(AUTH_TOKEN.value);
  }

  const isAuthenticated = !!AUTH_TOKEN.value || !!useCoreAuthStore().getToken;

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
