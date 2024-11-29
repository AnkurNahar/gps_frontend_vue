<script setup>
    import Device from './Device.vue'
    import { ref, onMounted } from 'vue'
    import axios from 'axios'

    const devices = ref([])  
    const prefernces = ref({})

    onMounted(async() => {
        try {
            const header = {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJhbkBnbWFpbC5jb20ifQ.LSrCDaXUkZNOrf0YtemRZw3xpz-w2vbMgcaC4P0qfRM'
                }
            }

            const deviceURL = 'http://localhost:8080/devices'
            const deviceData = await axios.get(deviceURL, header)
            devices.value = deviceData.data.data
            console.log(devices.value[0])

            const preferenceURL = 'http://localhost:8080/preferences'
            const preferenceData = await axios.get(preferenceURL, header)
            prefernces.value = preferenceData.data.data
            console.log(prefernces.value)
            

        } catch (err) {
            console.error('error fetching data: ', err);            
        }
    })

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