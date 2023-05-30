<template>
  <div>
    <HeaderContainer title="Clients"></HeaderContainer>
    <NavBar></NavBar>
    <LoadingSpinner v-if="isLoading" />

    <div class="table-container">
    <table v-if="!isLoading" class="client-table">
      <thead >
        <tr class="client-table-head">
          <th @click="sortClients('name')" >Client Name</th>
          <th @click="sortClients('defaultCampaignManager.name')">Campaign Manager</th>
        </tr>
      </thead>
      <tbody  class="client-table-body">
        <tr v-for="client in sortedClients" :key="client.id">
          <td>{{ client.name }}</td>
          <td>{{ client.defaultCampaignManager.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { ApiClient, Client } from '@/api-client';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import LogoutButton from '@/components/LogoutButton.vue';
import NavBar from '@/components/NavBar.vue';
import HeaderContainer from '@/components/HeaderContainer.vue';
import { orderBy } from 'lodash';

const apiClient = new ApiClient();

export default defineComponent({
  name: 'ClientsPage',
  components: {
    LoadingSpinner,
    NavBar,
    LogoutButton,
    HeaderContainer,
  },
  setup() {
    const clients = ref<Client[]>([]);
    const isLoading = ref<boolean>(false);
    const sortKey = ref<string>('name');
    const sortOrder = ref<string>('asc');

    const fetchClients = async () => {
      try {
        isLoading.value = true; 

        clients.value = await apiClient.requestClients();

        isLoading.value = false;
      } catch (error) {
        console.error('Error fetching clients:', error);
        isLoading.value = false; 
      }
    };

    onMounted(fetchClients);

    const sortClients = (key: string) => {
      if (sortKey.value === key) {
      
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
      } else {
      
        sortKey.value = key;
        sortOrder.value = 'asc';
      }

      clients.value = orderBy(clients.value, key, sortOrder.value);
    };

    return {
      clients,
      isLoading,
      sortedClients: clients, 
      sortClients,
    };
  },
});
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Arvo&family=Lora&family=Merriweather&family=Wix+Madefor+Display:wght@500;600;700;800&display=swap');

.client-table {
  background-color: white;
  padding: 40px;
  font-family: 'Arvo', serif;
  box-shadow: 0 0 2px black, 0 0 4px black, 0 0 6px black;
  border-radius: 5px;
  width: 50%;

}

.table-container {
  display: flex;

  justify-content: center;
  align-items: center;
}

.client-table-head th {
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  border-left: 1px solid black;
  padding: 20px;
  text-align: left;
}

.client-table-body td{
  border-bottom: 1px solid black;
  padding: 10px;
}

</style>


