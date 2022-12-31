<script setup>
import { onMounted, ref } from "vue"
import {useRoute} from "vue-router"
import axios from "axios";

const route = useRoute()
const selected_date = route.params.id
const records = ref([])
const counter = ref(0)
const errorMessage = ref("")
const successMessage = ref("")

//Returning the date back to it original format
const reform_date = selected_date.replace("-","/").replace("-","/")

const getRecords = () =>{
  const response = axios.post("http://localhost:3000/getrecords",{selected_date:reform_date})
  response.then(res=>{
      records.value = res.data.records
  })
  .catch(error=>{

  })
}

const handleDelete = (id) =>{
  const response = axios.post("http://localhost:3000/delete_record",{id})
  response.then(res=>{
    if(res.data.status)
    {
        errorMessage.value = ""
        getRecords()
        successMessage.value = res.data.msg
        setTimeout(()=>{
            successMessage.value = res.data.msg
        },3000)
    }else{
        successMessage.value = ""
        errorMessage.value = res.data.msg
    }
  })
  .catch(error=>{

  })
    
}

onMounted(()=>{
    getRecords()
})

</script>

<template>
    <div class="row">
        <div class="row mx-auto w-75 " v-if="records">
            <h3 class="text-center mt-4 mb-3">The information below is for {{ reform_date }}</h3>
            <div class="row container  mx-auto">
                <div class="alert alert-danger" v-if="errorMessage">
                    <span class="text-center">{{ errorMessage }}</span>
                </div>
                <div class="alert alert-success text-center" v-if="successMessage">
                  <span class="text-center">{{ successMessage }}</span>
                </div>
                <table class="table table-responsive table-bordered table-striped text-center">
                    <tr>
                        <th>s/n</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Arrived_At</th>
                        <th>Left_At</th>
                        <th>On</th>
                        <th>Action</th>

                    </tr>

                    <tbody>
                        <tr v-for=" (record, index) in records" :key="record._id">
        
                            <td>{{ index+=1 }}</td>
                            <td>{{ record.first_name }}</td>
                            <td>{{ record.last_name }}</td>
                            <td>{{ record.arrived_at }}</td>
                            <td>{{ record.left_at }}</td>
                            <td>{{ record.roaster_date }}</td>
                            <td>
                                <button @click="handleDelete(record._id)" class="btn btn-sm btn-danger"> Delete</button>
                            </td>


                        </tr>
                    </tbody>

                    <tfoot>
                        <RouterLink to="/adminindex" class="btn btn-dark text-decoration-none mt-4">Return</RouterLink>
                    </tfoot>

                </table>
            </div>
        </div>

        <div v-else class="row mt-5">
            <div class="row text-center">
                <span class="fs-2">Empty</span>
                <div class="row mx-auto w-50">
                    <RouterLink to="/adminindex" class="btn btn-dark text-decoration-none mt-4">Return</RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
</style>