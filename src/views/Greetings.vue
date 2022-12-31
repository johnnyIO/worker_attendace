<script setup>
import { onMounted, ref } from 'vue';
import  {useRouter} from 'vue-router'
const router = useRouter()

const saluatation = ref("")
const time = ref("")
const name = ref("")

let determinant = new Date()
let timeOfArrival = determinant.toLocaleTimeString()
let dateOfRoaster = determinant.toDateString()

let checkForPM = timeOfArrival.includes("PM")
let checkForAM = timeOfArrival.includes("AM")

name.value = localStorage.getItem("name")

if (checkForPM)
{
    saluatation.value = "Good Afternoon"
}

if (checkForAM)
{
    saluatation.value = "Good Morning"
}

console.log();

const redirectToHome = () => {
    setTimeout(()=>{
        router.push("/")
        console.log("fired");
    },5000)
}

onMounted(()=>{
    // redirectToHome()
})

</script>

<template>
    <div class="row">
        <div class="row w-75 mx-auto mt-5">
            <div class="card text-center">
        
                <div class="card-header">
        
                </div>
                <div class="card-body">
                    <span class="card-text">
                      <h6 class="fs-4">Hi, {{ saluatation }}, {{ name.toUpperCase() }}</h6>
                      <span class="fw-bold">Welcome back, Today is {{ dateOfRoaster }}</span><br>
                      <span class="fw-bold fst-italic">Your Arrived At {{ timeOfArrival }}</span>


                    </span>
                </div>
                <div class="card-footer text-muted">
        
                </div>
        
        
            </div>
        
            <!-- <div class="row mt-5" v-else>
                    <div class="spinner-border mx-auto my-auto" role="status">
                        <span class="visually-hidden">Loading...</span>
                      
                    </div>
                </div> -->
        
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