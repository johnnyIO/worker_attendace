<script setup>
import Container from './Container.vue';
import { RouterLink, useRouter } from "vue-router"
import { useUSerStore } from "../stores/userStore"
import { storeToRefs } from "pinia"

const userStore = useUSerStore()
const router = useRouter()

const { error, errorMessage, user } = storeToRefs(userStore)


const Logout = () =>{
    userStore.handleLogout()
   
    router.push("/admin");
    
}
</script>

<template>
    <div class="row">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <!-- <div class="container-fluid">
                
            </div> -->

            <Container>
                <a class="navbar-brand" href="#">QR Attendance System</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul class="navbar-nav " v-if="!user">
                        <li class="nav-item">
                            <RouterLink class="nav-link active" aria-current="page" to="/">Home</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink class="nav-link active" aria-current="page" to="/signup">Signup</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink class="nav-link active" aria-current="page" to="/admin">Admin</RouterLink>
                        </li>
                    </ul>

                    <ul class="navbar-nav " v-else>
                        <li class="nav-item">
                            <button 
                                class=" btn btn-dark  btn-sm shadow" 
                                aria-current="page" 
                                to="/"
                                @click="Logout"
                            >
                            Logout
                        </button>
                        </li>
                    </ul>
                </div>
            </Container>
        </nav>
    </div>
</template>

<style>
</style>