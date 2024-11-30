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
        //console.log(lat, lng);
        
        
        center.value = { lat, lng }
        markerOptions.value = { 
            position: center.value, 
            icon: {
                url: 'https://icons.iconarchive.com/icons/icons-land/transporter/256/Car-Top-Red-icon.png',
                scaledSize: { width: 50, height: 50 } 
            } 
        }

    })
    
</script>

<template>
  <GoogleMap
    api-key=""
    style="width: 100%; height: 800px"
    :center="center"
    :zoom="18"
  >
    <Marker :options="markerOptions" />
  </GoogleMap>
</template>
