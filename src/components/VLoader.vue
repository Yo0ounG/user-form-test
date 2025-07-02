<template>
  <div class="loader" role="status" aria-label="Loading...">
    <svg
      class="spinner"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="5"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VLoader',
});
</script>

<style scoped>
  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .5rem;
    position: absolute;
    inset: 0;
    background: rgba(200, 200, 200, .7);
    border-radius: .5rem;
  }

  .spinner {
    width: 2rem;
    height: 2rem;
    animation: rotate 1s linear infinite;
  }

  .path {
    stroke: #007bff;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
</style>
