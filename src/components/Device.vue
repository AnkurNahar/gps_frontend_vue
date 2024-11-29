<script setup>
    import { RouterLink } from 'vue-router'

    defineProps({
        device: Object
    });
</script>

<template>
    <div class="bg-white rounded-xl shadow-md relative">
        <div class="p-4">
            <div class="mb-6">
                <h3 class="text-xl font-bold">{{ device.display_name }}</h3>
                <div class="text-gray-600 my-2">{{ device.active_state }}</div>
            </div>

            <h3 class="mb-5">drive status: {{ device.drive_status }}, speed: {{ device.speed }} </h3>

            <div class="border border-gray-100 mb-5"></div>

            <div class="flex flex-col lg:flex-row justify-between mb-4">
                <RouterLink 
                :to="{ path: '/map', query: { lat: device.lat, lng: device.lng } }" 
                class="h-[36px] bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm">
                Show In Map
                </RouterLink>
            </div>
        </div>
    </div>
</template>