<script setup>
  import { ref } from 'vue'
  import { useRouter } from "vue-router"

  const router = useRouter()

  const props = defineProps({
      title: String,
      home: Number
  })

  const dropdownOpen = ref(false)

  const logout = () => {
    localStorage.removeItem('authToken')
  }

  const goBack = () => {
    router.go(-1)
  }
</script>

<template>
  <header
    class="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-600"
  >
    <div class="flex items-center">
      <button v-if="!home" 
      @click="goBack"
      class="block z-20 w-10 h-15 overflow-hidden focus:outline-none text-indigo-600">
        <i class="pi pi-angle-left" style="font-size: 1.5rem"></i>
      </button>

      <button
        class="text-gray-500 focus:outline-none lg:hidden"
        @click="isOpen = true"
      >
        <svg
          class="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H20M4 12H20M4 18H11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <div class="relative mx-4 lg:mx-0">
        <h3 class="text-3xl font-medium text-gray-700">
          {{ title }}
        </h3>
      </div>
    </div>

    <div class="flex items-center">
      <div class="relative">
        <button
          class="relative z-10 block w-8 h-8 overflow-hidden focus:outline-none"
          @click="dropdownOpen = !dropdownOpen"
        >
          <i class="pi pi-bars"></i>
        </button>

        <div
          v-show="dropdownOpen"
          class="fixed inset-0 z-10 w-full h-full"
          @click="dropdownOpen = false"
        />

        <transition
          enter-active-class="transition duration-150 ease-out transform"
          enter-from-class="scale-95 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-active-class="transition duration-150 ease-in transform"
          leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-95 opacity-0"
        >
          <div
            v-show="dropdownOpen"
            class="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl"
          >
            <router-link
              @click="logout"
              to="/"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
            >
              Log out
            </router-link>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>