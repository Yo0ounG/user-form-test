<template>
  <button
    class="v-button"
    :disabled="disabled || loading"
    @click="onClick"
  >
    <span v-if="!loading">
      <slot />
    </span>

    <span v-else>
      <slot name="loading">Loading...</slot>
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VButton',

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },

    loading: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['click'],

  setup(_, { emit }) {
    const onClick = (event: MouseEvent) => {
      emit('click', event);
    };

    return { onClick };
  },
});
</script>

<style scoped>
  .v-button {
    padding: .5rem 1rem;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: .5rem;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    transition: background-color .2s;
  }

  .v-button:hover:enabled {
    background-color: #0056b3;
  }

  .v-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
</style>
