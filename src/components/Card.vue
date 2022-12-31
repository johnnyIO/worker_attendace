<script setup>
import { onMounted, ref, defineEmits } from 'vue'
import {useRouter} from "vue-router"
import { Html5QrcodeScanner } from "html5-qrcode"
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode"
import QrcodeVue from "qrcode.vue";
import axios from "axios"




const router = useRouter()
const emit = defineEmits(['loadingState'])
const valueText = ref("john")
const size = ref(200)
const loading = ref(true)
const errorMessage = ref("")




// const reader = ref("reader")

const onScanSuccess = (decodedText, decodedResult) => {
    // handle the scanned code as you like, for example:
    // console.log(`Code matched = ${decodedText}`, decodedResult);
    let qrResult = decodedText;

    if(qrResult)
    {
        alert("QR Successfully Captured Click Okay")
        
        console.log("sensed");
        axios.post("http://localhost:3000/roaster", { userid: qrResult })
             .then(res=>{
               if(res.data.status && res.data.signin)
               {
                 
                 let fullname = `${res.data.msg.first_name} ${res.data.msg.last_name}`
                 localStorage.setItem("name", fullname)
                 setTimeout(()=>{
                      router.push("/greet")
                 },100)
               }

               if(res.data.status && res.data.signout)
               {
                   let fullname = `${res.data.msg.first_name} ${res.data.msg.last_name}`
                   localStorage.setItem("name", fullname)
                   setTimeout(() => {
                       router.push("/goodbye")
                   }, 100)
               }

               if(!res.data.status)
               {
                   errorMessage.value = res.data.msg

                setTimeout(()=>{
                    errorMessage.value = ""
                },2000)
               }
        
             }).catch(error=>{
                console.log(error);
             })
        
            
    }
    
    
    

}

const onScanFailure = (error) => {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    // console.warn(`Code scan error = ${error}`);
    if(!error){
        alert("QR Successfully Captured, Click Ok")
        stopScanner()
    }
}

const stopScanner = () => {
    let html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
  /* verbose= */ false);
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    return
}




Html5Qrcode.getCameras().then(devices => {
    /**
     * devices would be an array of objects of type:
     * { id: "id", label: "label" }
     */
    if (devices && devices.length) {
        var cameraId = devices[0].id;
        // .. use this to start scanning.
    }
}).catch(err => {
    // handle err
});


onMounted(() => {
    // loading.value = true
    let timeHanndler = setTimeout(() => {
        let html5QrcodeScanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: { width: 250, height: 250 } },
  /* verbose= */ false);
        html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    }, 3000)

    if(timeHanndler)
    {
        setTimeout(() => {
            loading.value = false
        }, 1000)
       
        // console.log(loading.value);
    }

    
})


</script>

<template>
    <div class="row w-75">
        <div 
            class="card text-center h-75 w-75 mx-auto mt-3" 
            v-if="!loading" 
            @loadingState="handleLoading">

            <div class="card-header">
                
            </div>
            <div class="card-body">
                <div id="reader" width="600px"></div>
    
            </div>
            <div class="card-footer text-muted">
                <p class="card-text text-center text-danger">{{ errorMessage }}</p>
            </div>
    
    
        </div>

        <div class="row mt-5" v-else>
            <div class="spinner-border mx-auto my-auto" role="status">
                <span class="visually-hidden">Loading...</span>
                <!-- <span class="">.</span> -->
            </div>
        </div>

    </div>
</template>

<style>
</style>