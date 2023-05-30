<template>
    <nav>
      <ul>
        <router-link to="/clients" :class="{ active: activeTab === 'clients' }">Clients</router-link>
        <router-link to="/users" :class="{ active: activeTab === 'users' }">Users</router-link>
        <router-link to="/campaigns" :class="{ active: activeTab === 'campaigns' }">Campaigns</router-link>
      </ul>
    </nav>
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

  nav {
    width: 400px;
  }
  
  ul {
    display: flex;
    justify-content: space-around;
    list-style-type: none;
    padding: 10;
 
  }
  
  li.active {
    background-color: #ddd;
  }
  
  /* Style the router-link */
  .router-link-active {
    font-weight: bold;
  }

  
  .router-link-active:active {
    background-color: #ccc;
  }
  </style>
  