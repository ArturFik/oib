<template>
  <div class="program">
    <div v-if="loading" class="program__view">
      <h1>Загрузка модулей...</h1>
    </div>
    <div v-else-if="error" class="program__view">
      <h1>Ошибка загрузки модулей</h1>
      <h2>{{ error }}</h2>
    </div>
    <div v-else-if="modules.length > 0" class="program__view">
      <h1>{{ course }}</h1>
      <h2>{{ courseDescription }}</h2>
      <div class="program__view--row">
        <div class="program__view--row1">
          <div
            v-for="(module, index) in modules"
            :key="module.id || index"
            :class="['program-button', { active: activeModuleIndex === index }]"
            @click="setActiveModule(index)"
          >
            <div class="custom-checkbox">
              <input
                type="checkbox"
                :checked="activeModuleIndex === index"
                @click.stop="setActiveModule(index)"
              />
              <span class="checkmark"></span>
            </div>
            {{ module.title || module.name }}
          </div>
        </div>
        <div class="program__view--row2">
          <h1>{{ activeModule.title || activeModule.name }}</h1>
          <h2>{{ activeModule.description }}</h2>
          <span v-if="activeModule.skills || activeModule.objectives">Вы научитесь:</span>
          <h2 v-if="activeModule.skills" v-html="formatSkills(activeModule.skills)"></h2>
          <h2 v-else-if="activeModule.objectives">{{ activeModule.objectives }}</h2>
          <span v-if="activeModule.result || activeModule.outcome">Итог модуля:</span>
          <h2>{{ activeModule.result || activeModule.outcome || 'Практическое освоение материала' }}</h2>
        </div>
      </div>
      <a :href="`/messenger/${activeModule.unique_id}`" class="program__view--button" >
        НАЧАТЬ МОДУЛЬ
      </a>
    </div>
    <div v-else class="program__view">
      <h1>Нет доступных модулей</h1>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import API_HANDLER from '~/hooks/api_handler'
import { GET_COURSE, GET_COURSE_MODULES } from '~/configs/api/urls'

const route = useRoute()
const modules = ref([])
const course = ref('')
const loading = ref(true)
const error = ref(null)
const activeModuleIndex = ref(0)
const courseTitle = ref('')
const courseDescription = ref('')

const courseId = computed(() => route.params.course_id)

const activeModule = computed(() => {
  return modules.value[activeModuleIndex.value] || {}
})

const formatSkills = (skills) => {
  if (Array.isArray(skills)) {
    return skills.map(skill => `•${skill}`).join('<br>')
  } else if (typeof skills === 'string') {
    return skills.replace(/\n/g, '<br>•').replace(/^/, '•')
  }
  return ''
}
const setActiveModule = (index) => {
  activeModuleIndex.value = index
}

const loadModules = async () => {
  try {
    loading.value = true
    error.value = null
    
    if (!courseId.value) {
      throw new Error('ID курса не указан')
    }

    console.log(courseId.value);
    
    const modulesData = await API_HANDLER(GET_COURSE_MODULES({ course_id: courseId.value }))
    const courseData = await API_HANDLER(GET_COURSE({ course_id: courseId.value }))
    course.value = courseData.title
    if (modulesData && Array.isArray(modulesData)) {
      modules.value = modulesData
      if (modulesData.length > 0) {
        const firstModule = modulesData[0]
        courseTitle.value = firstModule.course_title || `Курс "${firstModule.course_name || courseId.value}"`
        courseDescription.value = firstModule.course_description || 'Изучите методы защиты от кибератак и отработайте навыки на практике'
      } else {
        courseTitle.value = `Курс "${courseId.value}"`
        courseDescription.value = 'Изучите методы защиты от кибератак и отработайте навыки на практике'
      }
    } else {
      modules.value = []
      courseTitle.value = `Курс "${courseId.value}"`
      courseDescription.value = 'Изучите методы защиты от кибератак и отработайте навыки на практике'
    }
    
  } catch (err) {
    console.error('Ошибка загрузки модулей:', err)
    error.value = err.message || 'Не удалось загрузить модули курса'
    modules.value = []
    courseTitle.value = `Курс "${courseId.value}"`
    courseDescription.value = 'Изучите методы защиты от кибератак и отработайте навыки на практике'
  } finally {
    loading.value = false
  }
}
onMounted(() => {
  loadModules()
})

import { watch } from 'vue'
watch(() => route.params.course_id, () => {
  loadModules()
  activeModuleIndex.value = 0 
})
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
