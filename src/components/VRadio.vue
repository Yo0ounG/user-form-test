<template>
  <label class="radio"
         :class="{ error: !!error }"
  >
    <input
      type="radio"
      :checked="modelValue === value"
      :disabled="disabled"
      :name="name"
      @change="onChange"
    />

    <span class="radio-content">
      <slot />
    </span>

    <span v-if="error"
          class="error-text"
    >
      {{ error }}
    </span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { valueProp, errorProp, disabledProp } from '../utils/commonProps';

export default defineComponent({
  name: 'VRadio',

  props: {
    ...valueProp,
    ...disabledProp,
    ...errorProp,

    modelValue: {
      type: [String, Number, Boolean],
      required: true,
    },

    name: {
      type: String,
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const onChange = () => {
      emit('update:modelValue', props.value);
    };

    return { onChange };
  },
});
</script>

<style scoped>
  .radio {
    display: flex;
    align-items: center;
    margin-bottom: .75rem;
    cursor: pointer;
    user-select: none;
  }

  .radio input {
    margin-right: .5rem;
  }

  .radio-content {
    display: inline-block;
  }
</style>
