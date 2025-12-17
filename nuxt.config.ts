// https://nuxt.com/docs/api/configuration/nuxt-config
const MAIN_API_URL = process.env.MAIN_API_URL;

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: [
    "@nuxt/image",
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    public: {
      KEY: "access_token",
      MAIN_API_URL,
    },
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
});
