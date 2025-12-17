<template>
  <div>
    <Auth />
  </div>
</template>

<script setup>
import Auth from "@/components/Auth/Auth.vue";
definePageMeta({
  layout: "auth",
  middleware: ["auth"],
});
</script>
