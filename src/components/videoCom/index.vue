<template>
    <div id="mmid"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import HlsJsPlayer from "xgplayer-hls.js";
onMounted(()=>{
    const videoPlayer = new HlsJsPlayer({
        el: document.querySelector("#mmid"),
        // url: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
        url: 'http://devimages.apple.com/iphone/samples/bipbop/gear1/prog_index.m3u8',
        // url: "http://192.168.10.215:8080/live/livestream.flv",
        width: "100%",
        height: "240px",
        volume: 0.6, // 初始音量
        autoplay: true, // 自动播放
        playsinline: true,
        isLive: true,
        cors: true
    });
})
</script>

<style lang="scss" scoped></style>