<template>
    <LoadingCom :progressValue="progressValue"></LoadingCom>
</template>

<script setup>
import LoadingCom from './LoadingCom.vue'
import { ref } from 'vue';
const progressValue = ref(0)
// const loadingImg = new URL('../../assets/img/runningboy.jpg',import.meta.url).href
// setTimeout(() => {
//     progressValue.value = 0.7
// });

for(let i = 0; i<=100; i++){
    setTimeout(() => {
        progressValue.value = i/100
    },100*i);
}
</script>

<style lang="scss" scoped>

</style>