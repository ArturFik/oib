<template>
  <div class="home">
    <div class="home__view">
      <img
        src="/svg/background.svg"
        alt="background"
        class="home__view--background"
      />
      <h1><span>ИНТЕРАКТИВНЫЙ</span><br />КУРС ПО<br />КИБЕРБЕЗОПАСНОСТИ</h1>
      <p>
        Узнайте: как защитить себя в Интернете и все о профессии на практике
      </p>
      <div class="home__view--block">
        <div class="">
          <h2>Формат обучения</h2>
          <h1>Дистанционный</h1>
        </div>
        <div class="">
          <h2>Доступ</h2>
          <h1>1 год</h1>
        </div>
        <div class="">
          <h2>Количество</h2>
          <h1>3 курса</h1>
        </div>
        <div class="">
          <h2>Преимущество курса</h2>
          <h1>Сертифицированный</h1>
        </div>
      </div>
    </div>
    <div class="home__block">
      <div class="home__block--view">
        <div class="">
          <h1>01</h1>
          <img src="/svg/photo.svg" alt="photo" class="home__block--img1" />
          <h2 class="home__block--nash">
            Наша миссия - цифровой щит для каждого!<br /><br />Учим вас бороться
            с фишигом, кражами данных, кибербуллингом. А также сохраняем вашу
            конфиденциальность: не собираем лишних данных о вас
          </h2>
          <h1>ЗАЩИТА</h1>
        </div>
        <div class="">
          <h2 class="home__block--span">Начни свой путь вместе с нами!</h2>
          <NuxtLink to="/auth" class="home__block--button">НАЧАТЬ ОБУЧЕНИЕ</NuxtLink>
        </div>
      </div>
      <div class="home__block--view">
        <div class="home__block--row">
          <div class="">
            <h1>02</h1>

            <h2 class="home__block--int">Интерактивность - <br />наше все!</h2>
            <span>ПРАК-<br />ТИКА</span>
          </div>
          <img src="/svg/photo1.svg" alt="photo1" class="home__block--img2" />
        </div>
        <div>
          <div class="home__block--row">
            <div class="">
              <h1>03</h1>

              <h2 class="home__block--blocktxt">
                Курс подходит для студентов и школьников, офисных сотрудников,
                IT-специалистов, людей в возрасте и родителей
              </h2>
            </div>
            <div class="home__block--blockimg">
              <img
                src="/svg/photo3.svg"
                alt="photo1"
                class="home__block--img4"
              />
              <img
                src="/svg/photo4.svg"
                alt="photo1"
                class="home__block--img4"
              />
            </div>
          </div>
          <span class="home__block--audi"
            >АУДИ-<br />&nbsp;&nbsp;&nbsp;&nbsp;ТОРИЯ</span
          >
        </div>
      </div>
      <div class="home__block--view">
        <div class="">
          <h1>04</h1>
          <img src="/svg/photo2.svg" alt="photo" class="home__block--img3" />
          <h2>
            Автоматическое исправление ошибок и их разбор понятным и доступным
            языком
          </h2>
          <h1>ЧЕКИНГ</h1>
        </div>
        <div class="">
          <h1>05</h1>

          <h2>
            Автоматическое исправление ошибок и их разбор понятным и доступным
            языком
          </h2>
          <img src="/svg/photo5.svg" alt="photo" class="home__block--img5" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
});

</script>

<style lang="scss" scoped>
.home {
  max-width: 1234px;
  margin-left: auto;
  margin-right: auto;
  padding: 0px 5%;
  &__view {
    width: 100%;
    background-color: #736bffcc;
    border-radius: 55px;
    position: relative;
    &--background {
      width: 100%;
      opacity: 0.4;
    }
    > h1 {
      text-align: center;
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      font-weight: 900;
      font-size: 58px;
      line-height: 50px;
      > span {
        color: #93e42b;
      }
    }
    > p {
      text-align: center;
      position: absolute;
      top: 55%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      font-weight: 700;
      font-size: 24px;
      line-height: 25px;
      width: 40%;
    }
    &--block {
      position: absolute;
      bottom: -15%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      text-align: center;
      width: 90%;
      > div {
        background-color: #fff;
        border-radius: 30px;
        padding: 5px 30px;
        border: 1px solid #93e42b;
        > h1 {
          font-weight: 700;
          line-height: 20px;
          font-size: 24px;
        }
        > h2 {
          color: #4e4e4e;
          font-weight: 700;
          line-height: 20px;
          font-size: 18px;
        }
      }
    }
  }
  &__block {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 90%;
    margin-left: 5%;
    gap: 20px;
    margin-top: 100px;
    &--view {
      > div {
        background-color: #fff;
        border: 1px solid #93e42b;
        border-radius: 30px;
        margin-bottom: 20px;
      }
      h1,
      h2 {
        margin-left: 20px;
      }
      h1,
      span {
        font-size: 48px;
        font-weight: 700;
        line-height: 45px;
      }
      h2 {
        font-size: 20px;
        font-weight: 400;
        line-height: 20px;
        margin-right: 30px;
      }
    }
    &--row {
      display: flex;
      flex-direction: row;
      > div > span {
        display: flex;
        text-align: end;
        justify-content: end;
        margin-right: 30px;
        margin-bottom: 32px;
      }
    }
    &--span {
      text-align: center;
      margin-left: auto;
      margin-right: auto;
      margin-top: 32px;
      margin-bottom: 47px;
    }
    &--button {
      text-align: center;
      background-color: #93e42b;
      color: black;
      padding: 15px 10px;
      width: 80%;
      margin-left: auto;
      margin-right: auto;
      border-radius: 99999px;
      font-weight: 700;
      margin-bottom: 32px;
    }
    &--audi {
      display: flex;
      justify-content: end;
      margin-right: 70px;
      margin-bottom: 27px;
    }
    &--int {
      margin-top: 50px;
      margin-bottom: 52px;
    }
    &--nash {
      margin-top: 50px;
      margin-bottom: 72px;
    }
    &--blockimg {
      margin-right: 20px;
      margin-top: 42px;
    }
    &--blocktxt {
      width: 56%;
      margin-top: 50px;
      margin-bottom: 50px;
    }
    &--img1 {
      width: 80%;
    }
    &--img2 {
      width: 20%;
      margin-left: auto;
    }
    &--img3 {
      width: 90%;
      margin-left: auto;
      margin-right: auto;
    }
    &--img4 {
      width: 100%;
      margin-right: 20px;
    }
    &--img5 {
      width: 60%;
      display: flex;
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>
