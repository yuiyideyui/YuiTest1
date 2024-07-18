<template>
    <div>
11111111111111
    </div>
</template>

<script setup>
import { inject,ref, watch, watchEffect }from 'vue'
const yui = ref('')
yui.value = inject('yui')
console.log('yui.value ',yui.value );
// console.log('yui.value',yui.value);
// watch(()=>yui ,(val)=>{
//     console.log('val',val);
// },{
//     deep:true
// })

</script>

