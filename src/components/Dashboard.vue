<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'
    import InfoCard from './InfoCard.vue'
    import Table from './Table.vue'
    import Sort from './Sort.vue'
    import Navbar from './Navbar.vue'
    import { useDataStore } from '../store'

    const devices = ref([]) 
    const hiddenDevices = ref([]) 
    const activeDevices = ref([]) 
    const preferences = ref({})

    const hidden_device_ids = ref([])
    const sort_by = ref('')
    const user_device_icons = ref({})
    const active_device_count = ref(0)

    const store = useDataStore()

    const header = {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJhbkBnbWFpbC5jb20ifQ.LSrCDaXUkZNOrf0YtemRZw3xpz-w2vbMgcaC4P0qfRM'
        }
    }

    onMounted(async() => {
        try {

            const deviceURL = 'http://localhost:8080/devices'
            const deviceData = await axios.get(deviceURL, header)
            devices.value = deviceData.data.data
            //console.log(devices.value[0])

            const preferenceURL = 'http://localhost:8080/preferences'
            const preferenceData = await axios.get(preferenceURL, header)
            preferences.value = preferenceData.data.data
            store.setPreferences(preferences.value)
            hidden_device_ids.value = preferences.value.hidden_device_ids
            sort_by.value = preferences.value.sort_by
            user_device_icons.value = preferences.value.user_device_icons

            //active count
            activeDevices.value = devices.value.filter(device => device.active_state === 'active')
            active_device_count.value = activeDevices.value.length
            
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
            getSorted(sort_by.value, devices.value)

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
        devices.value = devices
    }


    const handleSortingUpdate = async(new_sort_by) => {
      try {
        getSorted(new_sort_by, devices.value)
        preferences.value.sort_by = new_sort_by
        await updatePreferences()
      } catch (error) {
        console.error(error);        
      }
    }

    const handleHidingDevice = async(device_id) => {
      try {
        //console.log(device_id);
        
        //updating device list and hidden device list
        let newHiddenDevices = devices.value.filter(device => device.device_id == device_id)
        hiddenDevices.value = [...hiddenDevices.value, ...newHiddenDevices]
        hidden_device_ids.value = hiddenDevices.value.map(device => device.device_id)
        devices.value = devices.value.filter(device => !hidden_device_ids.value.includes(device.device_id))

        //updating preferences
        preferences.value.hidden_device_ids = hidden_device_ids.value
        await updatePreferences()
      } catch (error) {
        console.error(error)        
      }
    }

    const handleIconChange = async(icon_change_info) => {
      try {
        //console.log(icon_change_info);
        
        user_device_icons.value[icon_change_info.device_id] = icon_change_info.icon_url
        preferences.value.user_device_icons = user_device_icons.value
        await updatePreferences()
      } catch (error) {
        console.error(error)        
      }
    }

    const setTotalDeviceData = () => {
      try {
        let totalDevices = [...devices.value, ...hiddenDevices.value]
        store.setDevices(totalDevices)
      } catch (error) {
        console.error(error)
      }
    }

    const setActiveDeviceData = () => {
      try {
        store.setDevices(activeDevices.value)
      } catch (error) {
        console.error(error)
      }
    }

    const setHiddenDeviceData = () => {
      try {
        store.setDevices(hiddenDevices.value)
      } catch (error) {
        console.error(error)
      }
    }

    const updatePreferences = async() => {
      try {
        store.setPreferences(preferences.value)
        const preferenceURL = 'http://localhost:8080/preferences'
        await axios.post(preferenceURL, preferences.value, header)
      } catch (error) {
        console.error(error)        
      }
    }

</script>


<template>
  <Navbar :title="'Dashboard'"/>
  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <div class="bg-blue-50">

        <div class="mt-4">
          <div class="flex flex-wrap -mx-6">

            <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
                <router-link
                    @click="setTotalDeviceData"
                    class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm hover:bg-indigo-100"
                    to="/total-devices"
                >
                  <InfoCard :details="{ name: 'Total Devices', count: devices.length + hiddenDevices.length }"/>                    
                </router-link>
            </div>

            <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
                <router-link
                    @click="setActiveDeviceData"
                    class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm hover:bg-indigo-100"
                    to="/active-devices"
                >
                  <InfoCard :details="{ name: 'Active Now', count: active_device_count }"/>                    
                </router-link>
            </div>
           
            <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
                <router-link
                    @click="setHiddenDeviceData"
                    class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm hover:bg-indigo-100"
                    to="/hidden-devices"
                >
                  <InfoCard :details="{ name: 'Hidden Devices', count: hiddenDevices.length }"/>                    
                </router-link>
            </div>
            
          </div>
        </div>

        <div class="mt-8" />

        <Sort :sort_by="sort_by" @update-sorting="handleSortingUpdate"/>

        <div class="mt-8" />

        <div class="flex flex-col mt-8">
          <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div
              class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
            >
              <Table :devices="devices" @hide-device="handleHidingDevice" @change-icon-url="handleIconChange" />
            </div>
          </div>
        </div>

      </div>   
    </div>
  </section>
</template>