<template>
  <div class="program">
    <div class="program__view">
      <h1>Пробный курс "Мессенджер"</h1>
      <h2>
        Вы изучите методы защиты от атак злоумышленников на компьютеры, серверы,
        мобильные устройства, электронные системы, сети и данные, а также
        отработаете все навыки на практике.
      </h2>
      <div class="program__view--row">
        <div class="program__view--row1">
          <div
            v-for="(button, index) in buttons"
            :key="index"
            :class="['program-button', { active: activeButton === index }]"
            @click="setActiveButton(index)"
          >
            <div class="custom-checkbox">
              <input
                type="checkbox"
                :checked="activeButton === index"
                @click.stop="setActiveButton(index)"
              />
              <span class="checkmark"></span>
            </div>
            {{ button.title }}
          </div>
        </div>
        <div class="program__view--row2">
          <h1>{{ activeContent.title }}</h1>
          <h2>{{ activeContent.description }}</h2>
          <span>Вы научитесь:</span>
          <h2 v-html="activeContent.skills"></h2>
          <span>Итог модуля:</span>
          <h2>{{ activeContent.result }}</h2>
        </div>
      </div>
      <a href="/messenger" class="program__view--button">НАЧАТЬ МОДУЛЬ</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgramComponent",
  data() {
    return {
      activeButton: 0,
      buttons: [
        { title: "Сайты-двойники" },
        { title: "Фишинг" },
        { title: "Исполни-тельные файлы" },
      ],
      content: [
        {
          title: "Сайты-двойники",
          description:
            "В этом модуле вы погрузитесь в мир кибербезопасности, изучив ключевые концепции и правовые аспекты. Вы познакомитесь с основными угрозами информационной безопасности и методами защиты от них. Особое внимание будет уделено изучению операционной системы Kali Linux, специально разработанной для задач кибербезопасности.",
          skills:
            "•Анализировать и интерпретировать ключевые статьи УК РФ, связанные с киберпреступлениями<br>•Устанавливать и настраивать Kali Linux для эффективной работы<br>•Использовать базовые инструменты Kali Linux для анализа безопасности<br>•Понимать и применять основные принципы информационной безопасности<br>•Идентифицировать различные типы кибератак и методы их предотвращения",
          result:
            "По завершении модуля вы будете иметь полностью настроенную среду Kali Linux, готовую к использованию для задач кибербезопасности. Вы сможете применять базовые инструменты для анализа безопасности и понимать правовые аспекты работы в сфере информационной безопасности",
        },
        {
          title: "Фишинг",
          description:
            "В этом модуле вы изучите методы фишинговых атак и способы защиты от них. Вы узнаете, как злоумышленники создают поддельные сайты и письма для получения конфиденциальной информации.",
          skills:
            "•Распознавать фишинговые письма и сайты<br>•Настраивать защиту от фишинговых атак<br>•Проводить тестирование на уязвимости<br>•Обучать сотрудников основам кибербезопасности<br>•Внедрять системы защиты от социальной инженерии",
          result:
            "После завершения модуля вы сможете эффективно защищать организации от фишинговых атак, проводить обучение сотрудников и внедрять системы защиты от социальной инженерии",
        },
        {
          title: "Исполнительные файлы",
          description:
            "В этом модуле вы изучите опасности, связанные с исполняемыми файлами, и методы защиты от вредоносного ПО. Вы научитесь анализировать подозрительные файлы и настраивать системы защиты.",
          skills:
            "•Анализировать исполняемые файлы на наличие угроз<br>•Настраивать антивирусное ПО<br>•Работать с системами песочницы (sandbox)<br>•Внедрять политики безопасности для запуска файлов<br>•Проводить анализ вредоносного ПО",
          result:
            "По окончании модуля вы будете уметь анализировать исполняемые файлы, настраивать системы защиты от вредоносного ПО и внедрять эффективные политики безопасности в организации",
        },
      ],
    };
  },
  computed: {
    activeContent() {
      return this.content[this.activeButton];
    },
  },
  methods: {
    setActiveButton(index) {
      this.activeButton = index;
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
    padding: 1% 5%;
    &--button {
      font-weight: 600;
      font-size: 16px;
      border-radius: 9999px;
      padding: 10px 35px;
      background-color: #93e42b;
      transition: all 0.1s ease;
      width: 15%;
      display: flex;
      justify-content: center;
      margin-left: auto;
      margin-right: auto;
      margin-top: 50px;
      margin-bottom: 50px;
      color: #000;
      text-decoration: none;
      &:hover {
        transform: scaleX(1.05);
      }
    }
    > h1 {
      font-size: 48px;
      font-weight: 700;
    }

    > h2 {
      font-size: 18px;
      font-weight: 300;
    }

    &--row {
      display: flex;
      flex-direction: row;
      align-items: start;
    }

    &--row1 {
      width: 20%;
      margin-right: 5%;

      .program-button {
        display: flex;
        flex-direction: row;
        align-items: center;
        border-radius: 10px;
        gap: 10px;
        padding: 10px 10px;
        margin-bottom: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 1px solid #93e42b;
        background-color: #fff;

        &.active {
          background-color: #93e42b;
          border: 1px solid #93e42b;
        }

        &:hover {
          opacity: 0.8;
        }
      }
    }

    &--row2 {
      width: 100%;
      background-color: #fff;
      border-radius: 50px;
      padding: 1% 5%;
      border: 2px solid #93e42b;

      > h1 {
        font-size: 48px;
        font-weight: 700;
      }

      > h2 {
        font-size: 18px;
        font-weight: 300;
      }

      > span {
        font-size: 18px;
        font-weight: 700;
      }
    }
  }
}

.custom-checkbox {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;

  input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked + .checkmark {
      background-color: #fff;
      border: 1px solid #93e42b;

      &:after {
        display: block;
      }
    }
  }

  .checkmark {
    position: relative;
    height: 20px;
    width: 20px;
    background-color: #fff;
    border: 1px solid #93e42b;
    border-radius: 50%;
    transition: all 0.3s ease;

    &:after {
      content: "";
      position: absolute;
      display: none;
      left: 6px;
      top: 2px;
      width: 5px;
      height: 10px;
      border: solid #000;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }
}

.program-button.active .custom-checkbox .checkmark {
  background-color: #000;
  border: 1px solid #000;

  &:after {
    border-color: #000;
    display: block;
  }
}
</style>
