<template>
    <div class="loading-container">
      <div class="loading-spinner"></div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'LoadingSpinner',
  });
  </script>
  
  <style scoped>
  .loading-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 500px;
  }
  
  .loading-spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #007bff;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  