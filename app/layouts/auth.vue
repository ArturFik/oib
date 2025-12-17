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
import Footer from "~/components/Layout/Footer.vue";
import Header from "~/components/Layout/Header.vue";
</script>
