<template>
  <div class="program">
    <div class="program__view">
      <div class="view">
        <img src="/svg/photo6.svg" alt="photo" />
        <div class="auth-container">
          <div v-if="!isForgotPasswordFlow" class="auth-tabs">
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

          <div v-else class="password-reset-header">
            <h2>Сброс пароля</h2>
          </div>

          <div
            v-if="activeTab === 'register' && !isForgotPasswordFlow"
            class="auth-form"
          >
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

          <div
            v-else-if="activeTab === 'login' && !isForgotPasswordFlow"
            class="auth-form"
          >
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgramComponent",
  data() {
    return {
      activeTab: "register",
      isForgotPasswordFlow: false,
      passwordResetStep: 1,
      registerData: {
        username: "",
        email: "",
        password: "",
      },
      loginData: {
        identifier: "",
        password: "",
      },
      passwordResetData: {
        email: "",
        code: "",
        newPassword: "",
        confirmPassword: "",
      },
    };
  },

  methods: {
    goToProgram(url) {
      this.$router.push(`/${url}`);
    },
    register() {
      console.log("Регистрация:", this.registerData);
    },
    login() {
      console.log("Вход:", this.loginData);
    },
    startPasswordReset() {
      this.isForgotPasswordFlow = true;
      this.passwordResetStep = 1;
      this.passwordResetData = {
        email: "",
        code: "",
        newPassword: "",
        confirmPassword: "",
      };
    },
    sendResetCode() {
      if (!this.passwordResetData.email) {
        alert("Пожалуйста, введите вашу почту");
        return;
      }
      console.log("Отправка кода на:", this.passwordResetData.email);
      this.passwordResetStep = 2;
    },
    verifyResetCode() {
      if (
        !this.passwordResetData.code ||
        this.passwordResetData.code.length !== 4
      ) {
        alert("Пожалуйста, введите 4-значный код");
        return;
      }
      console.log("Проверка кода:", this.passwordResetData.code);
      this.passwordResetStep = 3;
    },
    resetPassword() {
      if (
        !this.passwordResetData.newPassword ||
        !this.passwordResetData.confirmPassword
      ) {
        alert("Пожалуйста, заполните оба поля пароля");
        return;
      }
      if (
        this.passwordResetData.newPassword !==
        this.passwordResetData.confirmPassword
      ) {
        alert("Пароли не совпадают");
        return;
      }
      console.log("Смена пароля для:", this.passwordResetData.email);
      this.isForgotPasswordFlow = false;
      this.passwordResetStep = 1;
      this.activeTab = "login";
      alert("Пароль успешно изменен! Теперь вы можете войти.");
    },
    goBack() {
      if (this.passwordResetStep > 1) {
        this.passwordResetStep--;
      } else {
        this.isForgotPasswordFlow = false;
        this.activeTab = "login";
      }
    },
  },
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

.auth-container {
  max-width: 1234px;
  margin-right: auto;
  margin-left: auto;
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

.password-reset-header {
  text-align: left;
  margin-bottom: 30px;
  margin-left: 10%;
  > h2 {
    font-size: 24px;
    font-weight: 900;
    color: #333;
    margin-bottom: 10px;
  }

  > p {
    font-size: 14px;
    color: #666;
    margin: 0;
  }
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
