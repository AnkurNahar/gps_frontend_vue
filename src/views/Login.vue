<script setup>
    import { ref } from "vue"
    import axios from 'axios'
    import { useDataStore } from '../store'
    import { useRouter } from "vue-router";

    const store = useDataStore()
    const router = useRouter()
  
    const form = ref({
        email: "",
    })
       
    const errors = ref({
        email: null,
    })
  
    const isSubmitting = ref(false)
  
    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!form.value.email) {
          errors.value.email = "Email is required"
        } else if (!emailRegex.test(form.value.email)) {
          errors.value.email = "Invalid email format"
        } else {
          errors.value.email = null
        }
    }
  
    const handleSubmit = async() => {
        validateEmail()

        if (!errors.value.email) {
          isSubmitting.value = true
          setTimeout(() => {
            //alert("Login successful!")
            isSubmitting.value = false
          }, 1500)
        }
  
        const header = {
            headers: {
                'UserID': form.value.email
            }
        }
        const URL = 'http://localhost:8080/login'
        const tokenData = await axios.get(URL, header)
        store.setAuthToken(tokenData.data.data.authToken)
        router.push({ name: 'home' })
    }
  
  </script>



<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 class="text-2xl font-semibold text-center text-gray-800 mb-4">Welcome!</h1>

        <form @submit.prevent="handleSubmit" class="space-y-6">

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Enter email to sign in</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              @blur="validateEmail"
              :class="[
                'mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300',
                errors.email ? 'border-red-500' : 'border-gray-300',
              ]"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
          </div>
  
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
</template>
  
  