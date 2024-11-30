<script setup>
    import { RouterLink } from 'vue-router'
    import { ref, onMounted } from 'vue'
    import axios from 'axios'
    import InfoCard from './InfoCard.vue'
    import Table from './Table.vue'

    const devices = ref([]) 
    const hiddenDevices = ref([]) 
    const prefernces = ref({})

    const hidden_device_ids = ref([])
    const sort_by = ref('')
    const user_device_icons = ref({})
    const active_devices = ref(0)

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

            //active count
            active_devices.value = devices.value.filter(device => device.active_state === 'active').length
            
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
        return devices
    }

</script>


<template>
  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <div class="bg-blue-50">
        <h3 class="text-3xl font-medium text-gray-700">
          Dashboard
        </h3>

        <div class="mt-4">
          <div class="flex flex-wrap -mx-6">
            <InfoCard :details="{ name: 'Total Devices', count: devices.length + hiddenDevices.length }"/>
            <InfoCard :details="{ name: 'Active Now', count: active_devices }" />      
            <InfoCard :details="{name: 'Hidden Devices', count: hiddenDevices.length }" />
          </div>
        </div>

        <div class="mt-8" />

        <div class="flex flex-col mt-8">
          <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div
              class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
            >
              <Table :devices="devices"/>
            </div>
          </div>
        </div>

      </div>   
    </div>
  </section>
</template>