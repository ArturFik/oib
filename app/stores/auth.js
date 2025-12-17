import { defineStore, acceptHMRUpdate } from "pinia";

export const useCoreAuthStore = defineStore("auth", () => {
  // Initialize token from localStorage if it exists
  const token = ref(null);

  // Initialize token on client side
  const initializeToken = () => {
    if (process.client) {
      const storedToken = localStorage.getItem('access_token');
      if (storedToken) {
        token.value = storedToken;
      }
    }
  };

  // Initialize on mount
  onMounted(() => {
    initializeToken();
  });

  const getToken = computed(() => token.value);

  const clearTokens = () => {
    token.value = null;
    if (process.client) {
      localStorage.removeItem('access_token');
    }
  };

  const setTokens = async (payload) => {
    token.value = payload;
    if (process.client) {
      if (payload) {
        localStorage.setItem('access_token', payload);
      } else {
        localStorage.removeItem('access_token');
      }
    }
  };

  return {
    token,
    getToken,
    clearTokens,
    setTokens,
    initializeToken,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCoreAuthStore, import.meta.hot));
}
