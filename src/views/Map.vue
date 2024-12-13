<script setup>
  import Navbar from "@/components/Navbar.vue"
  import MapLoader from "@/components/MapLoader.vue"
</script>

<template>
  <Navbar :title="'Map'" :home="0"/>
  <MapLoader />
</template>