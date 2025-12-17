<template>
  <div class="body_page">
    <div class="body_content">
      <MainHeader />
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import MainHeader from "~/components/Layout/MainHeader.vue";
import Footer from "~/components/Layout/Footer.vue";
</script>
