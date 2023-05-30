<template>
     <div class="header">
      <h1 class="title">{{title}}</h1>
      <LogoutButton></LogoutButton>
    </div>
</template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import LogoutButton from './LogoutButton.vue';
  
  export default defineComponent({
    name: 'HeaderContainer',
    components: {
      LogoutButton,
    },
    props: {
    title: {
      type: String || null,
      required: true,
    },
  },
    setup() {  
    },
  });
  </script>
  
  <style scoped>
  .header {
    display: flex;
    flex-direction: row;  
    justify-content: space-between;
    align-items: center;
  }
  .title {
    margin-left: 20px;
  }
  </style>
  