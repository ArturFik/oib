<template>
  <div class="program">
    <div class="program__view">
      <h1>Пробный курс "Мессенджер"</h1>
      <div class="program__view--window">
        <div class="">
          <div class="view">
            <div class="view__column">
              <h2 class="view__column--h2">приколы</h2>
              <h2 class="view__column--chat">2 участника</h2>
            </div>
            <div class="view__row">
              <img src="/svg/phone.svg" alt="phone" />
              <img src="/svg/search.svg" alt="search" />
              <img src="/svg/dot.svg" alt="dot" />
            </div>
          </div>
          <div class="chat">
            <h2>Сегодня</h2>

            <div class="chat__view">
              <img src="/svg/logochat1.svg" alt="logochat1" class="" />
              <div class="">
                <h2 class="chat__view--text1">Скаммер</h2>
                <h2 class="chat__view--text2">Здарова</h2>
              </div>
            </div>

            <div class="chat__file">
              <img src="/svg/logochat2.svg" alt="logochat1" class="" />
              <div class="">
                <h2 class="chat__file--text1">Галерея.apk</h2>
                <h2 class="chat__file--text2">22 B</h2>
              </div>
            </div>
            <span>Это ты на фотке?</span>
            <div class="chat__view">
              <img src="/svg/logochat3.svg" alt="logochat1" class="" />
              <div class="">
                <h2 class="chat__view--text1">Я</h2>
                <h2 class="chat__view--text2">
                  инпута на ввод не будет, будет выбор ответов (3-4 сообщения на
                  выбор)
                </h2>
              </div>
            </div>
            <div class="chat__button">
              <h2>Вариант 1</h2>
              <h2>Вариант 2</h2>
              <h2>Вариант 3</h2>
              <h2>Вариант 4</h2>
            </div>
          </div>
        </div>
      </div>
      <div class="program__view--button">
        <h2 class="program__view--text1" @click="goToProgram('program')">
          НАЗАД
        </h2>
        <h2 class="program__view--text2" @click="goToProgram('testing')">
          ДАЛЕЕ
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgramComponent",
  methods: {
    goToProgram(url) {
      this.$router.push(`/${url}`);
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
  &__view {
    border-radius: 50px;

    margin-bottom: 20px;
    > h1 {
      font-size: 36px;
      font-weight: 700;
      margin-top: 0;
      padding-top: 0;
      color: #fff;
      max-width: 1234px;
      margin-left: auto;
      margin-right: auto;
      padding: 3% 5%;
    }

    > h2 {
      font-size: 18px;
      font-weight: 300;
    }
    > div {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    &--window {
      background-color: #fff;
      > div {
        max-width: 1234px;
        margin-right: auto;
        margin-left: auto;
        width: 100%;
      }
    }
    &--button {
      max-width: 1234px;
      margin-right: auto;
      margin-left: auto;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 3% 5%;
    }
    &--text1 {
      padding: 20px 40px;
      background-color: #ffffff;
      border-radius: 9999px;
      font-size: 18px;
      font-weight: 600;
      transition: all 0.1s ease;
      &:hover {
        transform: scaleX(1.05);
      }
    }
    &--text2 {
      padding: 20px 40px;
      background-color: #93e42b;
      border-radius: 9999px;
      font-size: 18px;
      font-weight: 600;
      transition: all 0.1s ease;
      &:hover {
        transform: scaleX(1.05);
      }
    }
  }
}

.view {
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: space-between;
  border-bottom: 1px solid #777777;
  padding: 30px 0 20px 0;
  &__column {
    text-align: left;
    &--chat {
      font-weight: 500;
      font-size: 20px;
      color: #777777;
    }
  }
  &__row {
    display: flex;
    flex-direction: row;
    align-items: center;
    > img {
      width: 50px;
      transition: all 0.1s ease;
      &:hover {
        transform: scaleX(1.1);
      }
    }
  }
}

.chat {
  > h2 {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    border-radius: 9999px;
    border: 1px solid #777777;
    width: 200px;
  }
  > span {
    color: #000;
    font-size: 20px;
    font-weight: 400;
    margin-left: 120px;
  }
  &__view {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    > img {
      width: 80px;
    }
    &--text1 {
      color: #736bff;
      font-size: 20px;
      font-weight: 600;
    }
    &--text2 {
      color: #000;
      font-size: 20px;
      font-weight: 400;
    }
  }
  &__file {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    margin-left: 120px;
    margin-bottom: 20px;
    > img {
      width: 40px;
      padding: 20px;
      border-radius: 9999px;
      background-color: #736bff;
    }
    &--text1 {
      color: #000;
      font-size: 20px;
      font-weight: 600;
    }
    &--text2 {
      color: #777777;
      font-size: 20px;
      font-weight: 400;
    }
  }
  &__button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    border-top: 1px solid #777777;
    > h2 {
      border: 1px solid #777777;
      padding: 10px 20px;
      border-radius: 20px;
      transition: all 0.1s ease;
      &:hover {
        transform: scaleX(1.05);
      }
    }
  }
}
</style>
