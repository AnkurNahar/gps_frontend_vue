<script setup>
    import { GoogleMap, Marker } from 'vue3-google-map'
    import { ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router'

    const route = useRoute()

    const center = ref({});
    const markerOptions = ref({});


    onMounted(() => {
        const lat = Number(route.query.lat)
        const lng = Number(route.query.lng)
        const img = route.query.icon
        //console.log(lat, lng);
        
        
        center.value = { lat, lng }
        markerOptions.value = { 
            position: center.value, 
            icon: {
                url: img,
                scaledSize: { width: 50, height: 50 } 
            } 
        }

    })
    
</script>

<template>
  <GoogleMap
    api-key=""
    style="width: 100%; height: 900px"
    :center="center"
    :zoom="18"
  >
    <Marker :options="markerOptions" />
  </GoogleMap>
</template>
