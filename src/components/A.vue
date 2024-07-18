<template>
    <div>
        is:A
    </div>
    <div>
        width:{{ width }},height:{{ height }}
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useParentElement } from '@vueuse/core'
import { useWindowSize } from '@vueuse/core'

const { width, height } = useWindowSize()
const parentEl = useParentElement()

onMounted(() => {
    console.log(parentEl.value)
})
</script>

<style scoped></style>