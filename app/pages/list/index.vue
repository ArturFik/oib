<template>
  <div class="program">
    <div v-if="loading">Загрузка курсов...</div>
    <div v-else-if="error">Ошибка загрузки((</div>
    <div v-else>
      <div v-for="course in courses" :key="course.unique_id" class="program__view">
        <h1>{{ course.title }}</h1>
        <h2>{{ course.description }}</h2>
        <div class="">
          <div class="program__view--button1" @click.prevent="goToProgram(course.unique_id)">
            КУПИТЬ КУРС
          </div>
          <div class="program__view--button2">Подробнее</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { GET_COURSES } from "~/configs/api/urls";
import API_HANDLER from "~/hooks/api_handler";
import { ref, onMounted } from "vue";

const router = useRouter();
const courses = ref([]);
const loading = ref(true);
const error = ref(null);

const goToProgram = (courseId) => {
  router.push(`/program/${courseId}`);
};

onMounted(async () => {
  try {
    loading.value = true;
    const resData = await API_HANDLER(GET_COURSES);
    courses.value = resData;
  } catch (err) {
    console.error("Error fetching courses:", err);
    error.value = err.message || "Ошибка загрузки курсов";
  } finally {
    loading.value = false;
  }
});
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
      cursor: pointer;

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
      cursor: pointer;

      &:hover {
        transform: scaleX(1.05);
      }
    }
  }
}
</style>
