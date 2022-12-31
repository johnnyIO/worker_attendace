<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Nav from "./components/Nav.vue";
</script>

<template>
  
  <Nav /> 
  <RouterView />
</template>

<style scoped>
.navlink{
  text-decoration: none ;
  color:white;
  font-size: 23px;
}
</style>

