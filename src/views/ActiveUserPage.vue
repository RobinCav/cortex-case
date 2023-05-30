<template>

      <HeaderContainer :title="loggedInUser?.name || ''"></HeaderContainer>
      <div class="background-screen">

        <LoadingSpinner v-if="isLoading" />

      <div class="user-dashboard" v-if="!isLoading">
        
            <table>
                <thead>
                    <tr>
                    <th>My Clients</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="client in filteredClients" :key="client.id">
                    <td class="client-cell">{{ client.name }}</td>
                    </tr>
                </tbody>
            </table>

   
  
        
            <table>
                <thead>
                    <tr>
                    <th>My Campaigns</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="campaign in filteredCampaigns" :key="campaign.id">
                    <td class="client-cell">{{ campaign.name }}</td>
                    </tr>
                </tbody>
            </table>
       
        </div>
        </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
import HeaderContainer from '@/components/HeaderContainer.vue';
import Cookies from 'js-cookie';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { ApiClient, User, Client, Campaign } from '../api-client';

export default defineComponent({
  name: 'ActiveUserPage',
  components: {
    HeaderContainer,
    LoadingSpinner,
  },
  setup() {
    const loggedInUser = ref<User | null>(null);
    const clients = ref<Client[]>([]);
    const isLoading = ref<boolean>(false);
    const filteredClients = ref<Client[]>([]);
    const campaigns = ref<Campaign[]>([]);
    const filteredCampaigns = ref<Campaign[]>([]);
    const apiClient = new ApiClient();

    const getCookie = () => {
        isLoading.value=true;
      const userId: string | undefined = Cookies.get('userId');
      if (userId) {
        const id = parseInt(userId, 10);
        loggedInUser.value = apiClient.getUserById(id);
      }

      


    };

    const fetchUserClients = async () => {
      try {
      
        clients.value = await apiClient.requestClients();
        campaigns.value = await apiClient.requestCampaigns();

        filterClients();
        filterCampaigns();
        
        isLoading.value = false;

        
      } catch (error) {
        console.error('Error fetching clients:', error);
     
      }
    };

    const filterClients = () => {
      filteredClients.value = clients.value.filter(client => client.defaultCampaignManager.id === loggedInUser.value?.id);
    }

    const filterCampaigns = () => {
      filteredCampaigns.value = campaigns.value.filter(campaign => campaign.campaignManager.id === loggedInUser.value?.id);
    }


   
    onMounted(() => {
      getCookie();
      fetchUserClients();
    });
    return {
      loggedInUser,
      getCookie,
      clients,
      campaigns,
      isLoading,
      filteredCampaigns,
      filteredClients,
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



  .user-dashboard {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: baseline;
    height: 100%;
  }

  .background-screen {

  }
  .user-dashboard table {
    margin-top: 100px;
    width: 400px;
    background-color: white;
    padding: 20px;
    border: solid 2px silver;
    border-radius: 5px;
  }

  .user-dashboard table thead th{
    padding: 20px;
    font-size: 24px;
  }

  .user-dashboard table tbody td {
    padding: 10px;
    border-radius: 5px;
    border: 0.5px solid #007bff;
    margin-bottom: 10px;
  }


  

  



  
  </style>
  