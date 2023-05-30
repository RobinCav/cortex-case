<template>
  <div>
    <HeaderContainer title="Campaigns"></HeaderContainer>
    <NavBar></NavBar>
    <LoadingSpinner v-if="isLoading" />
   
    <div class="table-container">
    <table v-if="!isLoading" class="campaign-table">
      <thead>
        <tr class="campaign-table-head">
          <th @click="sortCampaigns('name')">Campaign Name</th>
          <th @click="sortCampaigns('campaignManager.name')">Campaign Manager</th>
          <th @click="sortCampaigns('type')">Campaign Type</th>
          <th @click="sortCampaigns('startDate')">Start Date</th>
          <th @click="sortCampaigns('endDate')">End Date</th>
          <th @click="sortCampaigns('budget')">Budget</th>
        </tr>
      </thead>
      <tbody class="campaign-table-body">
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
        isLoading.value = true; 

        campaigns.value = await apiClient.requestCampaigns();

        isLoading.value = false; 
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        isLoading.value = false; 
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

        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
      } else {
     
        sortKey.value = key;
        sortOrder.value = 'asc';
      }


      campaigns.value = orderBy(campaigns.value, sortKey.value, sortOrder.value);
    };

    return {
      campaigns,
      getCampaignTypeName,
      isLoading,
      sortedCampaigns: campaigns,
      sortCampaigns,
    };
  },
});
</script>


<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Arvo&family=Lora&family=Merriweather&family=Wix+Madefor+Display:wght@500;600;700;800&display=swap');

.campaign-table {
  background-color: white;
  box-shadow: 0 0 2px black, 0 0 4px black, 0 0 6px black;
  font-family: 'Arvo', serif;
  padding: 40px;
  border-radius: 5px;
  min-width: 50%;

}

.table-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.campaign-table-head th {
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  border-left: 1px solid black;
  padding: 20px;
  text-align: left;
}

.campaign-table-body td{
  border-bottom: 1px solid black;
  padding: 10px;
}

</style>



