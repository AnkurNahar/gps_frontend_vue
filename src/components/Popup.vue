<script setup>
    import { ref } from 'vue'
    const emit = defineEmits(['change-icon'])

    defineProps({
        device_id : String
    })

    const showPopup = ref(false)
    const form = ref({
          icon_url: "",
          device_id: ""
    })
    
    const submitForm = () => {
        try {
            emit('change-icon', form.value)           
        } catch (error) {
            console.error(error);
            
        }
        showPopup.value = false
    }
</script>


<template>
    <div>
      <button
        @click="showPopup = true"
        class="px-2 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Change Icon
      </button>
  
      <div
        v-if="showPopup"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 class="text-lg font-bold mb-4">Change Icon</h2>
          <form @submit.prevent="submitForm">
            <div class="mb-4">
              <label for="icon_url" class="block text-sm font-medium text-gray-700">
                New Icon URL
              </label>
              <input
                type="text"
                id="icon_url"
                v-model="form.icon_url"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                required
              />
            </div>

            <div class="flex justify-end">
              <button
                type="button"
                @click="showPopup = false"
                class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  