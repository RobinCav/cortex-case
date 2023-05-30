<template>
  <div>
    <HeaderContainer title="Campaigns"></HeaderContainer>
    <NavBar></NavBar>

    <LoadingSpinner v-if="isLoading" />
   

    <!-- Display the table once data is fetched -->
    <table v-if="!isLoading">
      <thead>
        <tr>
          <th @click="sortCampaigns('name')">Name</th>
          <th @click="sortCampaigns('campaignManager.name')">Campaign Manager</th>
          <th @click="sortCampaigns('type')">Campaign Type</th>
          <th @click="sortCampaigns('startDate')">Start Date</th>
          <th @click="sortCampaigns('endDate')">End Date</th>
          <th @click="sortCampaigns('budget')">Budget</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="campaign in sortedCampaigns" :key="campaign.id">
          <td>{{ campaign.name }}</td>
          <td>{{ campaign.campaignManager.name }}</td>
          <td>{{ getCampaignTypeName(campaign.type) }}</td>
          <td>{{ campaign.startDate }}</td>
          <td>{{ campaign.endDate }}</td>
          <td>{{ campaign.budget }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { ApiClient, Campaign, CampaignType } from '../api-client';
import NavBar from '@/components/NavBar.vue';
import HeaderContainer from '@/components/HeaderContainer.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { orderBy } from 'lodash';

const apiClient = new ApiClient();

export default defineComponent({
  name: 'CampaignsPage',
  components: {
    NavBar,
    HeaderContainer,
    LoadingSpinner,
  },
  setup() {
    const campaigns = ref<Campaign[]>([]);
    const isLoading = ref<boolean>(false);
    const sortKey = ref<string>('name');
    const sortOrder = ref<string>('asc');

    const fetchCampaigns = async () => {
      try {
        isLoading.value = true; // Set loading state to true

        campaigns.value = await apiClient.requestCampaigns();

        isLoading.value = false; // Set loading state to false once data is fetched
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        isLoading.value = false; // Set loading state to false if an error occurs
      }
    };

    onMounted(fetchCampaigns);

    const getCampaignTypeName = (type: CampaignType): string => {
      switch (type) {
        case CampaignType.SOCIAL_MEDIA:
          return 'Social Media';
        case CampaignType.SEARCH_ENGINE:
          return 'Search Engine';
        case CampaignType.TV:
          return 'TV';
        default:
          return '';
      }
    };

    const sortCampaigns = (key: string) => {
      if (sortKey.value === key) {
        // If the same column is clicked again, toggle the sort order
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
      } else {
        // If a different column is clicked, set the sort key to the clicked column and reset the sort order to ascending
        sortKey.value = key;
        sortOrder.value = 'asc';
      }

      // Sort the campaigns based on the selected column and sort order
      campaigns.value = orderBy(campaigns.value, sortKey.value, sortOrder.value);
    };

    return {
      campaigns,
      getCampaignTypeName,
      isLoading,
      sortedCampaigns: campaigns, // Use a computed property for sorted campaigns to reactively update the table
      sortCampaigns,
    };
  },
});
</script>


