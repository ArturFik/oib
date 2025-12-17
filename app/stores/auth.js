import { defineStore, acceptHMRUpdate } from "pinia";

export const useCoreAuthStore = defineStore("auth", () => {
  const { KEY } = useRuntimeConfig().public;
  const sign = useCookie(KEY, { httpOnly: true });

  const getToken = computed(() => sign.value);

  const clearTokens = () => {
    sign.value = null;
  };

  const setTokens = async (payload) => {
    sign.value = payload;
  };

  return {
    sign,
    getToken,
    clearTokens,
    setTokens,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCoreAuthStore, import.meta.hot));
}
