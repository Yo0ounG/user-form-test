<template>
  <div class="input-wrapper">
    <label v-if="label"
           :for="inputId"
    >
      {{ label }}
    </label>

    <input
      :id="inputId"
      :class="{ error: !!error }"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      @input="onInput"
    />

    <span v-if="error"
          class="error-text"
    >
      {{ error }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { modelValueString, errorProp, disabledProp } from '../utils/commonProps';

let idCounter = 0;

export default defineComponent({
  name: 'VInput',

  props: {
    ...modelValueString,
    ...errorProp,
    ...disabledProp,

    type: {
      type: String,
      default: 'text',
    },

    label: String,

    placeholder: String,
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const inputId = `v-input-${++idCounter}`;
    const onInput = (e: Event) => {
      emit('update:modelValue', (e.target as HTMLInputElement).value);
    };

    return { onInput, inputId };
  },
});
</script>

<style scoped>
  @import '../assets/validation.css';

  .input-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 1rem;
  }

  label {
    margin-bottom: .25rem;
    font-weight: 500;
  }

  input {
    padding: .5rem;
    font-size: 1rem;
    border: .1rem solid #ccc;
    border-radius: .25rem;
    transition: border .2s;
  }

  input:focus {
    border-color: #007bff;
    outline: none;
  }
</style>
