<script setup>
    defineProps({
        details: Object
    })

</script>


<template>
    <div class="mx-5">
      <h4 class="text-2xl font-semibold text-gray-700">
          {{ details.count }}
      </h4>
      <div class="text-gray-500">
          {{ details.name }}
      </div>
    </div>
</template>