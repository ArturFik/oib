<template>
  <div class="body_page">
    <div class="body_content">
      <Header />
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from "~/components/Layout/Header.vue";
import Footer from "~/components/Layout/Footer.vue";
</script>
