<template>
  <div class="program">
    <div class="program__view">
      <h1>Пробный курс "Мессенджер"</h1>
      <h2>
        Вы изучите методы защиты от атак злоумышленников на компьютеры, серверы,
        мобильные устройства, электронные системы, сети и данные, а также
        отработаете все навыки на практике.
      </h2>
      <div class="">
        <div class="program__view--button1" @click.prevent="goToProgram">
          КУПИТЬ КУРС
        </div>
        <div class="program__view--button2">Подробнее</div>
      </div>
    </div>
    <div class="program__view">
      <h1>Пробный курс "Мессенджер"</h1>
      <h2>
        Вы изучите методы защиты от атак злоумышленников на компьютеры, серверы,
        мобильные устройства, электронные системы, сети и данные, а также
        отработаете все навыки на практике.
      </h2>
      <div class="">
        <div class="program__view--button1" @click.prevent="goToProgram">
          КУПИТЬ КУРС
        </div>
        <div class="program__view--button2">Подробнее</div>
      </div>
    </div>
    <div class="program__view">
      <h1>Полный курс “СМС”</h1>
      <h2>
        Вы изучите методы защиты от атак злоумышленников на компьютеры, серверы,
        мобильные устройства, электронные системы, сети и данные, а также
        отработаете все навыки на практике.
      </h2>
      <div class="">
        <div class="program__view--button1" @click.prevent="goToProgram">
          КУПИТЬ КУРС
        </div>
        <div class="program__view--button2">Подробнее</div>
      </div>
    </div>
    <div class="program__view">
      <h1>Полный курс “Электронная почта”</h1>
      <h2>
        Вы изучите методы защиты от атак злоумышленников на компьютеры, серверы,
        мобильные устройства, электронные системы, сети и данные, а также
        отработаете все навыки на практике.
      </h2>
      <div class="">
        <div class="program__view--button1" @click.prevent="goToProgram">
          КУПИТЬ КУРС
        </div>
        <div class="program__view--button2">Подробнее</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgramComponent",
  methods: {
    goToProgram() {
      this.$router.push("/program");
    },
  },
};
</script>

<style lang="scss" scoped>
.program {
  background-color: #736bff;
  padding: 3% 5%;
  margin: 0;
  border-radius: 50px;
  margin-bottom: 50px;
  &__view {
    max-width: 1234px;
    margin-left: auto;
    margin-right: auto;
    background-color: #fff;
    border-radius: 50px;
    padding: 5% 5%;
    margin-bottom: 20px;
    > h1 {
      font-size: 36px;
      font-weight: 700;
      margin-top: 0;
      padding-top: 0;
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
    &--button1 {
      font-weight: 600;
      font-size: 16px;
      border-radius: 9999px;
      padding: 10px 35px;
      background-color: #93e42b;
      transition: all 0.1s ease;
      &:hover {
        transform: scaleX(1.05);
      }
    }
    &--button2 {
      font-weight: 600;
      font-size: 16px;
      border-radius: 9999px;
      padding: 10px 35px;
      margin-left: 20px;
      background-color: #fff;
      border: 1px solid #93e42b;
      transition: all 0.1s ease;
      &:hover {
        transform: scaleX(1.05);
      }
    }
  }
}
</style>
