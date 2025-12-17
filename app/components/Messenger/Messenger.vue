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
                <div class="absolute" v-if="stage != 1">
                  <div class="">!</div>
                  Вы изучите методы защиты от атак злоумышленников на
                  компьютеры, серверы, мобильные устройства, электронные
                  системы, сети и данные, а также отработаете все навыки на
                  практике.
                </div>
                <div class="absolute-arrow" v-if="stage != 1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="154"
                    height="192"
                    viewBox="0 0 154 192"
                    fill="none"
                  >
                    <path
                      d="M153.529 1.55567C153.559 0.727809 152.913 0.0317622 152.085 0.000997282C151.258 -0.0297627 150.561 0.616409 150.531 1.44426L152.03 1.49996L153.529 1.55567ZM0.194724 182.384C-0.212971 183.105 0.0411307 184.02 0.762279 184.428L12.5142 191.072C13.2354 191.48 14.1505 191.226 14.5582 190.504C14.9659 189.783 14.7118 188.868 13.9906 188.46L3.54448 182.555L9.45023 172.109C9.85794 171.387 9.60383 170.472 8.88267 170.065C8.16151 169.657 7.24639 169.911 6.83869 170.632L0.194724 182.384ZM10.5534 180.609L10.1521 179.163L10.5534 180.609ZM10.5534 180.609L10.1521 179.163L1.09919 181.677L1.5005 183.122L1.90181 184.568L10.9547 182.054L10.5534 180.609ZM152.03 1.49996L150.531 1.44426C147.428 84.9315 90.6513 156.811 10.1521 179.163L10.5534 180.609L10.9547 182.054C92.7128 159.352 150.378 86.3485 153.529 1.55567L152.03 1.49996Z"
                      fill="black"
                    />
                  </svg>
                </div>
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
      <div class="">
        <div class="blocktext" v-if="stage === 4">
          <h2>Пояснение</h2>
          <p>
            Вы изучите методы защиты от атак злоумышленников на компьютеры,
            серверы, мобильные устройства, электронные системы, сети и данные, а
            также отработаете все навыки на практике. Вы изучите методы защиты
            от атак злоумышленников на компьютеры, серверы, мобильные
            устройства, электронные системы, сети и данные, а также отработаете
            все навыки на практике. Вы изучите методы защиты от атак
            злоумышленников на компьютеры, серверы, мобильные устройства,
            электронные системы, сети и данные, а также отработаете все навыки
            на практике. Вы изучите методы защиты от атак злоумышленников на
            компьютеры, серверы, мобильные устройства, электронные системы, сети
            и данные, а также отработаете все навыки на практике.
          </p>
        </div>
      </div>
      <div class="program__view--button">
        <h2 class="program__view--text1" @click="goToProgram('minus')">
          НАЗАД
        </h2>
        <h2 class="program__view--text2" @click="goToProgram('plus')">ДАЛЕЕ</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import API_HANDLER from "~/hooks/api_handler";
import { GET_MODULE } from "~/configs/api/urls";
import { ref } from "vue";
const route = useRoute();
const stage = ref(1);

const goToProgram = (data) => {
  if (data === "plus") {
    stage.value = stage.value + 1;

    if (stage.value === 5) {
      route.push(`/program/${courseId}`);
    }
  }
  if (data === "minus") {
    if (stage.value != 1) {
      stage.value = stage.value - 1;
    }
  }
};

onMounted(async () => {
  const resData = API_HANDLER(
    GET_MODULE({ module_id: route.params.module_id })
  );
  console.log(resData);
});
</script>

<style lang="scss" scoped>
.blocktext {
  max-width: 1234px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: start;
  color: #fff;
}

.absolute {
  position: absolute;
  background-color: white;
  border: 1px solid yellow;
  width: 400px;
  bottom: 250px;
  left: 250px;
  display: flex;
  flex-direction: row;
  align-items: start;
  gap: 20px;
  padding: 20px 30px 20px 10px;
  > div {
    border: 1px solid yellow;
    width: 220px;
    height: 50px;
    border-radius: 9999px;
    align-items: center;
    justify-content: center;
    display: flex;
    color: yellow;
  }
}
.absolute-arrow {
  position: absolute;
  top: -150px;
  left: 150px;
}

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
    > div {
      position: relative;
    }
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
