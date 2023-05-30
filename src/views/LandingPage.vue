<template>
    <div class="landing-page">
      <h1 class="page-title">{{ pageTitle }}</h1>
      <div class="button-container">
        <button class="login-button" @click="goToLogin">Login</button>
        <button class="admin-button" @click="goToAdmin">Admin</button>
      </div>
      <p class="created-by">Robin Cavlek</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';

  
  export default defineComponent({
    name: 'LandingPage',
    setup() {
        const pageTitle = ref("Cortex case");

        return {pageTitle,}
    },
    methods: {
      goToLogin() {
     
        this.$router.push('/login');
      },
      goToAdmin() {
       
        this.$router.push('/clients')
      },
    },
  });
  </script>
  
  <style scoped>
  .landing-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f8f8f8;
  }
  
  .button-container {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
  
  .login-button,
  .admin-button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .login-button:hover,
  .admin-button:hover {
    background-color: #0056b3;
  }
  
  .created-by {
    margin-top: 40px;
    font-size: 14px;
    color: #555;
  }

  .page-title {
    font-size: 60px;
  }
  </style>
  