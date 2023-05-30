<template>
  <div>
    <HeaderContainer title="Clients"></HeaderContainer>
    <NavBar></NavBar>
   
    <!-- Display the loading spinner when fetching data -->
    <LoadingSpinner v-if="isLoading" />

    <!-- Display the table once data is fetched -->
    <table v-if="!isLoading">
      <thead>
        <tr>
          <th @click="sortClients('name')">Name</th>
          <th @click="sortClients('defaultCampaignManager.name')">Campaign Manager</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in sortedClients" :key="client.id">
          <td>{{ client.name }}</td>
          <td>{{ client.defaultCampaignManager.name }}</td>
        </tr>
      </tbody>
    </table>
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
        isLoading.value = true; // Set loading state to true

        clients.value = await apiClient.requestClients();

        isLoading.value = false; // Set loading state to false once data is fetched
      } catch (error) {
        console.error('Error fetching clients:', error);
        isLoading.value = false; // Set loading state to false if an error occurs
      }
    };

    onMounted(fetchClients);

    const sortClients = (key: string) => {
      if (sortKey.value === key) {
        // If the same column is clicked again, toggle the sort order
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
      } else {
        // If a different column is clicked, set the sort key to the clicked column and reset the sort order to ascending
        sortKey.value = key;
        sortOrder.value = 'asc';
      }

      // Sort the clients based on the selected column and sort order
      clients.value = orderBy(clients.value, key, sortOrder.value);
    };

    return {
      clients,
      isLoading,
      sortedClients: clients, // Use a computed property for sorted clients to reactively update the table
      sortClients,
    };
  },
});
</script>


