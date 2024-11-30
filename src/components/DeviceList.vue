<script setup>
    import Device from './Device.vue'
    import { ref, onMounted } from 'vue'
    import axios from 'axios'

    const devices = ref([]) 
    const hiddenDevices = ref([]) 
    const prefernces = ref({})

    const hidden_device_ids = ref([])
    const sort_by = ref('')
    const user_device_icons = ref({})

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
            //console.log(devices.value[0])

            const preferenceURL = 'http://localhost:8080/preferences'
            const preferenceData = await axios.get(preferenceURL, header)
            prefernces.value = preferenceData.data.data
            hidden_device_ids.value = prefernces.value.hidden_device_ids
            sort_by.value = prefernces.value.sort_by
            user_device_icons.value = prefernces.value.user_device_icons
            //console.log(prefernces.value)
            
            //preferences
            //removing hidden devices
            hiddenDevices.value = devices.value.filter(device => hidden_device_ids.value.includes(device.device_id))
            devices.value = devices.value.filter(device => !hidden_device_ids.value.includes(device.device_id))
            //console.log(hiddenDevices.value)

            //adding saved icons
            devices.value = devices.value.map(device => ({
                ...device,
                icon: user_device_icons.value[device.device_id] || 'https://icons.iconarchive.com/icons/icons-land/transporter/256/Car-Top-Red-icon.png'
            }))

            //sort
            devices.value = getSorted(sort_by.value, devices.value)

        } catch (err) {
            console.error('error fetching data: ', err);            
        }
    })

    const getSorted = (property, devices) => {
        devices.sort((a, b) => {
            if (typeof a[property] === "string") {
                //sorting by display_name
                return a[property].localeCompare(b[property])
            } else if (typeof a[property] === "number") {
                //sorting by speed
                return a[property] - b[property]
            }
            return 0
        })
    }

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