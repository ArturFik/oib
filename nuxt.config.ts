// https://nuxt.com/docs/api/configuration/nuxt-config
const MAIN_API_URL = process.env.MAIN_API_URL;

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["@nuxt/image"],
  runtimeConfig: {
    public: {
      KEY: "skeptik-Auth",
      MAIN_API_URL,
    },
  },
});
