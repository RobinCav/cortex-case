<template>
    <div >
      <form class="form-container" @submit.prevent="loginUser">
        <div>
        <div class="input-container">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" />
        </div>
    </div>
        <button class="login-button-form" type="submit">Login</button>
      </form>
      <h2 v-if="loggedInUser">{{ loggedInUser.name }}</h2>
    </div>

  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { ApiClient, User } from '../api-client';
    import { useRoute, useRouter } from 'vue-router';
    import router from '@/router/router';
    import Cookies from 'js-cookie';
  
    export default defineComponent({
  name: 'LoginForm',
  setup() {
    const email = ref('');
    const password = ref('');
    const apiClient = new ApiClient();
    const loggedInUser = ref<User | null>(null);
    const router = useRouter();

    const loginUser = async () => {
      try {
        const currentUser = await apiClient.login(email.value, password.value);
        loggedInUser.value = currentUser;

        if (currentUser) {

          Cookies.set('userId', currentUser.id.toString(), { expires: 7, sameSite: 'strict' });

          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Login failed:', error);

      }
    };

    return {
      email,
      password,
      loginUser,
      loggedInUser,
    };
  },
});
  </script>

  <style scoped>
    
    .form-container {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 400;
    }

    .form-container div {
        display: flex;
        flex-direction: column;
        width: 250px;
    
    }

    .form-container div input{

        margin-top: 5px;
        height: 40px;
        border-radius: 5px;
        border-width: .5px;
        padding-left: 10px;
        border-color: #007bff;
    }

    .form-container div input::after {
        border-width: .5px;
    }
    .form-container div label {

        font-size: 16px;
        color: white;
        font-weight: bold;
        text-shadow: 1px 1px 1px black;
        }

    .login-button-form {
        
    border-width: 1px;
    font-size: 15px;
    height: 40px;
    width: 100px;
    padding: 10px;
    border-radius: 5px;
    border-color: #007bff;
    background-color: white;
    color: #0056b3;
    margin-right: 15px;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .login-button-form:hover {
    background-color: #0056b3;;
    color: white;
  }

  .input-container {
    display: flex;

    justify-content: space-around;
  }

  .input-container input {
    margin-bottom: 15px;
  }

</style>
  