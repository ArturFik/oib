<template>
  <div class="program">
    <div class="program__view">
      <h1>Пробный курс "Мессенджер"</h1>
      <div class="program__view--window">
        <div class="view">
          <h1 class="view__result">Результаты:</h1>
          <h1 class="view__procent">80%</h1>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: '80%' }"></div>
          </div>
          <h2 class="view__text">
            Хорошо! Ты молодец!<br />Твой результат лучше чем у 65% обучающихся!
          </h2>
        </div>
      </div>
      <h2>
        <span>Подробнее:</span><br /><br />
        Lorem ipsum dolor sit amet consectetur. Amet faucibus bibendum egestas
        in ornare. At massa odio in auctor leo suscipit hac mattis aenean. Vitae
        condimentum ut vulputate dapibus at ac accumsan. Id curabitur metus mi
        massa. Eu est enim vestibulum eu elementum cum. Et arcu orci cursus eget
        at tempor arcu suscipit dapibus. Tristique mauris duis faucibus purus
        quam interdum. Enim vel sit nibh amet mi placerat amet cras libero.
        Dignissim netus hac elit quam enim faucibus ipsum tincidunt.
      </h2>
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
      font-size: 21px;
      font-weight: 400;
      margin-top: 0;
      padding-top: 0;
      color: #fff;
      max-width: 1234px;
      margin-left: auto;
      margin-right: auto;
      padding: 3% 5%;
      > span {
        font-weight: 700;
      }
    }
    &--window {
      background-color: #fff;
      width: 50%;
      margin-left: auto;
      margin-right: auto;
      border-radius: 40px;
      > div {
        max-width: 1234px;
        margin-right: auto;
        margin-left: auto;
      }
    }
  }
}

.view {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  justify-content: space-between;
  padding: 30px 0 20px 0;

  &__result {
    font-size: 48px;
    font-weight: 400;
    color: #000;
    margin-bottom: 0;
    margin-top: 20px;
  }
  &__procent {
    margin-top: 20px;
    font-size: 128px;
    font-weight: 900;
    color: #736bff;
    margin-bottom: 0;
  }
  &__text {
    width: 30%;
    margin-left: auto;
    margin-right: auto;
    font-size: 24px;
    font-weight: 300;
    color: #000;
    margin-bottom: 20px;
    margin-top: 0;
    text-align: start;
  }
}

.progress-bar {
  width: 50%;
  height: 5px;
  background-color: #e0e0e0;
  border-radius: 10px;
  margin: 20px 0;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background-color: #736bff;
  border-radius: 10px;
  transition: width 0.5s ease-in-out;
}
</style>
