<script setup>

 import {reactive, ref} from "vue"
 import axios from "axios"
 import {useRouter} from "vue-router"
 import {useUSerStore} from "../stores/userStore"
import { storeToRefs } from "pinia"



 
const router = useRouter()
const userStore = useUSerStore()
const { error, errorMessage, user } = storeToRefs(userStore)
const loading = ref(false)

 const loginCredentials = reactive({
    username:"",
    password:""
 })

//  const error = ref(false)
//  const errorMessage = ref("")

const Login = () =>{

  loading.value = true
  errorMessage.value = ""
  userStore.handleLogin(loginCredentials)
  

 setTimeout(()=>{
   if (user.value) {
     loading.value = false
    //  console.log(user);
     router.push("/adminindex")
   } else {
     loading.value = false
     console.log(errorMessage);
     // router.push("/adminindex")
   }
 },300)

//  loading.value = false

}

</script>

<template>
    <div class="row mt-4">
        <div class="row mx-auto w-50">
            <h4 class="text-center">Admin Login </h4>
            <label class="mb-2 fw-bold">Username</label>
            <input type="text" v-model="loginCredentials.username" class="form-control mb-4" placeholder="Username...">
            <label class="mb-2 fw-bold">Password</label>
            <input type="password" v-model="loginCredentials.password" class="form-control" placeholder="Password...">
            <div class="row">
                <span class="text-danger fst-italic" v-if="error">{{ errorMessage }}</span>
            </div>
            <button class="btn btn-dark btn-sm mt-4 w-50" @click="Login" v-if="!loading">Login</button>
            <button class="btn btn-dark btn-sm mt-4 w-50" disabled v-else >Please Wait...</button>
        </div>
    </div>
</template>