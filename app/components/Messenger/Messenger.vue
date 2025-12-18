<template>
  <div class="program">
    <div class="program__view">
      <h1>{{ moduleData?.title || "Загрузка..." }}</h1>
      <div class="program__view--window">
        <div class="content-container">
          <!-- Экран объяснения (explanation) -->
          <div
            v-if="currentBlock?.screen === 'explanation'"
            class="explanation-screen"
          >
            <div class="explanation-content" v-html="renderedContent"></div>
          </div>

          <!-- Экран мессенджера (messenger) -->
          <div
            v-if="currentBlock?.screen === 'messenger'"
            class="messenger-screen"
          >
            <!-- Шапка мессенджера -->
            <div class="view">
              <div class="view__column">
                <h2 class="view__column--h2">
                  {{ currentBlock.contact_name || "Чат" }}
                </h2>
                <h2 class="view__column--chat">
                  {{ currentBlock.title || "2 участника" }}
                </h2>
              </div>
              <div class="view__row">
                <img src="/svg/phone.svg" alt="phone" />
                <img src="/svg/search.svg" alt="search" />
                <img src="/svg/dot.svg" alt="dot" />
              </div>
            </div>

            <!-- Контент чата -->
            <div class="chat">
              <h2>Сегодня</h2>

              <!-- Отображаемые сообщения из текущего и предыдущих блоков -->
              <div
                v-for="item in displayedMessages"
                :key="item.id"
                :id="`item-${item.id}`"
              >
                <!-- Сообщение -->
                <div
                  v-if="item.type === 'message'"
                  :class="['message', `message-${item.direction}`]"
                >
                  <img
                    v-if="item.direction === 'incoming' && item.avatar"
                    :src="getImageUrl(item.avatar)"
                    alt="avatar"
                  />
                  <img
                    v-else-if="item.direction === 'outgoing'"
                    src="/svg/logochat3.svg"
                    alt="avatar"
                  />
                  <div class="message-content">
                    <div class="message-header">
                      <span class="sender">{{
                        getSenderName(item.direction, item.blockStage)
                      }}</span>
                      <span class="timestamp">{{
                        item.content.timestamp
                      }}</span>
                    </div>
                    <p class="message-text">{{ item.content.message }}</p>
                  </div>
                </div>

                <!-- Системное сообщение -->
                <div
                  v-if="item.type === 'message' && item.direction === 'system'"
                  class="system-message"
                >
                  <p>{{ item.content.message }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Блок с пояснением из СЛЕДУЮЩЕГО стейджа -->
      <div v-if="showNextStageExplanation" class="explanation-block">
        <div class="blocktext">
          <h2>Пояснение</h2>
          <div class="explanation-content">
            <div
              v-for="(notification, index) in nextStageNotifications"
              :key="notification.id"
              class="explanation-item"
            >
              <div class="explanation-number">{{ index + 1 }}.</div>
              <p>{{ notification.content.message }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Кнопки навигации -->
      <div class="program__view--button">
        <button
          class="program__view--text1"
          @click="goToStage('prev')"
          :disabled="currentStageIndex === 0"
        >
          НАЗАД
        </button>
        <button
          class="program__view--text2"
          @click="goToStage('next')"
          :disabled="
            isLastStage && !areAllMessagesShown && !showNextStageExplanation
          "
        >
          {{ getNextButtonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import API_HANDLER from "~/hooks/api_handler";
import { GET_MODULE } from "~/configs/api/urls";
import { marked } from "marked";

const route = useRoute();
const router = useRouter();
const moduleData = ref(null);
const currentStageIndex = ref(0);
const displayedItemIndex = ref(0);
const isProcessing = ref(false);
const allMessagesShown = ref(false);

// Получаем все блоки
const allBlocks = computed(() => {
  return moduleData.value?.content_json?.data?.blocks || [];
});

// Получаем текущий блок на основе индекса этапа
const currentBlock = computed(() => {
  if (!allBlocks.value.length) return null;
  return allBlocks.value[currentStageIndex.value];
});

// Получаем следующий блок (для пояснений)
const nextBlock = computed(() => {
  if (
    !allBlocks.value.length ||
    currentStageIndex.value >= allBlocks.value.length - 1
  )
    return null;
  return allBlocks.value[currentStageIndex.value + 1];
});

// Все сообщения текущего блока с добавлением информации о стейдже
const allMessages = computed(() => {
  if (!currentBlock.value?.data) return [];

  return currentBlock.value.data
    .filter((item) => item.type === "message")
    .map((item) => ({
      ...item,
      blockStage: currentBlock.value.stage,
    }));
});

// Отображаемые сообщения (постепенно)
const displayedMessages = computed(() => {
  return allMessages.value.slice(0, displayedItemIndex.value + 1);
});

// Все ли сообщения показаны
const areAllMessagesShown = computed(() => {
  return displayedItemIndex.value >= allMessages.value.length - 1;
});

// Уведомления из СЛЕДУЮЩЕГО блока
const nextStageNotifications = computed(() => {
  if (!nextBlock.value?.data) return [];
  return nextBlock.value.data.filter((item) => item.type === "notification");
});

// Проверяем, есть ли уведомления в следующем блоке
const hasNextStageNotifications = computed(() => {
  return nextStageNotifications.value.length > 0;
});

// Показывать пояснение из следующего стейджа
const showNextStageExplanation = computed(() => {
  return areAllMessagesShown.value && hasNextStageNotifications.value;
});

// Рендеринг markdown контента
const renderedContent = computed(() => {
  if (
    !currentBlock.value?.content ||
    currentBlock.value.content_type !== "markdown"
  )
    return "";
  return marked(currentBlock.value.content);
});

// Проверка последнего ли этапа
const isLastStage = computed(() => {
  if (!allBlocks.value.length) return false;
  return currentStageIndex.value === allBlocks.value.length - 1;
});

// Текст для кнопки "Далее"
const getNextButtonText = computed(() => {
  if (isLastStage.value && areAllMessagesShown.value) {
    return "ПЕРЕЙТИ К ТЕСТАМ";
  }

  if (!areAllMessagesShown.value && !showNextStageExplanation.value) {
    return "ПОКАЗАТЬ ВСЕ";
  }

  return "ДАЛЕЕ";
});

// Получение имени отправителя с учетом стейджа
const getSenderName = (direction, blockStage) => {
  if (direction === "outgoing") return "Я";
  if (direction === "incoming") {
    // Находим блок по stage для получения contact_name
    const block = allBlocks.value.find((b) => b.stage === blockStage);
    return block?.contact_name || "Собеседник";
  }
  return "";
};

// Получение URL изображения с учетом стейджа
const getImageUrl = (imageId) => {
  if (imageId === "REPLACE_WITH_SNDK_AVATAR_IMAGE_ID") {
    return "/svg/logochat1.svg";
  }
  return `/api/images/${imageId}`;
};

// Получаем аватар для сообщения
const getAvatarForMessage = (blockStage, direction) => {
  if (direction !== "incoming") return null;

  const block = allBlocks.value.find((b) => b.stage === blockStage);
  if (block?.contact_avatar) {
    return block.contact_avatar;
  }
  return null;
};

// Обработка очереди сообщений с задержками
const processMessageQueue = async () => {
  if (isProcessing.value || !currentBlock.value?.data) return;

  isProcessing.value = true;
  const messages = allMessages.value;

  // Сбрасываем счетчик
  displayedItemIndex.value = 0;

  for (let i = 0; i < messages.length; i++) {
    displayedItemIndex.value = i;

    // Если есть задержка, ждем
    if (messages[i].delay && messages[i].delay > 0) {
      await new Promise((resolve) =>
        setTimeout(resolve, messages[i].delay * 1000)
      );
    }

    // Обновляем DOM после каждого сообщения
    await nextTick();
  }

  // После показа всех сообщений
  allMessagesShown.value = true;
  isProcessing.value = false;
};

// Показать все сообщения сразу
const showAllMessages = () => {
  if (!areAllMessagesShown.value) {
    displayedItemIndex.value = allMessages.value.length - 1;
    allMessagesShown.value = true;
  }
};

// Переход по этапам
const goToStage = async (direction) => {
  if (direction === "next") {
    // Проверяем, все ли сообщения текущего этапа показаны
    if (!areAllMessagesShown.value && !showNextStageExplanation.value) {
      // Если сообщения еще не все показаны, показываем все сразу
      showAllMessages();
      return;
    }

    // Если есть пояснение из следующего стейджа и оно не показано
    if (showNextStageExplanation.value && !areAllMessagesShown.value) {
      // Показываем все сообщения
      showAllMessages();
      return;
    }

    // Если это последний этап
    if (isLastStage.value) {
      // Переходим на страницу тестов с тем же module_id
      const moduleId = route.params.module_id;
      router.push(`/testing/${moduleId}`);
      return;
    }

    // Переход к следующему этапу
    currentStageIndex.value++;
    displayedItemIndex.value = 0;
    allMessagesShown.value = false;
    await nextTick();
    processMessageQueue();
  } else if (direction === "prev" && currentStageIndex.value > 0) {
    // Возврат к предыдущему этапу
    currentStageIndex.value--;
    displayedItemIndex.value = 0;
    allMessagesShown.value = false;
    await nextTick();
    processMessageQueue();
  }
};

// Загрузка данных модуля
const loadModuleData = async () => {
  try {
    const resData = await API_HANDLER(
      GET_MODULE({ module_id: route.params.module_id })
    );

    moduleData.value = resData;

    await nextTick();
    processMessageQueue();
  } catch (error) {
    console.error("Ошибка загрузки модуля:", error);
  }
};

onMounted(() => {
  loadModuleData();
});

watch(currentBlock, () => {
  displayedItemIndex.value = 0;
  allMessagesShown.value = false;
  processMessageQueue();
});
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

    &--window {
      background-color: #fff;
      min-height: 500px;
      max-width: 1234px;
      margin: 0 auto;

      .content-container {
        padding: 20px;
      }
    }

    &--button {
      max-width: 1234px;
      margin: 20px auto;
      display: flex;
      justify-content: space-between;
      padding: 3% 5%;

      button {
        padding: 20px 40px;
        border-radius: 9999px;
        font-size: 18px;
        font-weight: 600;
        transition: all 0.1s ease;
        border: none;
        cursor: pointer;

        &:hover:not(:disabled) {
          transform: scaleX(1.05);
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        &.program__view--text1 {
          background-color: #ffffff;
        }

        &.program__view--text2 {
          background-color: #93e42b;

          &:hover:not(:disabled) {
            background-color: #82d41a;
          }
        }
      }
    }
  }
}

// Стили для мессенджера
.view {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #777777;
  padding: 30px 0 20px;

  &__column {
    text-align: left;

    &--h2 {
      font-size: 24px;
      font-weight: 700;
      margin: 0;
    }

    &--chat {
      font-weight: 500;
      font-size: 20px;
      color: #777777;
      margin: 5px 0 0 0;
    }
  }

  &__row {
    display: flex;
    gap: 15px;

    img {
      width: 50px;
      height: 50px;
      transition: all 0.1s ease;
      cursor: pointer;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
}

// Стили для чата
.chat {
  padding: 20px;

  > h2 {
    text-align: center;
    border-radius: 9999px;
    border: 1px solid #777777;
    padding: 10px 20px;
    margin: 20px auto;
    width: fit-content;
  }

  .message {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    margin-bottom: 20px;

    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    &-content {
      max-width: 70%;
      padding: 15px;
      border-radius: 20px;
      position: relative;
    }

    &-outgoing {
      flex-direction: row-reverse;

      .message-content {
        background-color: #93e42b;
        margin-left: auto;
      }
    }

    &-incoming {
      .message-content {
        background-color: #f0f0f0;
      }
    }

    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;

      .sender {
        font-weight: 600;
        color: #736bff;
        font-size: 18px;
      }

      .timestamp {
        font-size: 14px;
        color: #777777;
      }
    }

    &-text {
      margin: 0;
      line-height: 1.5;
      font-size: 16px;
      color: #000;
    }
  }

  .system-message {
    text-align: center;
    color: #777777;
    font-style: italic;
    margin: 10px 0;
    padding: 10px;
    background: #f5f5f5;
    border-radius: 10px;
  }
}

// Блок с пояснением из следующего стейджа
.explanation-block {
  max-width: 1234px;
  margin: 40px auto;
  animation: fadeIn 0.5s ease-in-out;

  .blocktext {
    background: white;
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);

    h2 {
      color: #736bff;
      font-size: 28px;
      margin-bottom: 25px;
      text-align: center;
    }

    .explanation-content {
      .explanation-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 20px;
        padding: 15px;
        background: #f8f9fa;
        border-radius: 10px;
        border-left: 4px solid #736bff;
        transition: all 0.3s ease;

        &:hover {
          background: #e9ecef;
          transform: translateX(5px);
        }

        &:last-child {
          margin-bottom: 0;
        }

        .explanation-number {
          font-weight: bold;
          color: #736bff;
          font-size: 18px;
          margin-right: 15px;
          min-width: 25px;
        }

        p {
          font-size: 16px;
          line-height: 1.6;
          color: #333;
          margin: 0;
        }
      }
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Стили для экрана объяснения
.explanation-screen {
  padding: 40px;

  .explanation-content {
    font-size: 18px;
    line-height: 1.6;

    h1,
    h2,
    h3 {
      color: #333;
      margin-top: 30px;
      margin-bottom: 15px;
    }

    p {
      margin-bottom: 20px;
    }

    a {
      color: #736bff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
