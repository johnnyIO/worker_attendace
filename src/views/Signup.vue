<script setup>
  import { reactive, ref } from "vue"
  import { useRouter } from "vue-router";
  import axios from "axios"
  import Container from "../components/Container.vue"

const router = useRouter()
const errorMessage = ref("")
  const userdetails = reactive({
    firstname:"",
    lastname:"",
    phoneNumber:"",
    date_of_birth:""
  })

const signUpHandler = async() =>{
    const {data,error} = await axios.post("http://localhost:3000/signup", { userdetails })
   if(data)
   {
       let id = data.inserted_id
       let tweaked_id = id.replace(/new|ObjectId|"|(|)/gi, "")
       localStorage.setItem("id", tweaked_id)
       router.push('/generate')
    
   }else{
    errorMessage.value = error
   }
    
}
</script>

<template>
    <div class="row">
     <Container>
        <div class="mb-3 mt-3 w-50 mx-auto">
            <h4 class="fs-3 text-center">Register</h4>
            <label for="formFile" class="form-label fw-bold mb-3">Firstname</label>
            <input class="form-control" v-model="userdetails.firstname" type="text" placeholder="Firstname....">

            <label for="formFile" class="form-label fw-bold mb-2 mt-3">Lastname</label>
            <input class="form-control" v-model="userdetails.lastname" type="text" placeholder="Lastname.....">

            <label for="formFile" class="form-label fw-bold mb-2 mt-3">Phone Number</label>
            <input class="form-control" v-model="userdetails.phoneNumber" type="text" placeholder="Phone Number: eg 09090909009">

            <label for="formFile" class="form-label fw-bold mb-2 mt-3">Date Of Birth</label>
            <input class="form-control" v-model="userdetails.date_of_birth" type="date">
            <button type="submit" class="btn btn-dark btn-sm mt-3" @click="signUpHandler">Signup</button>
        </div>
     </Container>
    </div>
</template>

<style>
</style>