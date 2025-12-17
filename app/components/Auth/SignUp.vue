<template>
  <div class="auth-form">
    <input
      type="text"
      placeholder="Имя пользователя"
      v-model="registerData.username"
    />
    <input
      type="email"
      placeholder="Почта"
      v-model="registerData.email"
    />
    <input
      type="password"
      placeholder="Пароль"
      v-model="registerData.password"
    />
    <a href="#" @click.prevent="register">ЗАРЕГИСТРИРОВАТЬСЯ</a>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const emit = defineEmits(["register"]);

const registerData = reactive({
  username: "",
  email: "",
  password: "",
});

const register = () => {
  console.log("Регистрация:", registerData);
  emit("register", registerData);
  // Очистка формы после отправки
  registerData.username = "";
  registerData.email = "";
  registerData.password = "";
};
</script>

<style lang="scss" scoped>
.auth-form {
  > input {
    border: none;
    border-bottom: 1px solid #a2a2a2;
    width: 80%;
    display: flex;
    margin-right: auto;
    margin-left: auto;
    padding: 10px 20px;
    margin-bottom: 20px;
    font-size: 14px;

    &:focus {
      outline: none;
      border-bottom-color: #736bff;
    }
  }

  > a {
    font-weight: 400;
    font-size: 16px;
    border-radius: 9999px;
    padding: 12px 35px;
    background-color: #93e42b;
    transition: all 0.3s ease;
    display: flex;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    margin-bottom: 10px;
    width: 50%;
    color: #000;
    text-decoration: none;
    border: none;
    cursor: pointer;

    &:hover {
      transform: scaleX(1.05);
      background-color: #83d41b;
    }
  }
}
</style>
