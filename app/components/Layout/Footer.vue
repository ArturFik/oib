<template>
  <div class="footer">
    <h1>ОСТАЛИСЬ ВОПРОСЫ?</h1>
    <div class="footer__view">
      <h2>пиши нам в телеграм бот<br /><br />@tytbydettgbot</h2>
      <NuxtImg src="/svg/logo.svg" alt="logo" class="footer__logo" />
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.footer {
  padding: 0px 5%;
  max-width: 1234px;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  background-color: #736bff;
  border-top-left-radius: 60px;
  border-top-right-radius: 60px;
  padding: 40px 60px;
  color: white;
  &__view {
    display: flex;
    flex-direction: row;
    align-items: end;
    justify-content: space-between;
    > h2 {
      margin-bottom: 0;
    }
  }
  > h1 {
    font-size: 74px;
  }
  &__logo {
    width: 40%;
  }
}
</style>
