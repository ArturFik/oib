<template>
  <div class="header">
    <NuxtImg src="/svg/logo.svg" alt="logo" class="header__logo" />
    <nav class="header__routs">
      <a href="/">Главная</a>
      <a href="/list">Программы</a>
    </nav>
    <nav class="header__auth" v-if="isAuthenticated">
      <a href="#">{{ userName || 'Пользователь' }}</a>
      <div class="header__auth--ico" @click="handleLogout">
        <NuxtImg src="/svg/auth.svg" alt="auth" />
      </div>
    </nav>
    <nav class="header__auth" v-else>
      <NuxtLink to="/auth">Войти</NuxtLink>
      <div class="header__auth--ico">
        <NuxtImg src="/svg/auth.svg" alt="auth" />
      </div>
    </nav>
  </div>
</template>

<script setup>
import { useCoreAuthStore } from "~/stores/auth";
import { useUserStore } from "~/stores/user";
import { CORE } from "~/configs/routes/core";
import { AUTH } from "~/configs/routes/auth";

const authStore = useCoreAuthStore();
const userStore = useUserStore();

const isAuthenticated = computed(() => !!authStore.getToken);
const userName = computed(() => userStore.userName || 'Пользователь');

const handleLogout = () => {
  navigateTo(`/${AUTH.LOGOUT}`);
};
</script>

<style lang="scss" scoped>
.header {
  padding: 0px 5%;
  max-width: 1234px;
  margin-top: 40px;
  margin-bottom: 40px;
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: auto;
  margin-right: auto;
  &__logo {
    width: 400px;
  }
  &__routs {
    display: flex;
    gap: 70px;
    > a {
      text-decoration: none;
      transition: all 0.1s ease;
      color: #000;
      &:hover {
        transform: scaleX(1.05);
      }
    }
  }
  &__auth {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 9999px;
    border: 1px solid #000;
    padding: 5px 5px 5px 20px;
    > a {
      text-decoration: none;
      transition: all 0.1s ease;
      color: #000;
      &:hover {
        transform: scaleX(1.05);
      }
    }
    &--ico {
      background-color: #93e42b;
      border-radius: 9999px;
      padding: 5px;
      width: 25px;
      height: 25px;
      margin-left: 20px;
      align-items: center;
      display: flex;
      > img {
        width: 20px;
        margin-left: auto;
        margin-right: auto;
      }
    }
  }
}
</style>
