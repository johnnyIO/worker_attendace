<script setup>
  import {onMounted, ref} from "vue"
  import { RouterLink } from "vue-router";
  import axios from "axios";
  const roaster = ref([])

const fetchRoasterRecord = async () => {

    const {data} = await axios.get("http://localhost:3000/fetchRoaster")
    if(data.status)
    {
        roaster.value = data.msg;
    }else{
        // roaster.value = data.msg;
    }
};



  onMounted(()=>{
      fetchRoasterRecord()
  })
</script>

<template>
    <div class="row mt-4">
        <div class="row mx-auto w-75">
            <div class="card pb-3 " v-if="roaster.length !== 0">
                <div class="card-body ">
                    <div class="row mb-4">
                        <h5 class="text-center fs-4">Welcome, Please Use The Cards Below </h5>
                    </div>
                    <div class="row">
                        <div class="col-md-4" v-for="date in roaster" :key="date.id">
                            <RouterLink :to="`/singledate/${date.replace('/', '-').replace('/', '-')}`"
                                class="nav-item text-decoration-none text-dark">
                                <div class="card mt-3 shadow w-75 mx-auto text-center">
                                    <div class="card-body">
                                        <span class="card-text">
                                            <span class="fs-6 fw-bold">
                                                Click to see Records for
                                            </span>
                                            <span class="fst-italic fw-bold">
                                                {{ date }}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                    
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="row text-center">
                <span class="fs-4">No Records Found</span>
            </div>
        </div>
    </div>
</template>

<style>
</style>