import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Map from '@/views/Map.vue';
import TotalDevices from '@/views/TotalDevices.vue';
import ActiveDevices from '@/views/ActiveDevices.vue';
import HiddenDevices from '@/views/HiddenDevices.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/map',
            name: 'map',
            component: Map
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/total-devices',
            name: 'totalDevices',
            component: TotalDevices
        },
        {
            path: '/active-devices',
            name: 'activeDevices',
            component: ActiveDevices
        },
        {
            path: '/hidden-devices',
            name: 'hiddenDevices',
            component: HiddenDevices
        }
    ]
})


export default router;