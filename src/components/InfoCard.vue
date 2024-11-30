<script setup>
    defineProps({
        details: Object
    });
</script>


<template>
    <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
        <div
            class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm"
        >

            <div class="mx-5">
              <h4 class="text-2xl font-semibold text-gray-700">
                {{ details.count }}
              </h4>
              <div class="text-gray-500">
                {{ details.name }}
              </div>
            </div>
        </div>
    </div>
</template>