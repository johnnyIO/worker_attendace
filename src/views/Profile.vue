
<script setup>
    import Container from '../components/Container.vue';
    import  ProfileCard  from "../components/ProfileCard.vue"
    let collected_id = localStorage.getItem("id")
   
</script>

<template>
    <Container>
       <ProfileCard :id="collected_id"/>
    </Container>
</template>