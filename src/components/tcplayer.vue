<template>
	<div>
		<video
			id="player-container-id"
			width="414"
			height="270"
			preload="auto"
			playsinline
			webkit-playsinline
		></video>
	</div>
</template>

<script setup>
import TCPlayer from 'tcplayer.js'
import 'tcplayer.js/dist/tcplayer.min.css'
import {nextTick} from 'vue'
nextTick(()=>{
    var player = TCPlayer('player-container-id', {}); // player-container-id 为播放器容器 ID，必须与 html 中一致
    const url = 'http://ivi.bupt.edu.cn/hls/cctv2hd.m3u8'
    player.src(url); // url 播放地址
})
</script>

<style lang="scss" scoped>
</style>