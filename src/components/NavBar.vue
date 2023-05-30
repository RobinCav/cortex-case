<template>
    <div class="align-container">
    <nav class="nav-container">
      <ul>
        <li>
            <router-link to="/clients" :class="{ active: activeTab === 'clients' }" class="router-link-inactive">Clients</router-link>
        </li>
        <li>
            <router-link to="/users" :class="{ active: activeTab === 'users' }" class="router-link-inactive">Users</router-link>
        </li>
        <li>
            <router-link to="/campaigns" :class="{ active: activeTab === 'campaigns' }" class="router-link-inactive">Campaigns</router-link>
        </li>
      </ul>
    </nav>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    name: 'NavBar',
    setup() {
      const activeTab = ref<string>('clients');
  
      return {
        activeTab,
      };
    },
  });
  </script>
  
  <style scoped>

  .align-container {
    display: flex;
    margin-bottom: 50px;

  }
  .nav-container {
    width: 400px;
    border: solid 1px black;
    border-top: none;
    border-left: none;
  }
  
  ul {
    display: flex;
    justify-content: space-around;
    list-style-type: none;
    padding: 10;
    background-color: white;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    margin: 0;
  }

  .nav-container ul li {
 
    width: 100%;
    height: 100%;
    text-align: center;
  }
  
  
  .router-link-inactive {
    color: black;
    text-decoration: none;
    padding: 4px;
    font-size: 10px;
  }
  
  .router-link-active {
    font-weight: bold;
    text-decoration: underline;
    color: #0056b3
  }
  
  .router-link-inactive:hover {
    background-color: #ededed;
  }

  .router-link-active:active {
    background-color: none;
  }
  </style>
  