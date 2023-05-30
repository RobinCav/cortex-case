import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Clients from '@/views/ClientsPage.vue';
import Users from '@/views/UsersPage.vue';
import Campaigns from '@/views/CampaignsPage.vue';
import LandingPage from '@/views/LandingPage.vue';
import Login from "@/views/LoginPage.vue";
import ActiveUser from "@/views/ActiveUserPage.vue";


const routes: Array<RouteRecordRaw> = [
        {
        path: '/',
        component: LandingPage,
        },
        {
        path: '/clients',
        component: Clients,
        },
        {
        path: '/users',
        component: Users,
        },
        {
        path: '/campaigns',
        component: Campaigns,
        },
        {
        path: '/login',
        component: Login,
        },
        {
            path: '/dashboard',
            component: ActiveUser,
            },
      
    
  ];
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  export default router;

