<script setup>
import { ref } from 'vue';
const time = ref("")
const name = ref("")
let determinant = new Date()
let getHour = determinant.getHours();
let getMinutes = determinant.getMinutes();
let getSeconds = determinant.getSeconds();

name.value = localStorage.getItem("name")

</script>

<template>
    <div class="row">
        <div class="row w-75 mx-auto mt-5">
            <div class="card text-center">
    
                <div class="card-header">
    
                </div>
                <div class="card-body">
                    <span class="card-text">
                        <h6 class="fs-4">{{ name.toUpperCase() }}, You Have Successfully Signed Out</h6>
                        <span class="fw-bold fs-3">Bye Bye</span><br>
                    </span>
                </div>
                <div class="card-footer text-muted">
                </div>
            </div>
    
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