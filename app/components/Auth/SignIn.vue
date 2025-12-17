<template>
  <div class="auth-container">
    <div v-if="!isForgotPasswordFlow" class="auth-form">
      <input
        type="text"
        placeholder="Почта или имя пользователя"
        v-model="loginData.identifier"
      />
      <input
        type="password"
        placeholder="Пароль"
        v-model="loginData.password"
      />
      <div class="forgot-password" @click.prevent="startPasswordReset">
        Забыли пароль?
      </div>
      <a href="#" @click.prevent="login">ВОЙТИ</a>
    </div>

    <div v-else-if="passwordResetStep === 1" class="auth-form">
      <input
        type="email"
        placeholder="Почта"
        v-model="passwordResetData.email"
      />
      <a href="#" @click.prevent="sendResetCode">ДАЛЕЕ</a>
    </div>

    <div v-else-if="passwordResetStep === 2" class="auth-form">
      <input
        type="text"
        placeholder="Введите 4-значный код из SMS"
        v-model="passwordResetData.code"
        maxlength="4"
      />
      <a href="#" @click.prevent="verifyResetCode">ДАЛЕЕ</a>
    </div>

    <div v-else-if="passwordResetStep === 3" class="auth-form">
      <input
        type="password"
        placeholder="Новый пароль"
        v-model="passwordResetData.newPassword"
      />
      <input
        type="password"
        placeholder="Повторите пароль"
        v-model="passwordResetData.confirmPassword"
      />
      <a href="#" @click.prevent="resetPassword">СМЕНИТЬ ПАРОЛЬ</a>
    </div>

    <div v-if="isForgotPasswordFlow" class="back-button">
      <a href="#" @click.prevent="goBack">Назад</a>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const emit = defineEmits(["login", "password-reset"]);

const isForgotPasswordFlow = ref(false);
const passwordResetStep = ref(1);

const loginData = reactive({
  identifier: "",
  password: "",
});

const passwordResetData = reactive({
  email: "",
  code: "",
  newPassword: "",
  confirmPassword: "",
});

const login = () => {
  console.log("Вход:", loginData);
  emit("login", loginData);
};

const startPasswordReset = () => {
  isForgotPasswordFlow.value = true;
  passwordResetStep.value = 1;
  passwordResetData.email = "";
  passwordResetData.code = "";
  passwordResetData.newPassword = "";
  passwordResetData.confirmPassword = "";
};

const sendResetCode = () => {
  if (!passwordResetData.email) {
    alert("Пожалуйста, введите вашу почту");
    return;
  }
  console.log("Отправка кода на:", passwordResetData.email);
  passwordResetStep.value = 2;
};

const verifyResetCode = () => {
  if (!passwordResetData.code || passwordResetData.code.length !== 4) {
    alert("Пожалуйста, введите 4-значный код");
    return;
  }
  console.log("Проверка кода:", passwordResetData.code);
  passwordResetStep.value = 3;
};

const resetPassword = () => {
  if (!passwordResetData.newPassword || !passwordResetData.confirmPassword) {
    alert("Пожалуйста, заполните оба поля пароля");
    return;
  }
  if (passwordResetData.newPassword !== passwordResetData.confirmPassword) {
    alert("Пароли не совпадают");
    return;
  }
  console.log("Смена пароля для:", passwordResetData.email);
  emit("password-reset", passwordResetData);
  isForgotPasswordFlow.value = false;
  passwordResetStep.value = 1;
  alert("Пароль успешно изменен! Теперь вы можете войти.");
};

const goBack = () => {
  if (passwordResetStep.value > 1) {
    passwordResetStep.value--;
  } else {
    isForgotPasswordFlow.value = false;
  }
};
</script>

<style lang="scss" scoped>
.auth-container {
  max-width: 1234px;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
}

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

  .forgot-password {
    margin-left: 10%;
    transition: all 0.3s ease;
    cursor: pointer;
    &:hover {
      transform: scaleX(1.01);
    }
  }
}

.back-button {
  text-align: center;
  margin-top: 20px;

  > a {
    color: #736bff;
    text-decoration: none;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
