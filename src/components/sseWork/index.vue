<template>
    <div>
        11111111111
    </div>
</template>

<script setup>
import { fetchEventSource } from '@microsoft/fetch-event-source';

await fetchEventSource('/sse', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        foo: 'bar'
    }),
    onmessage(ev) {
        console.log(ev.data);
    }
});
</script>

<style lang="scss" scoped>

</style>