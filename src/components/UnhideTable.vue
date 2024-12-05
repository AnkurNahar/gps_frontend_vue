<script setup>
  import { useDataStore } from '../store'
  import axios from 'axios'
  import { ref } from 'vue'

  const store = useDataStore()
  const header = {
      headers: {
        'Authorization': `Bearer ${store.authToken}`
      }
  }
  
  const devices = ref(store.devices)
  let preferences = store.preferences

  const handleButtonClick = async(device_id) => {
    try {
      let new_hidden_device_ids = preferences.hidden_device_ids.filter(id => id != device_id)
      preferences.hidden_device_ids = new_hidden_device_ids
      devices.value = devices.value.filter(device => device.device_id != device_id)

      store.setPreferences(preferences)
      const preferenceURL = 'http://localhost:8080/preferences'
      await axios.post(preferenceURL, preferences, header)
    } catch (error) {
      console.error(error)            
    }
  }
</script>

<template>
    <table class="min-w-full">            
        <thead>              
            <tr>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Name
                </th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50" >
                  Active State
                </th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50" >
                  Drive Status
                </th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50" >
                  Speed
                </th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Hide
                </th>
            </tr>
        </thead>

        <tbody class="bg-white">
            <tr v-for="device in devices" :key="device.device_id">
                <td
                  class="px-6 py-4 text-sm font-medium leading-5 text-gray-900 border-b border-gray-200 whitespace-nowrap"
                >
                  {{ device.display_name }}
                </td>

                <td
                  class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                >
                  <span
                    class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full"
                  >{{ device.active_state }}</span>
                </td>

                <td
                  class="px-6 py-4 text-sm font-medium leading-5 text-gray-900 border-b border-gray-200 whitespace-nowrap"
                >
                  {{ device.drive_status }}
                </td>

                <td
                  class="px-6 py-4 text-sm font-medium leading-5 text-gray-900 border-b border-gray-200 whitespace-nowrap"
                >
                  {{ device.speed }}
              </td>

              <td class="px-6 py-4 text-sm font-medium leading-5 border-b border-gray-200 whitespace-nowrap">
                  <button
                    @click="handleButtonClick(device.device_id)"
                    class="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    Unhide
                  </button>                
              </td>
            </tr>
        </tbody>
    </table>
</template>