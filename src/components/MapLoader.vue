<script setup>
    import { GoogleMap, Marker } from 'vue3-google-map'

    const center = { lat: 40.689247, lng: -74.044502 }
    const markerOptions = { 
        position: center, 
        icon: {
            url: 'https://icons.iconarchive.com/icons/icons-land/transporter/256/Car-Top-Red-icon.png',
            scaledSize: { width: 50, height: 50 } 
        } 
    }
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
