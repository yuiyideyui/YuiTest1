<template>
    <div class="carousel">
        <div class="left-button">
            <slot name="left-button"></slot>
        </div>
        <div class="mid-imgshow">
            <slot name="imgshow"></slot>
        </div>
        <div class="right-button">
            <slot name="right-button"></slot>
        </div>
        
    </div>
</template>

<script setup>
const props= defineProps({
    options:{
        type:Object,
    }
})

</script>

<style lang="scss" scoped>
.carousel{
    overflow: hidden;
}
.left-button{
    position: relative;
}
.right-button{
    position: relative;
}
.mid-imgshow{
    
}
</style>