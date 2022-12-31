<script setup>
import { onMounted, ref, defineProps, watch, reactive } from 'vue'
import QrcodeVue from "qrcode.vue";
import axios from 'axios';
import { use } from 'chai';

const userid = ref("")
const valueText = ref("")
const size = ref(200)
const props = defineProps(["id"])
userid.value = props.id
valueText.value = props.id

const handlePrintDetails = () => {
    window.print()
}


// const collectedInfo = ref({
//     date_of_birth:"",
//     firstname:"",
//     last_name:"",
//     phone_number:""
// })

const date_of_birth = ref("")
const firstname = ref("")
const last_name = ref("")
const phone_number = ref("")

const printMessage = ref(true)



const fetchUser = () =>{
   
    axios.post("http://localhost:3000/fetchUser", { userid:userid.value })
        .then(res => {
            // collectedInfo.value = res.data.user
            firstname.value = res.data.user.firstname
            last_name.value = res.data.user.last_name
            phone_number.value = res.data.user.phone_number
            date_of_birth.value = res.data.user.date_of_birth
            setTimer()
        })
        .catch(console.error())
}


const setTimer = () =>{
    setTimeout(()=>{
        printMessage.value = false
    },3000)
}

onMounted(()=>{
    fetchUser()
})



</script>

<template>
    <div class="row ">
        <div class="row mt-3 w-100">
            <div class="col-sm-8 mx-auto">
                <div class="card container-fluid px-5">
                    <div class="row mb-3 mt-2" v-if="printMessage">
                        <h4 class="text-center">Please <span class="fst-italic">{{ firstname }} {{ last_name }} </span> print this</h4>
                    </div>
                    <div class="card-body ">
                        <div class="row">
                            <div class="col-sm-6 col-md-6">
                                <h5 class="fst-italic">Firstname:</h5>
                                <span class="card-text fw-bold mb-3">{{firstname}}</span>
                                <h5 class="fst-italic mt-2">Lastname: </h5>
                                <span class="card-text fw-bold ">{{last_name}}</span>
                                <h5 class="fst-italic mt-2">Phone Number: </h5>
                                <span class="card-text fw-bold">{{phone_number}}</span>
                            </div>
                            <div class="cols-sm-6 col-md-6">
                            
                                    <span class="text-center">
                                        <qrcode-vue :value="valueText" :size="size" level="H" class="img-thumbnail"/>
                                    </span>
                                
                            </div>

                        </div>
                        
                        <div class="row">
                            <button class="btn btn-sm btn-dark mt-3 w-25" @click="handlePrintDetails">Print</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="col-sm-6">
                <div class="card">
                    <div class="card-body">
                        <div class="row mx-auto">
                           <span class="text-center">
                            <qrcode-vue :value="valueText" :size="size" level="H" />
                           </span>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>