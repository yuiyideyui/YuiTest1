<template>
    <div v-html="ar"></div>
</template>

<script setup lang="ts">
import { onMounted,ref } from 'vue';
const ar = ref(`
<a-scene
        embedded
        arjs="sourceType: webcam;"
    >
        <a-assets>
            <a-asset-item
                id="model"
                src=${new URL('./gltf/adamHead.gltf', import.meta.url).href}
            ></a-asset-item>
        </a-assets>

        <a-camera
            type="mouse"
            userHeight="0"
        >
            <a-entity
                gltf-model="#model"
                position="0 0 -0.5"
                rotation="0 0 0"
                scale="0.2 0.2 0.2"
            >
            </a-entity>
        </a-camera>

    </a-scene>`)
</script>

<style scoped>

</style>