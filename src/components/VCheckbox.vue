<template>
  <label class="checkbox"
         :class="{ error: !!error }"
  >
    <input
      type="checkbox"
      :checked="checked"
      @change="onChange"
      :disabled="disabled"
    />

    <span class="checkbox-content">
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
import { defineComponent, computed } from 'vue';
import {modelValueBooleanOrArray, errorProp, disabledProp, valueProp} from '../utils/commonProps';

export default defineComponent({
  name: 'VCheckbox',

  props: {
    ...modelValueBooleanOrArray,
    ...valueProp,
    ...disabledProp,
    ...errorProp,
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const isArray = computed(() => Array.isArray(props.modelValue));

    const checked = computed(() => {
      if (isArray.value) {
        return (props.modelValue as Array<unknown>).includes(props.value);
      }

      return props.modelValue as boolean;
    });

    const onChange = (event: Event) => {
      const target = event.target as HTMLInputElement;

      if (isArray.value) {
        const newValue = [...(props.modelValue as Array<unknown>)];
        const index = newValue.indexOf(props.value);

        if (target.checked && index === -1) newValue.push(props.value);
        else if (!target.checked && index !== -1) newValue.splice(index, 1);
        emit('update:modelValue', newValue);
      } else {
        emit('update:modelValue', target.checked);
      }
    };

    return {
      onChange,
      checked,
    };
  },
});
</script>

<style scoped>
  .checkbox {
    display: flex;
    align-items: center;
    margin-bottom: .75rem;
    cursor: pointer;
    user-select: none;
  }

  .checkbox input {
    margin-right: .5rem;
  }

  .checkbox-content {
    display: inline-block;
  }
</style>
