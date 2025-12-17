<template>
  <div class="body_page">
    <div class="body_content">
      <AuthHeader />
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Footer from "~/components/Layout/Footer.vue";
import AuthHeader from "~/components/Layout/AuthHeader.vue";
</script>
