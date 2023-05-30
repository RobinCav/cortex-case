<template>
    <button class="logout-button" @click="logout">Logout</button>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  import Cookies from 'js-cookie';
  
  export default defineComponent({
    name: 'LogoutButton',
    setup() {
      const router = useRouter();
  
      const logout = () => {
  
        Cookies.remove('userId');

        router.push('/');
      };
  
      return {
        logout,
      };
    },
  });
  </script>
  
  <style scoped>
    .logout-button {
        border-width: .5px;
        font-size: 15px;
        height: 40px;
        padding: 10px;
        border-radius: 5px;
        border-color: #007bff;
        background-color: rgba(231, 229, 229, 0.695);
        color: #007bff;
        margin-right: 15px;
        transition: background-color 0.3s, color 0.3s;
    }
    
    .logout-button:hover {
        background-color: red;
        color: white;
        border-radius: 5px;
    
    }
  </style>
  