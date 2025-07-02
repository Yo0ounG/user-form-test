<template>
  <main class="container">
    <h1 class="title">Форма користувача</h1>
    <form @submit.prevent="onSubmit" class="form">
      <div class="form__row">
        <VInput v-model="form.firstName"
                label="Ім’я"
                placeholder="Введіть ім’я"
                :error="errors.firstName"
        />

        <VInput v-model="form.lastName"
                label="Прізвище"
                placeholder="Введіть прізвище"
                :error="errors.lastName"
        />
      </div>

      <div class="form__row">
        <VInput v-model="form.login"
                label="Логін"
                placeholder="Введіть логін"
                :error="errors.login"
        />

        <VInput v-model="form.password"
                label="Пароль"
                type="password"
                placeholder="Введіть пароль"
                :error="errors.password"
        />
      </div>

      <section class="form__section">
        <fieldset class="form__operations">
          <legend>
            <h3 class="form__subtitle">Операції</h3>
          </legend>

          <div v-for="(subOptions, mainOption) in operations"
               :key="mainOption"
               class="form__operations-list"
          >
            <h4 class="form__subtitle">{{ mainOption }}</h4>

            <VCheckbox
              v-for="subOption in subOptions"
              :key="subOption"
              v-model="form.operations"
              :value="`${mainOption}: ${subOption}`"
            >
              {{ subOption }}
            </VCheckbox>
          </div>
        </fieldset>

        <span v-if="errors.operations"
              class="error-text"
        >
          {{ errors.operations }}
        </span>
      </section>

      <section class="form__section">
        <fieldset>
          <legend>
            <h3 class="form__subtitle">Головна сторінка</h3>
          </legend>

          <VRadio v-for="page in pages"
                  :key="page"
                  v-model="form.mainPage"
                  :name="'main-page'"
                  :value="page"
          >
            {{ page }}
          </VRadio>
        </fieldset>

        <div v-if="errors.mainPage" class="error-text">{{ errors.mainPage }}</div>
      </section>

      <section class="form__section">
        <h3 class="form__subtitle">Зміна</h3>

        <VCheckbox v-model="form.isSecondShift">
          Робітник другої зміни
        </VCheckbox>
      </section>

      <VButton :isLoading="isLoading" type="submit">
        Відправити
      </VButton>
    </form>

    <VLoader v-if="isLoading" />
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import VInput from './components/VInput.vue';
import VCheckbox from './components/VCheckbox.vue';
import VRadio from './components/VRadio.vue';
import VButton from './components/VButton.vue';
import VLoader from './components/VLoader.vue';
import { sendUserData } from './utils/fakeApi';

export default defineComponent({
  name: 'App',

  components: { VInput, VCheckbox, VRadio, VButton, VLoader },

  setup() {
    const form = reactive({
      firstName: '',
      lastName: '',
      login: '',
      password: '',
      operations: [] as string[],
      mainPage: '',
      isSecondShift: false,
    });

    const operations = {
      'Склад': ['створення', 'оновлення', 'переміщення', 'видалення'],
      'Категорії': ['створення', 'оновлення', 'видалення'],
      'Характеристики': ['створення', 'оновлення', 'видалення'],
    };

    const pages = ['Склад', 'Категорії', 'Характеристики', 'Продукти', 'Операції'];

    const errors = reactive({
      firstName: '',
      lastName: '',
      login: '',
      password: '',
      operations: '',
      mainPage: '',
    });

    const isLoading = ref(false);

    const validate = () => {
      errors.firstName = form.firstName.trim() ? '' : 'Поле обов’язкове';
      errors.lastName = form.lastName.trim() ? '' : 'Поле обов’язкове';
      errors.login = form.login.trim() ? '' : 'Поле обов’язкове';
      errors.password =
        form.password.length >= 6 ? '' : 'Мінімум 6 символів';
      errors.operations =
        form.operations.length > 0 ? '' : 'Оберіть хоча б одну операцію';
      errors.mainPage = form.mainPage ? '' : 'Оберіть сторінку';

      return Object.values(errors).every(e => !e);
    };
    const resetForm = () => {
      form.firstName = '';
      form.lastName = '';
      form.login = '';
      form.password = '';
      form.operations = [];
      form.mainPage = '';
      form.isSecondShift = false;
    };

    const onSubmit = async () => {
      if (!validate()) return;

      isLoading.value = true;

      await sendUserData(form);

      resetForm();
      isLoading.value = false;
    };

    return {
      form,
      errors,
      operations,
      pages,
      isLoading,
      onSubmit
    };
  }
});
</script>

<style scoped>
  @import './assets/validation.css';

  .container {
    max-width: 32rem;
    margin: 2rem auto;
    padding: 1rem;
    position: relative;
    border: 1px solid #ddd;
    border-radius: .5rem;
    background-color: #fafafa;
    overflow: hidden;
  }

  .title {
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .form {
    display: flex;
    flex-direction: column;
  }

  .form__row {
    display: flex;
    flex-direction: column;

    @media screen and (min-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
      gap: 1rem;
    }
  }

  .form__section {
    margin: .5rem 0;
  }

  .form__operations {
    display: grid;
    grid-template-columns: 1fr;

    @media screen and (min-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .form__subtitle {
    margin: .5rem 0;
  }
</style>
