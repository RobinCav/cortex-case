<template>
    <div>
      <HeaderContainer title="HEy"></HeaderContainer>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import HeaderContainer from '@/components/HeaderContainer.vue';
  import Cookies from 'js-cookie';
  
  export default defineComponent({
    name: 'ActiveUserPage',
    components: {
      HeaderContainer,
    },
    setup() {
      const loggedInUser = ref<string | null>(null);
  
      // Retrieve the userId from the cookie
      const userId: string | undefined = Cookies.get('userId');
      if (userId) {
        loggedInUser.value = userId;
      }
  
      return {
        loggedInUser,
      };
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
  