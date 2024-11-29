<script setup>
    import Device from './Device.vue'
    import { ref } from 'vue'

    const devices = ref([])  
</script>

<template>
    <section class="bg-blue-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <div class="h2 text-3xl font-bold text-green-500 mb-6 text-center">
                User Devices
            </div>
            <div class="grid grid-col-1 md:grid-cols-3 gap-6">
                <Device v-for="device in devices" :key="device.device_id" :device="device"/>
            </div>
        </div>
    </section>
</template>