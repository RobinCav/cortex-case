<template>
    <div>
        <h1 class="title-login">Login</h1>
        <LoginForm></LoginForm>
    </div>
</template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import HeaderContainer from '@/components/HeaderContainer.vue';
  import LoginForm from '@/components/LoginForm.vue';

  
  export default defineComponent({
    name: 'LoginPage',
    components: {
      LoginForm,
    },
    setup() {
      
    },
  });
  </script>
  
  <style>
    
    .title-login {
        margin-top: 60px;
        text-align: center;
        margin-bottom: 100px;
    }
 
  </style>
  