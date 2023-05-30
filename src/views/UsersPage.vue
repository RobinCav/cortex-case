<template>
  <div>
    <HeaderContainer title="Users"></HeaderContainer>
    <NavBar></NavBar>
    <LoadingSpinner v-if="isLoading" />


    <div class="table-container">
    <table v-if="!isLoading" class="user-table">
      <thead>
        <tr class="user-table-head">
          <th @click="sortUsers('name')">Name</th>
          <th @click="sortUsers('email')">Email</th>
        </tr>
      </thead>
      <tbody  class="user-table-body">
        <tr v-for="user in sortedUsers" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { ApiClient, User } from '@/api-client';
import NavBar from '@/components/NavBar.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { orderBy } from 'lodash';
import HeaderContainer from '@/components/HeaderContainer.vue';

const apiClient = new ApiClient();

export default defineComponent({
  name: 'UsersPage',
  components: {
    NavBar,
    LoadingSpinner,
    HeaderContainer,
  },
  setup() {
    const users = ref<User[]>([]);
    const isLoading = ref<boolean>(false);
    const sortKey = ref<string>('name');
    const sortOrder = ref<string>('asc');

    const fetchUsers = async () => {
      try {
        isLoading.value = true; 

        users.value = await apiClient.requestUsers();

        isLoading.value = false; 
      } catch (error) {
        console.error('Error fetching users:', error);
        isLoading.value = false; 
      }
    };

    onMounted(fetchUsers);

    const sortUsers = (key: string) => {
      if (sortKey.value === key) {
      
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
      } else {
  
        sortKey.value = key;
        sortOrder.value = 'asc';
      }

      users.value = orderBy(users.value, key, sortOrder.value);
    };

    return {
      users,
      isLoading,
      sortedUsers: users, 
      sortUsers,
    };
  },
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Arvo&family=Lora&family=Merriweather&family=Wix+Madefor+Display:wght@500;600;700;800&display=swap');

.user-table {
  background-color: white;
  padding: 40px;
  font-family: 'Arvo', serif;
  border-radius: 5px;
  box-shadow: 0 0 2px black, 0 0 4px black, 0 0 6px black;
  width: 50%;

}

.table-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.user-table-head th {
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  border-left: 1px solid black;
  padding: 20px;
  text-align: left;
}

.user-table-body td{
  border-bottom: 1px solid black;
  padding: 10px;
}

</style>
