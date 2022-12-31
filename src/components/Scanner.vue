
<script setup>
import { onMounted, ref, defineEmits } from 'vue'
import QrcodeVue from "qrcode.vue";
import Card from "../components/Card.vue" 







</script>

<template>
 <div class="row my-auto">
    <div class="center-screen">
      <Card />
    </div>
 </div>
</template>






<style scoped>
.center-screen {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            min-height: 50vh;
        }
</style>