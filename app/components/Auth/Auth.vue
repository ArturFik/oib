<template>
  <div class="program">
    <div class="program__view">
      <div class="view">
        <img src="/svg/photo6.svg" alt="photo" />
        <div class="auth-wrapper">
          <div class="auth-tabs">
            <h1
              :class="{ active: activeTab === 'register' }"
              @click="activeTab = 'register'"
            >
              РЕГИСТРАЦИЯ
            </h1>
            <h1
              :class="{ active: activeTab === 'login' }"
              @click="activeTab = 'login'"
            >
              ВХОД
            </h1>
          </div>

          <SignUp 
            v-if="activeTab === 'register'" 
            @register="handleRegister" 
          />
          <SignIn 
            v-else 
            @login="handleLogin" 
            @password-reset="handlePasswordReset" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SignUp from "@/components/Auth/SignUp.vue";
import SignIn from "@/components/Auth/SignIn.vue";

const activeTab = ref("register");

const handleRegister = (data) => {
  console.log("Зарегистрирован пользователь:", data);
  // Отправить данные на сервер
};

const handleLogin = (data) => {
  console.log("Вошел пользователь:", data);
  // Отправить данные на сервер
};

const handlePasswordReset = (data) => {
  console.log("Пароль изменен для:", data.email);
  // Отправить данные на сервер
};
</script>

<style lang="scss" scoped>
.program {
  background-color: #736bff;
  margin: 0;
  border-radius: 50px;
  margin-bottom: 50px;
  padding: 50px 0;

  &__view {
    border-radius: 50px;
    margin-bottom: 20px;
  }
}

.view {
  background-color: #fff;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 47px;
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 1234px;

  > img {
    width: 40%;
  }
}

.auth-wrapper {
  width: 100%;
  margin-top: 50px;
  margin-bottom: auto;
}

.auth-tabs {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 80%;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 30px;
  background-color: #7676801f;
  border: 2px solid #736bff;
  border-radius: 9999px;

  > h1 {
    font-size: 14px;
    font-weight: 400;
    border-radius: 9999px;
    padding: 0;
    margin: 0;
    width: 50%;
    text-align: center;
    padding: 10px 15px;
    cursor: pointer;
    transition: all 0.3s ease;

    &.active {
      background-color: #736bff;
      color: white;
    }

    &:not(.active):hover {
      background-color: #f0f0f0;
    }
  }
}
</style>
