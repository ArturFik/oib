import { AUTH } from "~/configs/routes/auth";
import { CORE } from "~/configs/routes/core";
import { useCoreAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const { KEY } = useRuntimeConfig().public;
  const AUTH_TOKEN = useCookie(KEY);
  const authStore = useCoreAuthStore();
  const router = useRouter();

  // Sync cookie with store
  if (AUTH_TOKEN.value && !authStore.getToken) {
    authStore.setTokens(AUTH_TOKEN.value);
  }

  if (to.name === AUTH.LOGOUT) {
    AUTH_TOKEN.value = null;
    authStore.setTokens(null);
    return;
  }

  if (import.meta.server) {
    authStore.setTokens(AUTH_TOKEN.value);
  }

  const isAuthenticated = !!AUTH_TOKEN.value || !!authStore.getToken;

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
