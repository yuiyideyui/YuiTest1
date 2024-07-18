<template>
    <div class="svgloading">
       
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
        >
            <linearGradient id="myGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" :stop-color="color1" />
                <stop offset="100%" :stop-color="color2" />
            </linearGradient>
        </svg>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            ref="svgloading"
            :viewBox="viewBox"
            :style="{ color: svgStyleColor }"
        >
        </svg>
        
        <img  v-if="props.loadingImg" :src=loadingImg class="loadingImg" ref="loadingImgref">
        <div
            v-else
            class="loadingText"
            ref="loadingTextref"
        >
            {{ loadingText }}
        </div>
    </div>
</template>

<script setup>
import { watch, ref, computed } from 'vue'
const props = defineProps({
    loadingText: {
        type: String,
        default: 'loading...'
    },
    loadingImg: {
        type: String,
    },
    progressValue: {
        type: Number,
    },
    boxSize: {
        type: Number,
        default: 150
    },
    svgStyleColor: {
        type: String,
        default: 'rgba(61, 61, 61, 0.5)'
    },
    circleFill: {
        type: String,
        default: 'rgba(61, 61, 61, 0.5)'
    },
    pathStroke: {
        type: String,
        default: 'rgba(255, 255, 255, 0.7)'
    },
    strokeWidth: {
        type: Number,
        default: 10
    },
    //距离外圈的距离
    Loaderborder: {
        type: Number,
        default: 2
    }
})

const svgloadingSize = computed(()=>{
    return props.boxSize + 'px'
})

const loadingImgref = ref()
const loadingTextref = ref()
const viewBox = computed(() => {
    const value = `0 0 ${props.boxSize} ${props.boxSize}`
    const size = Math.round(Math.sqrt(2 * Math.pow(props.boxSize / 2 - props.strokeWidth / 2 - props.Loaderborder, 2)));
    if (props.loadingImg && loadingImgref.value) {
        loadingImgref.value.style.maxWidth = size + "px";
        loadingImgref.value.style.maxHeight = size + "px";
    }else if(loadingTextref.value){
        loadingTextref.value.style.maxWidth = size + "px";
        loadingTextref.value.style.maxHeight = size + "px";
    }
    return value
})
const svgloading = ref()
const timer = ref(null)
const color1 = ref('red')
const color2 = ref('blue')
watch(() => props.progressValue, (newvalue) => {
    console.log('newvalue',newvalue);
    if(svgloading.value){
        const value = newvalue * 100
        const angle2 = Math.min(value, 99.999) / 100 * Math.PI * 2;
        const halfSize = props.boxSize / 2;
        const startX = halfSize;
        const startY = props.strokeWidth / 2 + props.Loaderborder;
        const radius = (props.boxSize - props.strokeWidth) / 2 - props.Loaderborder;
        const endX = Math.sin(angle2) * radius + halfSize;
        const endY = -Math.cos(angle2) * radius + halfSize;
        console.log('endX--endY',Math.sin(angle2),'---',Math.cos(angle2));
        const largeArc = value > 50 ? "1" : "0";
        if(timer.value == null){
            timer.value = setTimeout(() => {
                color1.value = "#" + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0");
                color2.value = "#" + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0");
                timer.value = null
            }, 500);
        }
        svgloading.value.innerHTML = `
            <linearGradient id="myGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="red" />
                <stop offset="100%" stop-color="blue" />
            </linearGradient>
            <linearGradient id="myGradient2" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stop-color="white" />
                <stop offset="20%" stop-color="blue" />
                <stop offset="40%" stop-color="red" />
                <stop offset="60%" stop-color="yellow" />
                <stop offset="100%" stop-color="black" />
            </linearGradient>
            <circle cx="${halfSize}" cy="${halfSize}" r="${halfSize}" fill="url(#myGradient)"/>
            <path d="M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY}" 
                fill="none" stroke="url(#myGradient2)" stroke-width="${props.strokeWidth}" stroke-linecap="round"/>
        `
    }  
})
</script>

<style lang="less" scoped>
.svgloading {
    width: v-bind(svgloadingSize);
    height: v-bind(svgloadingSize);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.loadingText {
    font: 600 16px sans-serif;
    color: rgba(255, 255, 255, 0.7);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.loadingImg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}</style>