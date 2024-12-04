<script setup>
    import Popup from './Popup.vue'
    import { ref } from 'vue'
    const emit = defineEmits(['hide-device', 'change-icon-url'])
  

    defineProps({
        devices: Array
    })

    const device_id_clicked = ref("")

    const handleHideClick = (device_id) => {
        try {
            emit('hide-device', device_id)           
        } catch (error) {
            console.error(error);
            
        }
    }

    const handleChangeIcon = (icon_change_info) => {
      try {
            icon_change_info.device_id = device_id_clicked.value
            emit('change-icon-url', icon_change_info)           
        } catch (error) {
            console.error(error);
            
        }
    }

    const setDeviceId = (device_id) => {
      device_id_clicked.value = device_id
    }


</script>

<template>

    <table class="min-w-full">            
        <thead>              
            <tr>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  Name
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  Active State
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  Drive Status
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  Speed
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  Show in Maps
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  Change Icon
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
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
                  <RouterLink 
                    :to="{ path: '/map', query: { lat: device.lat, lng: device.lng, icon: device.icon } }"  
                  >
                    <button class="px-2 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                      Show in Map
                    </button>
                  </RouterLink>
                </td>

                <td class="px-6 py-4 text-sm font-medium leading-5 border-b border-gray-200 whitespace-nowrap">
                 <Popup @change-icon="handleChangeIcon" @click="setDeviceId(device.device_id)"/>
                </td>

                <td class="px-6 py-4 text-sm font-medium leading-5 border-b border-gray-200 whitespace-nowrap">
                  <button
                    @click="handleHideClick(device.device_id)"
                    class="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    Hide
                  </button>                
                </td>

            </tr>
        </tbody>
    </table>

</template>