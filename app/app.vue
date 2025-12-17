<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useCoreAuthStore } from "~/stores/auth";
import { useUserStore } from "~/stores/user";
import useAuth from "~/hooks/auth";

// Initialize auth state
const authStore = useCoreAuthStore();
const userStore = useUserStore();
const { FetchUser } = useAuth();

// On app startup, check if user is authenticated and fetch user data
onMounted(async () => {
  if (authStore.getToken) {
    try {
      await FetchUser();
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  }
});
</script>

<style lang="scss">
body {
  background-color: #f5f5f5;

  margin: 0px;
  color: black;
  font-family: "Inter", sans-serif;
}
</style>
