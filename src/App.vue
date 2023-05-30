<template>
  <h1>Hey</h1>
    <div>
      <router-view></router-view>
    </div>
</template>

<script lang="ts">
  import { ref, onMounted, defineComponent } from 'vue';
  import { ApiClient, Campaign, Client, User } from './api-client';
  import LoginForm from './components/LoginForm.vue';
  import NavBar from './components/NavBar.vue';
  import LandingPage from './views/LandingPage.vue';


  
  const apiClient = new ApiClient();
  
  export default defineComponent({
	name: "App",
  components: {
      LoginForm,
      LandingPage,
      NavBar,
    },
    setup() {
      // Define reactive variables to store the fetched data
      const campaigns = ref<Campaign[]>([]);
      const users = ref<User[]>([]);
      const clients = ref<Client[]>([]);
    
      // Fetch the data from the API
      const fetchData = async () => {
        try {
          campaigns.value = await apiClient.requestCampaigns();
          users.value = await apiClient.requestUsers();
          clients.value = await apiClient.requestClients();
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      // Fetch the data when the component is mounted
      onMounted(fetchData);
    
      // Define an array to store the different types of data
      const dataTypes = ref([
        { title: 'Campaigns', data: campaigns },
        { title: 'Users', data: users },
        { title: 'Clients', data: clients },
      ]);
    
      return {
        dataTypes
      };
    },
  });
</script>
  
<style>
  /* TODO: Styling here */
</style>
