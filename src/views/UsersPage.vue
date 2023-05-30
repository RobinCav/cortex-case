<template>
  <div>
    <HeaderContainer title="Users"></HeaderContainer>
    <NavBar></NavBar>

    <!-- Display the loading spinner when fetching data -->
    <LoadingSpinner v-if="isLoading" />

    <!-- Display the table once data is fetched -->
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
import LogoutButton from '@/components/LogoutButton.vue';
import { orderBy } from 'lodash';
import HeaderContainer from '@/components/HeaderContainer.vue';

const apiClient = new ApiClient();

export default defineComponent({
  name: 'UsersPage',
  components: {
    NavBar,
    LoadingSpinner,
    LogoutButton,
    HeaderContainer,
  },
  setup() {
    const users = ref<User[]>([]);
    const isLoading = ref<boolean>(false);
    const sortKey = ref<string>('name');
    const sortOrder = ref<string>('asc');

    const fetchUsers = async () => {
      try {
        isLoading.value = true; // Set loading state to true

        users.value = await apiClient.requestUsers();

        isLoading.value = false; // Set loading state to false once data is fetched
      } catch (error) {
        console.error('Error fetching users:', error);
        isLoading.value = false; // Set loading state to false if an error occurs
      }
    };

    onMounted(fetchUsers);

    const sortUsers = (key: string) => {
      if (sortKey.value === key) {
        // If the same column is clicked again, toggle the sort order
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
      } else {
        // If a different column is clicked, set the sort key to the clicked column and reset the sort order to ascending
        sortKey.value = key;
        sortOrder.value = 'asc';
      }

      // Sort the users based on the selected column and sort order
      users.value = orderBy(users.value, key, sortOrder.value);
    };

    return {
      users,
      isLoading,
      sortedUsers: users, // Use a computed property for sorted users to reactively update the table
      sortUsers,
    };
  },
});
</script>

<style scoped>

.user-table {
  background-color: white;
  padding: 50px;
  border-radius: 5px;
  width: 50%;

}

.table-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-table-head th {
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  border-left: 1px solid black;
  padding: 20px;
}

.user-table-body td{
  border-bottom: 1px solid black;
  padding: 10px;
}

</style>
